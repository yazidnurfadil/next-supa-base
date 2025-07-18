import { useState, useEffect, useCallback } from "react";

import { useInfiniteScroll } from "@heroui//use-infinite-scroll";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui//react";

import type { Key } from "@react-types/shared";

import get from "lodash/get";
import debounce from "lodash-es/debounce";

export type UsePokemonListProps = {
  url?: string;
  dataKey: string;
  itemKey?: string;
  valueKey?: string;
  searchText?: string;
  initialSearch?: string;
  initialQuery?: Record<string, string>;
  onSelectHandler?: (id: string) => void;
  selected?: AutocompleteProps["selectedKey"];
};

export type SelectAutocompleteProps<T extends BaseItem = BaseItem> = Partial<
  AutocompleteProps<T>
> & {
  url?: string;
  itemKey?: string;
  dataKey?: string;
  valueKey?: string;
  placeholder?: string;
  key?: AutocompleteProps["key"];
  initialQuery?: Record<string, string>;
  selectedKey?: AutocompleteProps["selectedKey"];
  onSelectionChange?: (
    key: null | Key,
    name: undefined | string | null,
    selectedObj?: Partial<T> | null
  ) => void;
};

// Define a base interface for items
interface BaseItem {
  [key: string]: unknown;
}

export default function SelectAutocomplete<T extends BaseItem>({
  url,
  selectedKey,
  valueKey = "id",
  itemKey = "name",
  dataKey = "data",
  initialQuery = {},
  ...props
}: SelectAutocompleteProps<T>) {
  const {
    onSelectionChange,
    inputValue: outerInputValue,
    onInputChange: outerOnInputChange,
    ...restProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const {
    hasMore,
    isLoading,
    fixedItems,
    onLoadMore,
    displaySearch,
    selectedValue,
    selectHandler,
    setDisplaySearch,
    setIsSearchEnabled,
    focusChangeHandler,
  } = useAllItemsList<T>({
    url,
    itemKey,
    dataKey,
    valueKey,
    initialQuery,
    selected: selectedKey,
    initialSearch: outerInputValue || "",
  });

  useEffect(() => {
    outerOnInputChange?.(displaySearch as string);
  }, [displaySearch]);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
  });

  const selectionChangeHandler = useCallback(
    (key: null | Key) => {
      setIsSearchEnabled(false);
      const selectedItems = fixedItems.find(
        (item) => get(item, valueKey) === key
      );
      selectHandler(key);
      onSelectionChange?.(
        key,
        selectedItems ? (get(selectedItems, itemKey) as string) : null,
        selectedItems as T
      );
      setTimeout(() => {
        setIsSearchEnabled(true);
      }, 0);
    },
    [onSelectionChange, selectHandler]
  );

  const searchChangeHandler = useCallback((searchValue: string) => {
    setDisplaySearch(searchValue);
    outerOnInputChange?.(searchValue);
  }, []);
  return (
    <Autocomplete<T>
      allowsCustomValue
      isClearable={false}
      isLoading={isLoading}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      defaultItems={fixedItems}
      defaultFilter={() => true}
      selectedKey={selectedValue}
      onSelectionChange={selectionChangeHandler}
      {...restProps}
      inputValue={displaySearch}
      onFocusChange={focusChangeHandler}
      onInputChange={searchChangeHandler}
    >
      {(item: T) => (
        <AutocompleteItem className="capitalize" key={item.id as string}>
          {get(item, itemKey) as string}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

const fetchErrorHandler = (error: Error) => {
  if (error.name === "AbortError") {
    console.log("Fetch aborted");
  } else {
    console.error("There was an error with the fetch operation:", error);
  }
};

function useAllItemsList<T extends BaseItem>({
  url,
  itemKey,
  dataKey,
  selected,
  valueKey,
  initialQuery,
  initialSearch,
}: UsePokemonListProps) {
  interface ApiResponse {
    page: number;
    total: number;
    limit: number;
  }

  const [fixedItems, setFixedItems] = useState<T[]>([]);
  const [allItems, setAllItems] = useState<T[]>([]);
  const [searchResultItems, setSearchResultItems] = useState<T[]>([]);
  const [initialSearchValue, setInitialSearchValue] = useState(initialSearch);
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [allHasMore, setAllHasMore] = useState(true);
  const [selectedValue, setSelectedValue] = useState(selected);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<Record<string, string>>(
    initialQuery as Record<string, string>
  );
  const [allNextPage, setAllNextPage] = useState(0);

  const [displaySearch, setDisplaySearch] = useState(initialSearch);

  const focusChangeHandler = useCallback(
    (isFocus: boolean) => {
      setIsSearchEnabled(false);
      if (!isFocus) {
        setSearchValue(() => "");
        setDisplaySearch(() => initialSearchValue);
        setFixedItems(allItems);
      } else {
        setInitialSearchValue(() => displaySearch);
      }
      setTimeout(() => {
        setIsSearchEnabled(true);
      }, 0);
    },
    [searchValue, initialSearchValue, allItems]
  );

  const selectedDetail = async (key: Key) => {
    const res = await fetch(`${url}/${key}`);
    const json: ApiResponse = await res.json();
    const optSearchValue = get(json, itemKey!) as string;
    setIsSearchEnabled(false);
    setDisplaySearch(() => optSearchValue);
    setInitialSearchValue(() => optSearchValue);
    setFixedItems(allItems);
    setTimeout(() => {
      setIsSearchEnabled(true);
    }, 0);
  };

  const selectHandler = useCallback(
    (key: null | Key) => {
      if (key !== null) {
        setIsSearchEnabled(false);
        const selectedItems = allItems.find(
          (item) => (get(item, valueKey!) as string) === key
        );
        setSelectedValue(get(selectedItems, valueKey!) as string);
        const optSearchValue = get(selectedItems, itemKey!) as string;
        setSearchValue(() => "");
        setDisplaySearch(() => optSearchValue);
        setInitialSearchValue(() => optSearchValue);
      } else {
        setSearchValue(() => "");
        setDisplaySearch(() => initialSearchValue);
      }
      setFixedItems(allItems);
      setHasMore(allHasMore);
      setQueryParams((prev) => ({
        ...prev,
        page: allNextPage.toString(),
      }));
      setTimeout(() => {
        setIsSearchEnabled(true);
      }, 0);
    },
    [allItems, fixedItems, selectedValue]
  );

  const loadItems = useCallback(async () => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      setIsLoading(true);
      const params = new URLSearchParams(
        searchValue
          ? {
              ...queryParams,
              search: searchValue,
            }
          : queryParams
      );
      const res = await fetch(`${url}?${params}`, { signal });
      const json: ApiResponse = await res.json();
      setQueryParams((prev) => ({
        ...prev,
        page: (json.page + 1).toString(),
      }));
      const hasMorePage = json.page * json.limit < json.total;
      if (!searchValue) {
        setAllNextPage(json.page + 1);
        setAllHasMore(hasMorePage);
      }
      return (json[dataKey as keyof ApiResponse] as unknown as T[]) || [];
    } catch (error) {
      fetchErrorHandler(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, searchValue]);

  const searchItems = debounce(async () => {
    await reload();
    setIsLoading(false);
  }, 200);

  useEffect(() => {
    if (isSearchEnabled) {
      setIsLoading(true);
      const filteredItems = allItems.filter((item) =>
        (item[itemKey!] as string)
          .toLowerCase()
          .includes(searchValue?.toLowerCase() || "")
      );
      setSearchResultItems(filteredItems);
      setFixedItems(filteredItems);
      setQueryParams((prev) => {
        delete prev.page;
        return prev;
      });
      if (searchValue) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        searchItems();
      } else {
        setFixedItems(allItems);
        setHasMore(allHasMore);
        setQueryParams((prev) => ({
          ...prev,
          page: allNextPage.toString(),
        }));
        setIsLoading(false);
      }
      return () => {
        setIsLoading(false);
        searchItems.cancel(); // Clear the debounced function
      };
    }
  }, [searchValue]);

  useEffect(() => {
    if (isSearchEnabled) {
      setSearchValue(() => displaySearch as string);
    }
  }, [displaySearch]);

  useEffect(() => {
    if (selected && !initialSearch) {
      selectedDetail(selected).catch((error) =>
        fetchErrorHandler(error as Error)
      );
    }
    loadItems()
      .then((newData) => {
        setAllItems(newData as T[]);
        setFixedItems(newData as T[]);
      })
      .catch((error) => fetchErrorHandler(error as Error));
  }, []);

  const onLoadMore: () => void = () => {
    loadItems()
      .then((newData) => {
        if (searchValue) {
          setSearchResultItems((prevItems) => {
            setFixedItems(() => [...prevItems, ...(newData as T[])]);
            return [...prevItems, ...(newData as T[])];
          });
        } else {
          setAllItems((prevItems) => {
            setFixedItems(() => [...prevItems, ...(newData as T[])]);
            return [...prevItems, ...(newData as T[])];
          });
        }
      })
      .catch((error) => fetchErrorHandler(error as Error));
  };

  const reload = useCallback(async () => {
    const newData = await loadItems();
    if (searchValue) {
      setSearchResultItems((newData as T[]) || []);
    } else {
      setAllItems((newData as T[]) || []);
    }
    setFixedItems((newData as T[]) || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return {
    reload,
    hasMore,
    allItems,
    isLoading,
    fixedItems,
    onLoadMore,
    searchValue,
    selectHandler,
    selectedValue,
    displaySearch,
    setSearchValue,
    setDisplaySearch,
    searchResultItems,
    setIsSearchEnabled,
    focusChangeHandler,
  };
}
