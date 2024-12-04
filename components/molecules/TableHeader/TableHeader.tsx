import { ReactNode, useCallback } from "react";

import { Input, Button, Selection } from "@nextui-org/react";

import { useAtom } from "jotai";

import { tableStates } from "@/states/components";
import useRouterParameter from "@/hooks/useRouterParameter";
import { SearchIcon } from "@/components/atoms/Icons/searchicon";
import { ChevronDownIcon } from "@/components/atoms/Icons/sidebar/chevron-down-icon";

export const TableHeader = ({
  isLoading,
  enableDownload,
  additionalContents,
  handleDownloadExcel,
  startContext = <SearchIcon />,
  placeholder = "Search by name...",
}: {
  isLoading?: boolean;
  placeholder?: string;
  startContext?: ReactNode;
  enableDownload?: boolean;
  additionalContents?: ReactNode;
  handleDownloadExcel?: () => void;
  handleStatusChange?: (keys: Selection) => void;
  statusOptions?: { uid: string; name: string }[];
}) => {
  const { deleteQueryParameter } = useRouterParameter();

  const [{ searchValue }, setTableConfig] = useAtom(tableStates);

  const onClear = useCallback(() => {
    setTableConfig((prev) => ({
      ...prev,
      page: 1,
      searchValue: "",
    }));
    deleteQueryParameter("page");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setTableConfig((prev) => ({
        ...prev,
        page: 1,
        searchValue: value,
      }));
    } else {
      setTableConfig((prev) => ({
        ...prev,
        page: 1,
        searchValue: "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Input
            isClearable
            onClear={onClear}
            value={searchValue}
            placeholder={placeholder}
            startContent={startContext}
            onValueChange={onSearchChange}
            className="w-full sm:max-w-[44%]"
          />
          <div className="flex items-center gap-3">
            {additionalContents}
            {enableDownload && (
              <Button
                isIconOnly
                variant="light"
                color="success"
                title="Download"
                isLoading={isLoading}
                onClick={handleDownloadExcel}
              >
                <ChevronDownIcon className="text-small" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
