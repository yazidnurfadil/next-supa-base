"use client";

import { useRef, useMemo, useCallback } from "react";

import { useAtom } from "jotai";
import { useTheme } from "next-themes";
import { themeQuartz } from "ag-grid-community";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridReact, AgGridReactProps } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "@/styles/custom-ag-grid.css";

import {
  type ColDef,
  type RowSelectionOptions,
  type PaginationChangedEvent,
} from "@ag-grid-community/core";

import { Theme } from "@/types/utils";
import { tableStates } from "@/states/components";
import { TableFooter } from "@/components/molecules/TableFooter";

/**
 * AG GRID React Table Component
 * https://www.ag-grid.com/react-data-grid/getting-started/
 *
 */
export const GridWrapper = ({
  items,
  columns,
  isLoading,
  rowOptions,
  paginationPageSizeSelector = [15, 25, 50, 100, 500, 1000],
  defaultColumns = {
    flex: 1,
    cellClass: "items-center flex",
  },
  ...restAgGridReactProps
}: AgGridReactProps & {
  items: unknown[];
  columns: ColDef[];
  isLoading: boolean;
  defaultColumns?: ColDef;
  rowOptions?: RowSelectionOptions;
  paginationPageSizeSelector?: number[];
}) => {
  const [{ totalItems, rowsPerPage }, setTableConfig] = useAtom(tableStates);

  const { theme } = useTheme();

  const anaGridThemeDark = themeQuartz.withParams({
    spacing: "8px",
    rowBorder: false,
    headerFontSize: 14,
    columnBorder: false,
    wrapperBorder: false,
    borderRadius: "14px",
    fontFamily: "inherit",
    sidePanelBorder: true,
    accentColor: "#095028",
    headerRowBorder: false,
    foregroundColor: "#FFF",
    wrapperBorderRadius: "0",
    cellTextColor: "#ECEDEE",
    headerTextColor: "#A1A1AA",
    backgroundColor: "#18181B",
    browserColorScheme: "dark",
    rowVerticalPaddingScale: 1,
    headerVerticalPaddingScale: 0.75,
    headerBackgroundColor: "#3F3F4699",
    oddRowBackgroundColor: "#3F3F4699",
    borderColor:
      "hsl(var(--nextui-divider) / var(--nextui-divider-opacity, var(--tw-border-opacity)))",
    dropdownShadow:
      "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
  });

  const anaGridThemeLight = themeQuartz.withParams({
    spacing: "8px",
    rowBorder: false,
    headerFontSize: 14,
    columnBorder: false,
    wrapperBorder: false,
    borderRadius: "14px",
    fontFamily: "inherit",
    sidePanelBorder: true,
    accentColor: "#095028",
    headerRowBorder: false,
    cellTextColor: "#11181C",
    wrapperBorderRadius: "0",
    backgroundColor: "#FFFFFF",
    foregroundColor: "#11181C",
    rowVerticalPaddingScale: 1,
    headerTextColor: "#71717A",
    browserColorScheme: "light",
    headerVerticalPaddingScale: 0.75,
    headerBackgroundColor: "#F4F4F5",
    oddRowBackgroundColor: "#F4F4F5",
    borderColor:
      "hsl(var(--nextui-divider) / var(--nextui-divider-opacity, var(--tw-border-opacity)))",
    dropdownShadow:
      "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
  });

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo(() => defaultColumns, [defaultColumns]);

  const rowSelection = useMemo(() => rowOptions, [rowOptions]);

  const themeClass = useMemo(
    () => (theme === Theme.Dark ? anaGridThemeDark : anaGridThemeLight),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
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
      className="relative z-0 flex size-full flex-1 flex-col justify-between gap-4" // applying the Data Grid theme
    >
      <div className="h-full rounded-large bg-content1 p-4 shadow-small">
        <AgGridReact
          ref={gridRef}
          rowData={items}
          theme={themeClass}
          pagination={false}
          loading={isLoading}
          columnDefs={columns}
          cellSelection={false}
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
          {...restAgGridReactProps}
        />
      </div>
      <TableFooter isLoading={false} footerText={`Total ${totalItems} items`} />
    </div>
  );
};

export default GridWrapper;
