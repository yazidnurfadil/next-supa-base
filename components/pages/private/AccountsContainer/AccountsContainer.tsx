"use client";

import { useMemo, useEffect } from "react";

import { Input, Button } from "@heroui/react";

import { useNavbarContext } from "@/hooks/useLayoutContext";
import { DotsIcon } from "@/components/atoms/Icons/accounts/dots-icon";
import { InfoIcon } from "@/components/atoms/Icons/accounts/info-icon";
import { TrashIcon } from "@/components/atoms/Icons/accounts/trash-icon";
import { ExportIcon } from "@/components/atoms/Icons/accounts/export-icon";
import { HouseIcon } from "@/components/atoms/Icons/breadcrumb/house-icon";
import { AccountsIcon } from "@/components/atoms/Icons/sidebar/accounts-icon";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";
import {
  TableWrapper,
  TableWrapperItem,
} from "@/components/molecules/TableWrapper";

import {
  User,
  users,
  tableColumns as columns,
  response as userResponse,
} from "./data";

export const AccountsContainer = () => {
  const response = useMemo(() => userResponse, []);
  const { setPageTitle, setBreadcrumb } = useNavbarContext();
  useEffect(() => {
    setPageTitle("All Accounts");
    setBreadcrumb([
      {
        title: "Home",
        href: "/dashboard",
        icon: <HouseIcon width={18} height={18} />,
      },
      {
        title: "Accounts",
        href: "/accounts",
        icon: <AccountsIcon width={18} height={18} />,
      },
      {
        title: "List",
        href: "/accounts",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[95rem] flex-1 flex-col gap-4 px-4 lg:px-6">
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
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper
          columns={columns}
          isFetching={false}
          response={response}
          items={users as TableWrapperItem<User>[]}
        />
      </div>
    </div>
  );
};
