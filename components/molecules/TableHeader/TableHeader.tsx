import { ReactNode } from "react";

import { Button, Input, Selection } from "@nextui-org/react";

import { SearchIcon } from "@/components/atoms/Icons/searchicon";
import { ChevronDownIcon } from "@/components/atoms/Icons/sidebar/chevron-down-icon";

export const TableHeader = ({
  filterValue,
  onClear,
  onSearchChange,
  placeholder = "Search by name...",
  startContext = <SearchIcon />,
  isLoading,
  additionalContents,
  enableDownload,
  handleDownloadExcel,
}: {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  startContext?: ReactNode;
  handleStatusChange?: (keys: Selection) => void;
  statusOptions?: { uid: string; name: string }[];
  isLoading?: boolean;
  additionalContents?: ReactNode;
  enableDownload?: boolean;
  handleDownloadExcel?: () => void;
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={placeholder}
            startContent={startContext}
            value={filterValue}
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
