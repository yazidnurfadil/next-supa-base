import { Chip, User, Tooltip } from "@nextui-org/react";

import type { RenderCell } from "@/components/molecules/TableWrapper";

import { EyeIcon } from "@/components/atoms/Icons/table/eye-icon";
import { EditIcon } from "@/components/atoms/Icons/table/edit-icon";
import { DeleteIcon } from "@/components/atoms/Icons/table/delete-icon";

import type { User as UserData } from "./data";

export const renderCell: RenderCell<UserData> = ({ item, columnKey }) => {
  const cellValue = item[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <User
          name={cellValue}
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        >
          {item.email}
        </User>
      );
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{item.team}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
                ? "danger"
                : "warning"
          }
        >
          <span className="text-xs capitalize">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log("View user", item.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip color="secondary" content="Edit user">
              <button onClick={() => console.log("Edit user", item.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              color="danger"
              content="Delete user"
              onClick={() => console.log("Delete user", item.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
