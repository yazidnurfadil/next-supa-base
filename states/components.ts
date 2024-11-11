import { atomWithReset } from "jotai/utils";

import { Selection, SortDescriptor } from "@nextui-org/react";

export const tableStates = atomWithReset<{
  searchValue: string;
  page: number;
  pages: number;
  rowsPerPage: number;
  totalItems: number;
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
}>({
  searchValue: "",
  page: 1,
  pages: 1,
  rowsPerPage: 15,
  totalItems: 0,
  selectedKeys: new Set([]),
  sortDescriptor: {
    column: "createdBy",
    direction: "descending",
  },
});
