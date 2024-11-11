import { ChangeEvent } from "react";
import { useAtom } from "jotai";

import { Divider, Pagination } from "@nextui-org/react";

import useRouterParameter from "@/hooks/useRouterParameter";
import { tableStates } from "@/states/components";

export const TableFooter = ({
  footerText,
  footerRowsText = "Row per page:",
  isLoading,
}: {
  footerText: string;
  footerRowsText?: string;
  isLoading?: boolean;
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
    setTableConfig((prev) => ({ ...prev, rowsPerPage: value, page: 1 }));
    updateQueryString("rows", String(value));
    updateQueryString("page", String(1));
  };

  return (
    <>
      <Divider />

      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-between">
          <span className="text-small text-default-400">{footerText}</span>
          <label className="flex items-center text-small text-default-400">
            {footerRowsText}
            <select
              defaultValue={rowsPerPage}
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              {rowsOption.map((row) => (
                <option key={row} value={row}>
                  {row}
                </option>
              ))}
            </select>
          </label>
        </div>

        {pages > 1 && (
          <Pagination
            isDisabled={isLoading}
            isCompact
            showControls
            showShadow
            page={page}
            total={pages}
            onChange={onPageChanges}
          />
        )}
      </div>
    </>
  );
};
