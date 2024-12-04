"use client";

import { useRef, useMemo, useCallback } from "react";

import { useAtom } from "jotai";
import { useTheme } from "next-themes";
import { AgGridReact } from "@ag-grid-community/react";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  type ColDef,
  type RowSelectionOptions,
  type PaginationChangedEvent,
} from "@ag-grid-community/core";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { Theme } from "@/types/utils";
import { tableStates } from "@/states/components";

/**
 * AG GRID React Table Component
 * https://www.ag-grid.com/react-data-grid/getting-started/
 *
 */
const GridWrapper = ({
  items,
  columns,
  isLoading,
  rowOptions,
  pagination = true,
  gridTheme = "ag-theme-quartz",
  defaultColumns = {
    flex: 1,
  },
  paginationPageSizeSelector = [15, 25, 50, 100, 500, 1000],
}: {
  items: unknown[];
  columns: ColDef[];
  isLoading: boolean;
  gridTheme?: string;
  pagination?: boolean;
  defaultColumns?: ColDef;
  rowOptions?: RowSelectionOptions;
  paginationPageSizeSelector?: number[];
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

  const _onBtnExport = useCallback(() => {
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
      className={`${themeClass} h-screen`} // applying the Data Grid theme
      style={{
        maxHeight: "80vh",
      }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={items}
        loading={isLoading}
        columnDefs={columns}
        pagination={pagination}
        suppressExcelExport={true}
        rowSelection={rowSelection}
        onRowClicked={onRowClicked}
        defaultColDef={defaultColDef}
        onCellClicked={onCellClicked}
        onFilterOpened={onFilterOpened}
        paginationPageSize={rowsPerPage}
        onCellValueChanged={onCellValueChanged}
        onPaginationChanged={handleOnPaginationChanged}
        modules={[ClientSideRowModelModule, CsvExportModule]}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default GridWrapper;
