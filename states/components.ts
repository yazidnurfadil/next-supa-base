import { Selection, SortDescriptor } from "@nextui-org/react";

import { atomWithReset } from "jotai/utils";

export const tableStates = atomWithReset<{
  page: number;
  pages: number;
  totalItems: number;
  searchValue: string;
  rowsPerPage: number;
  refetchCount: number;
  selectedKeys: Selection;
  sortDescriptor: SortDescriptor;
}>({
  page: 1,
  pages: 1,
  totalItems: 0,
  searchValue: "",
  rowsPerPage: 15,
  refetchCount: 0,
  selectedKeys: new Set([]),
  sortDescriptor: {
    column: "createdBy",
    direction: "descending",
  },
});
