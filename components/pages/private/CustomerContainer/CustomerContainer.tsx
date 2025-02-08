"use client";

import { useMemo } from "react";

import Link from "next/link";

import { Input, Button } from "@heroui/react";

import { DotsIcon } from "@/components/atoms/Icons/accounts/dots-icon";
import { InfoIcon } from "@/components/atoms/Icons/accounts/info-icon";
import { TrashIcon } from "@/components/atoms/Icons/accounts/trash-icon";
import { ExportIcon } from "@/components/atoms/Icons/accounts/export-icon";
import { HouseIcon } from "@/components/atoms/Icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/atoms/Icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";
import { GridWrapper as TableWrapperMain } from "@/components/molecules/GridWrapper";

import {
  gridColumn as columns,
  response as userResponse,
} from "../AccountsContainer/data";

export const CustomerContainer = () => {
  const response = useMemo(() => userResponse, []);
  return (
    <div className="mx-auto flex w-full max-w-[95rem] flex-1 flex-col gap-4 px-4 lg:px-6">
      <ul className="flex gap-2">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/dashboard"}>
            <span>Home</span>
          </Link>
        </li>

        <li className="flex gap-2">
          <span>/</span>
          <UsersIcon />
          <span>Account</span>
        </li>
        <li className="flex gap-2">
          <span>/</span>
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            placeholder="Search users"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          {/* <AddUser /> */}
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="mx-auto size-full">
        <TableWrapperMain
          columns={columns}
          isLoading={false}
          items={response.data}
        />
      </div>
    </div>
  );
};
