import { ChangeEvent } from "react";

import { Pagination } from "@heroui/react";

import { useAtom } from "jotai";

import { tableStates } from "@/states/components";
import useRouterParameter from "@/hooks/useRouterParameter";

export const TableFooter = ({
  isLoading,
  footerText,
  footerRowsText = "Row per page:",
}: {
  footerText: string;
  isLoading?: boolean;
  footerRowsText?: string;
}) => {
  const [{ page, pages, rowsPerPage }, setTableConfig] = useAtom(tableStates);
  const rowsOption = [15, 25, 50, 100, 1000];
  const { updateQueryString } = useRouterParameter();

  const onPageChanges = (value: number) => {
    setTableConfig((prev) => ({ ...prev, page: value }));
    updateQueryString("page", String(value));
  };

  const onRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setTableConfig((prev) => ({ ...prev, page: 1, rowsPerPage: value }));
    updateQueryString("rows", String(value));
    updateQueryString("page", String(1));
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between">
        <span className="text-default-400 text-small">{footerText}</span>
        {pages > 1 && (
          <div className="flex flex-1 items-center justify-center">
            <Pagination
              isCompact
              showShadow
              page={page}
              showControls
              total={pages}
              isDisabled={isLoading}
              onChange={onPageChanges}
            />
          </div>
        )}
        <label className="flex items-center text-default-400 text-small">
          {footerRowsText}
          <select
            defaultValue={rowsPerPage}
            onChange={onRowsPerPageChange}
            className="bg-transparent text-default-400 outline-none text-small"
          >
            {rowsOption.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
