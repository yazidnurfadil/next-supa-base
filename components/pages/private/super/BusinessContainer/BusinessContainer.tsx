"use client";
import Link from "next/link";

import { Input, Button } from "@nextui-org/react";

import { useMutation } from "@tanstack/react-query";

import showToast from "@/lib/toast";
import { postBusinessQuery } from "@/services/query/business";
import { TableBusiness } from "@/components/organisms/TableBusiness";
import { DotsIcon } from "@/components/atoms/Icons/accounts/dots-icon";
import { InfoIcon } from "@/components/atoms/Icons/accounts/info-icon";
import { FormBusinessValues } from "@/components/organisms/FormBusiness";
import { TrashIcon } from "@/components/atoms/Icons/accounts/trash-icon";
import { ExportIcon } from "@/components/atoms/Icons/accounts/export-icon";
import { HouseIcon } from "@/components/atoms/Icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/atoms/Icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";

import { AddBusinessButton } from "./pure/AddButton";

export const BusinessContainer = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: postBusinessQuery,
    onError: (error) => {
      showToast({
        type: "error",
        message: error?.message,
      });
    },
    onSuccess: (resp) => {
      showToast({
        type: "success",
        message: `Business ${resp.name} created successfully`,
      });
    },
  });

  const handleSubmit = async ({
    ownerName,
    ownerEmail,
    ownerPhone,
    businessName,
    businessSlug,
    businessLogo,
    businessPhone,
    profilePicture,
  }: FormBusinessValues) => {
    await mutateAsync({
      businessPhone,
      name: ownerName!,
      logo: businessLogo,
      email: ownerEmail!,
      phone: ownerPhone!,
      slug: businessSlug!,
      avatar: profilePicture,
      businessName: businessName!,
    });
  };

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
          <span>Business</span>
        </li>
        <li className="flex gap-2">
          <span>/</span>
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Businesses</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            placeholder="Search businesses"
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
          <AddBusinessButton isLoading={isPending} onSubmit={handleSubmit} />
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full flex-1">
        <TableBusiness />
      </div>
    </div>
  );
};
