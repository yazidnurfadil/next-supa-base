import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";

import { NotificationIcon } from "@/components/atoms/Icons/navbar/notificationicon";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <NotificationIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            key="1"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            📣 Edit your information
          </DropdownItem>
          <DropdownItem
            key="2"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            🚀 Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem
            key="3"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
