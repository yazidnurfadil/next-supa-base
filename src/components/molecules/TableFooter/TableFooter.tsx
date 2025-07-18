import { useMemo, ChangeEvent } from "react";

import { Pagination } from "@heroui/react";

import { useAtom } from "jotai";

import { tableStates } from "@/states/components";
import useRouterParameter from "@/hooks/useRouterParameter";

export const TableFooter = ({
  isLoading,
  footerRowsText = "Row per page:",
}: {
  isLoading?: boolean;
  footerRowsText?: string;
}) => {
  const [{ page, pages, totalItems, rowsPerPage }, setTableConfig] =
    useAtom(tableStates);
  const rowsOption = [15, 25, 50, 100, 1000];
  const { updateQueryString } = useRouterParameter();

  const onPageChanges = (value: number) => {
    // ag-grid and api uses 0-based index for pages
    // so on the UI if the value 1 is selected, it means the index 0 in the API
    setTableConfig((prev) => ({ ...prev, page: value }));
    updateQueryString("page", String(value));
  };

  const onRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setTableConfig((prev) => ({ ...prev, page: 1, rowsPerPage: value }));
    updateQueryString("rows", String(value));
    updateQueryString("page", String(1));
  };

  // Convert page from 0-based index to 1-based index for UI display
  const getUIConvertedCurrentPageCount = useMemo(
    () => (page > 0 ? page - 1 : 0),
    [page]
  );

  const getFooterRowsText = useMemo(
    () =>
      `Showing ${totalItems > 0 ? getUIConvertedCurrentPageCount * rowsPerPage + 1 : 0} to ${Math.min(
        (getUIConvertedCurrentPageCount + 1) * rowsPerPage,
        totalItems
      )} of ${totalItems} items`,
    [getUIConvertedCurrentPageCount, rowsPerPage, totalItems]
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between">
        <span className="text-default-400 text-small">{getFooterRowsText}</span>
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
