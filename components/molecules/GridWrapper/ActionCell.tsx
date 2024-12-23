import { Tooltip } from "@heroui/react";

import { EyeIcon } from "@/components/atoms/Icons/table/eye-icon";
import { EditIcon } from "@/components/atoms/Icons/table/edit-icon";
import { DeleteIcon } from "@/components/atoms/Icons/table/delete-icon";

export const ActionCell = (params: { id: string }) => {
  return (
    <div className="flex h-full items-center justify-end gap-4">
      <Tooltip content="Details">
        <button onClick={() => console.log("View business", params.id)}>
          <EyeIcon size={20} fill="#979797" />
        </button>
      </Tooltip>
      <Tooltip color="secondary" content="Edit business">
        <button onClick={() => console.log("Edit business", params.id)}>
          <EditIcon size={20} fill="#979797" />
        </button>
      </Tooltip>
      <Tooltip
        color="danger"
        content="Delete business"
        onClick={() => console.log("Delete business", params.id)}
      >
        <button>
          <DeleteIcon size={20} fill="#FF0080" />
        </button>
      </Tooltip>
    </div>
  );
};
