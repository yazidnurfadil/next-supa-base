"use client";

import { Key, Suspense, ReactNode, useEffect, useCallback } from "react";

import {
  Table,
  Divider,
  Spinner,
  TableRow,
  Selection,
  TableBody,
  TableCell,
  TableColumn,
  SortDescriptor,
  TableHeader as TableColumnHead,
} from "@heroui/react";

import { useAtom } from "jotai";
import { RESET } from "jotai/utils";

import { tableStates } from "@/states/components";
import useRouterParameter from "@/hooks/useRouterParameter";
import { TableFooter } from "@/components/molecules/TableFooter";
import { TableHeader } from "@/components/molecules/TableHeader";

export type TableWrapperItem<T> = {
  renderCell: RenderCell<BodyItem>;
} & {
  [Property in keyof T]: T[Property];
};

export type RenderCell<T> = ({
  item,
  columnKey,
}: {
  item: T;
  columnKey: string | number;
}) => React.ReactNode;

export interface TableWrapperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  ariaLabel?: string;
  isFetching: boolean;
  isCompact?: boolean;
  emptyContent?: string;
  baseClassName?: string;
  statusFilter?: Selection;
  columns: TableWrapperColumn[];
  onRowAction?: (key: Key) => void;
  items: TableWrapperItem<BodyItem>[];
  additionalHeaderContent?: ReactNode;
  setStatusFilter?: (keys: Selection) => void;
  selectionMode?: "multiple" | "single" | "none";
  statusOptions?: {
    uid: string;
    name: string;
  }[];
  response: {
    number: number;
    totalPages: number;
    totalElements: number;
  };
}

type TableWrapperColumn = Record<string, string>;

type BodyItem = { [key: string | number]: unknown };

export const TableWrapper = ({
  columns,
  response,
  items = [],
  isFetching,
  onRowAction,
  statusOptions,
  isCompact = false,
  ariaLabel = "Table",
  selectionMode = "none",
  additionalHeaderContent,
  emptyContent = "No data found",
  baseClassName = "max-h-[70vh]",
  ...props
}: TableWrapperProps) => {
  const { router, pathname, searchParams, updateQueryString } =
    useRouterParameter();

  const [{ totalItems, selectedKeys, sortDescriptor }, setTableConfig] =
    useAtom(tableStates);

  const loadingState = isFetching ? "loading" : "idle";

  const handleSelectionChange = useCallback((keys: Selection) => {
    setTableConfig((prev) => ({
      ...prev,
      selectedKeys: keys,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSortChange = (e: SortDescriptor) =>
    setTableConfig((prev) => ({
      ...prev,
      sortDescriptor: {
        column: e.column,
        direction: e.direction,
      },
    }));

  const handleStatusChange = useCallback(
    (keys: Selection) => {
      // const convertedKeys = Array.from(keys);
      // deletePageParameter();
      // updateQueryString("filter", convertedKeys[0] as string);

      setTableConfig((prev) => ({
        ...prev,
        page: 1,
        statusFilter: keys,
      }));
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (searchParams.has("page")) {
      setTableConfig((prev) => ({
        ...prev,
        page: Number(searchParams.get("page")),
      }));
    }

    if (searchParams.has("rows")) {
      setTableConfig((prev) => ({
        ...prev,
        rowsPerPage: Number(searchParams.get("rows")),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (response?.totalPages) {
      setTableConfig((prev) => ({
        ...prev,
        pages: response?.totalPages,
        totalItems: response?.totalElements,
        page: response?.number === 0 ? 1 : response?.number + 1,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.number, response?.totalElements, response?.totalPages]);

  useEffect(() => {
    return () => {
      setTableConfig(RESET);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-4" {...props}>
      <Table
        isStriped
        isHeaderSticky
        isCompact={isCompact}
        aria-label={ariaLabel}
        onRowAction={onRowAction}
        selectedKeys={selectedKeys}
        topContentPlacement="outside"
        selectionMode={selectionMode}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
        bottomContentPlacement="outside"
        onSelectionChange={handleSelectionChange}
        classNames={{
          base: baseClassName,
        }}
        bottomContent={
          <Suspense fallback={null}>
            <Divider />
            <TableFooter isLoading={isFetching} />
          </Suspense>
        }
        topContent={
          <TableHeader
            isLoading={isFetching}
            statusOptions={statusOptions}
            handleStatusChange={handleStatusChange}
            additionalContents={additionalHeaderContent}
            // enableDownload={downloadOptions?.isEnabled}
            // handleDownloadExcel={handleDownloadExcel}
          />
        }
      >
        <TableColumnHead columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableColumnHead>
        <TableBody
          items={items}
          emptyContent={emptyContent}
          loadingState={loadingState}
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  {item.renderCell({
                    item: item,
                    columnKey: columnKey,
                  })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
