"use client";
import React from "react";
import Link from "next/link";

import { Button, Input } from "@nextui-org/react";

import { columns, User, users } from "./data";

// import { AddUser } from "./add-user";
import { DotsIcon } from "@/components/atoms/Icons/accounts/dots-icon";
import { ExportIcon } from "@/components/atoms/Icons/accounts/export-icon";
import { InfoIcon } from "@/components/atoms/Icons/accounts/info-icon";
import { TrashIcon } from "@/components/atoms/Icons/accounts/trash-icon";
import { HouseIcon } from "@/components/atoms/Icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/atoms/Icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";
import {
  TableWrapper,
  TableWrapperItem,
} from "@/components/molecules/TableWrapper";

export const AccountsContainer = () => {
  return (
    <div className="mx-auto flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
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
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
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
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper
          columns={columns}
          items={users as TableWrapperItem<User>[]}
        />
      </div>
    </div>
  );
};
