import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

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
  items: TableWrapperItem<{ [key: string | number]: unknown }>[];
}

export const TableWrapper = ({
  columns,
  items,
  ...props
}: TableWrapperProps) => {
  return (
    <div className="flex w-full flex-col gap-4" {...props}>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items as TableWrapperItem<unknown>[]}>
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
