"use client";

import { Key, ReactNode, Suspense, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";

import {
  Divider,
  Selection,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader as TableColumnHead,
  TableRow,
} from "@nextui-org/react";

import { TableFooter } from "@/components/molecules/TableFooter";
import { TableHeader } from "@/components/molecules/TableHeader";
import useRouterParameter from "@/hooks/useRouterParameter";
import { tableStates } from "@/states/components";

type TableWrapperColumn = Record<string, string>;

type BodyItem = { [key: string | number]: unknown };

export type RenderCell<T> = ({
  item,
  columnKey,
}: {
  item: T;
  columnKey: string | number;
}) => React.ReactNode;

export type TableWrapperItem<T> = {
  [Property in keyof T]: T[Property];
} & {
  renderCell: RenderCell<BodyItem>;
};

export interface TableWrapperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  columns: TableWrapperColumn[];
  items: TableWrapperItem<BodyItem>[];
  ariaLabel?: string;
  isFetching: boolean;
  emptyContent?: string;
  isCompact?: boolean;
  onRowAction?: (key: Key) => void;
  response: {
    number: number;
    totalElements: number;
    totalPages: number;
  };
  statusFilter?: Selection;
  setStatusFilter?: (keys: Selection) => void;
  statusOptions?: {
    uid: string;
    name: string;
  }[];
  additionalHeaderContent?: ReactNode;
  selectionMode?: "single" | "multiple" | "none";
  baseClassName?: string;
}

export const TableWrapper = ({
  columns,
  items = [],
  ariaLabel = "Table",
  selectionMode = "none",
  isFetching,
  emptyContent = "No data found",
  onRowAction,
  response,
  statusOptions,
  additionalHeaderContent,
  isCompact = false,
  baseClassName = "max-h-[70vh]",
  ...props
}: TableWrapperProps) => {
  const { router, pathname, searchParams, updateQueryString } =
    useRouterParameter();

  const [{ sortDescriptor, totalItems, selectedKeys }, setTableConfig] =
    useAtom(tableStates);

  const loadingState = isFetching ? "loading" : "idle";

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      setTableConfig((prev) => ({
        ...prev,
        selectedKeys: keys,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deletePageParameter = useCallback(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      const newParams = params.toString();
      router.replace(pathname + "?" + newParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      const convertedKeys = Array.from(keys);
      deletePageParameter();
      updateQueryString("filter", convertedKeys[0] as string);

      setTableConfig((prev) => ({
        ...prev,
        statusFilter: keys,
        page: 1,
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
        page: response?.number === 0 ? 1 : response?.number + 1,
        pages: response?.totalPages,
        totalItems: response?.totalElements,
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
        aria-label={ariaLabel}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        topContentPlacement="outside"
        bottomContentPlacement="outside"
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
        isStriped
        selectionMode={selectionMode}
        onRowAction={onRowAction}
        isCompact={isCompact}
        classNames={{
          base: baseClassName,
        }}
        topContent={
          <TableHeader
            isLoading={isFetching}
            handleStatusChange={handleStatusChange}
            statusOptions={statusOptions}
            additionalContents={additionalHeaderContent}
            // enableDownload={downloadOptions?.isEnabled}
            // handleDownloadExcel={handleDownloadExcel}
          />
        }
        bottomContent={
          <Suspense fallback={null}>
            <Divider />
            <TableFooter
              footerText={isFetching ? "" : `Total ${totalItems} items`}
              isLoading={isFetching}
            />
          </Suspense>
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
          loadingContent={<Spinner />}
          loadingState={loadingState}
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
