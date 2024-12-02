"use client";

import { useCallback, useMemo, useRef } from "react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  type ColDef,
  type PaginationChangedEvent,
  type RowSelectionOptions,
} from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridReact } from "@ag-grid-community/react";
import { useAtom } from "jotai";
import { useTheme } from "next-themes";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { tableStates } from "@/states/components";
import { Theme } from "@/types/utils";

/**
 * AG GRID React Table Component
 * https://www.ag-grid.com/react-data-grid/getting-started/
 *
 */
const GridWrapper = ({
  isLoading,
  items,
  columns,
  defaultColumns = {
    flex: 1,
  },
  pagination = true,
  paginationPageSizeSelector = [15, 25, 50, 100, 500, 1000],
  rowOptions,
  gridTheme = "ag-theme-quartz",
}: {
  isLoading: boolean;
  items: unknown[];
  columns: ColDef[];
  defaultColumns?: ColDef;
  pagination?: boolean;
  paginationPageSizeSelector?: number[];
  rowOptions?: RowSelectionOptions;
  gridTheme?: string;
}) => {
  const [{ rowsPerPage }, setTableConfig] = useAtom(tableStates);

  const { theme } = useTheme();

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo(() => defaultColumns, [defaultColumns]);

  const rowSelection = useMemo(() => rowOptions, [rowOptions]);

  const themeClass = useMemo(
    () => `${gridTheme}${theme === Theme.Dark ? "-dark" : ""}`,
    [gridTheme, theme]
  );

  const onRowClicked = () => console.log("onCellClicked");

  const onCellClicked = () => console.log("onCellClicked");

  const onCellValueChanged = useCallback(
    () => console.log("onCellValueChanged"),
    []
  );

  const onFilterOpened = useCallback(() => console.log("onFilterOpened"), []);

  const onBtnExport = useCallback(() => {
    gridRef?.current?.api?.exportDataAsCsv({
      suppressQuotes: true,
    });
  }, []);

  const handleOnPaginationChanged = (params: PaginationChangedEvent) => {
    // prevent rerender
    if (params.api.paginationGetPageSize() === rowsPerPage) return;

    setTableConfig((prev) => ({
      ...prev,
      page: params.api.paginationGetCurrentPage() + 1,
      rowsPerPage: params.api.paginationGetPageSize(),
    }));
  };

  return (
    <div
      style={{
        maxHeight: "80vh",
      }}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`${themeClass} h-screen`} // applying the Data Grid theme
    >
      <AgGridReact
        ref={gridRef}
        loading={isLoading}
        rowData={items}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={rowsPerPage}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onPaginationChanged={handleOnPaginationChanged}
        onRowClicked={onRowClicked}
        onCellClicked={onCellClicked}
        onCellValueChanged={onCellValueChanged}
        onFilterOpened={onFilterOpened}
        modules={[ClientSideRowModelModule, CsvExportModule]}
        suppressExcelExport={true}
      />
    </div>
  );
};

export default GridWrapper;
