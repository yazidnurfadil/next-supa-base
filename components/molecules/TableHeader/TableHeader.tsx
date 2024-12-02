import { ReactNode, useCallback } from "react";
import { useAtom } from "jotai";

import { Button, Input, Selection } from "@nextui-org/react";

import { SearchIcon } from "@/components/atoms/Icons/searchicon";
import { ChevronDownIcon } from "@/components/atoms/Icons/sidebar/chevron-down-icon";
import useRouterParameter from "@/hooks/useRouterParameter";
import { tableStates } from "@/states/components";

export const TableHeader = ({
  placeholder = "Search by name...",
  startContext = <SearchIcon />,
  isLoading,
  additionalContents,
  enableDownload,
  handleDownloadExcel,
}: {
  placeholder?: string;
  startContext?: ReactNode;
  handleStatusChange?: (keys: Selection) => void;
  statusOptions?: { uid: string; name: string }[];
  isLoading?: boolean;
  additionalContents?: ReactNode;
  enableDownload?: boolean;
  handleDownloadExcel?: () => void;
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
            className="w-full sm:max-w-[44%]"
            placeholder={placeholder}
            startContent={startContext}
            value={searchValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex items-center gap-3">
            {additionalContents}
            {enableDownload && (
              <Button
                isLoading={isLoading}
                isIconOnly
                variant="light"
                color="success"
                onClick={handleDownloadExcel}
                title="Download"
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
