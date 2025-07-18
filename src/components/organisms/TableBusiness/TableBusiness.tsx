"use client";

import { useMemo, useEffect } from "react";

import type { ColDef } from "ag-grid-community";

import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import showToast from "@/lib/toast";
import { Business } from "@/types/business.type";
import { tableStates } from "@/states/components";
import { getBusinessQuery } from "@/services/query/business";
import {
  ActionCell,
  GridWrapper as TableWrapperMain,
} from "@/components/molecules/GridWrapper";

const columns: ColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "slug",
    headerName: "Slug",
  },
  {
    field: "createdAt",
    headerName: "Created At",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
  },
  {
    headerName: "Actions",
    cellRenderer: ActionCell,
  },
];

export const TableBusiness = () => {
  const [{ page, searchValue, rowsPerPage, sortDescriptor }, setTableConfig] =
    useAtom(tableStates);

  const { data, error, isFetching } = useQuery({
    queryKey: [
      searchValue,
      rowsPerPage,
      page,
      sortDescriptor.column,
      sortDescriptor.direction,
    ],
    queryFn: async ({ signal }) => {
      const response = await getBusinessQuery({
        signal,
        limit: rowsPerPage,
        search: searchValue,
        page: page > 0 ? page - 1 : 0,
        sort: sortDescriptor.column as string,
      });
      const totalItem = response?.total || 0;
      if (response?.data) {
        setTableConfig((prev) => ({
          ...prev,
          totalItems: totalItem,
        }));
      }
      return response;
    },
  });

  const response = useMemo(() => data?.data, [data?.data]);

  const filteredItems = useMemo<Business[]>(() => {
    return (response?.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      createdAt: new Date(item.createdAt as string).toLocaleDateString(),
      updatedAt: new Date(item.updatedAt as string).toLocaleDateString(),
    })) || []) as unknown as Business[];
  }, [response]);

  useEffect(() => {
    if (error)
      showToast({
        type: "error",
        message: error.message,
      });
  }, [error]);
  return (
    <TableWrapperMain
      columns={columns}
      pagination={false}
      items={filteredItems}
      isLoading={isFetching}
    />
  );
};
