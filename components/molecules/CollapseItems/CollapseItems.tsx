"use client";
import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

import { Accordion, AccordionItem } from "@heroui/react";

import { Key } from "@react-types/shared";

import { SidebarItem } from "@/components/molecules/SidebarItem";
import { ChevronDownIcon } from "@/components/atoms/Icons/sidebar/chevron-down-icon";

interface Props {
  title: string;
  isActive?: boolean;
  icon: React.ReactNode;
  items:
    | {
        href: string;
        title: string;
        icon: React.ReactNode;
      }[]
    | string[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const pathname = usePathname();

  const generateKeyValues = () => {
    const keys = items.map((item) => {
      if (typeof item === "string") {
        return item === pathname ? "1" : "";
      } else {
        return item.href === pathname ? "1" : "";
      }
    });
    return keys.filter((key) => key !== "") || ["1"];
  };
  const [selectedKeys, setSelectedKeys] = useState<
    Iterable<Key> | undefined | "all"
  >(generateKeyValues());

  useEffect(() => {
    setSelectedKeys(generateKeyValues());
  }, [pathname]);

  return (
    <div className="flex h-full cursor-pointer items-center gap-4">
      <Accordion
        className="px-0"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem
          key="1"
          aria-label="Accordion Menu"
          indicator={<ChevronDownIcon />}
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            title:
              "data-[open=true]:fill-success-500 px-0 flex text-base gap-2 h-full items-center cursor-pointer hover:text-default-900 text-neutral-500 data-[open=true]:text-default-900",
            trigger:
              "[&_svg_path]:fill-netral-500 [&_svg_path]:data-[open=true]:fill-success-500 py-0 min-h-[44px] hover:bg-white dark:hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",
          }}
        >
          <div className="pl-12">
            {items.map((item, index) =>
              typeof item === "string" ? (
                <span
                  key={index}
                  className="flex w-full text-neutral-500 transition-colors hover:text-default-900"
                >
                  {item}
                </span>
              ) : (
                <SidebarItem
                  key={index}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href}
                />
              )
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
