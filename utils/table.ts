import { dateFormatter } from "@/utils/text";

export const commonCellValueFormatter = <T extends Record<string, unknown>[]>(
  cells: T
) => {
  return cells.map((cell) => {
    Object.keys(cell).forEach((key: string) => {
      if (
        ["createdAt", "updatedAt"].includes(key) &&
        typeof cell[key] === "string"
      ) {
        cell[key] = dateFormatter(cell?.[key]);
      }
    });
    return cell;
  }) as T;
};
