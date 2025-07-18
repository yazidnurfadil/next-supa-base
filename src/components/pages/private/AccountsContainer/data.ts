import type { ColDef } from "ag-grid-community";

import { ActionCell } from "@/components/molecules/GridWrapper";

import { renderCell } from "./render-cell";

export const tableColumns = [
  { uid: "name", name: "NAME" },
  { uid: "role", name: "ROLE" },
  { uid: "status", name: "STATUS" },
  { uid: "actions", name: "ACTIONS" },
];

export const gridColumn: ColDef[] = [
  {
    field: "name",
  },
  {
    field: "role",
    autoHeight: true,
    filter: "agTextColumnFilter",
  },
  {
    field: "status",
    autoHeight: true,
  },
  {
    headerName: "",
    field: "actions",
    cellRenderer: ActionCell,
  },
];

export type User = {
  id: number;
  age: string;
  name: string;
  role: string;
  team: string;
  email: string;
  status: string;
  avatar: string;
  [key: string]: string | number; // Add this line
};

export const users = [
  {
    id: 1,
    age: "29",
    renderCell,
    role: "CEO",
    status: "active",
    team: "Management",
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    age: "25",
    renderCell,
    status: "paused",
    name: "Zoey Lang",
    team: "Development",
    role: "Technical Lead",
    email: "zoey.lang@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    age: "22",
    renderCell,
    status: "active",
    name: "Jane Fisher",
    team: "Development",
    role: "Senior Developer",
    email: "jane.fisher@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    age: "28",
    renderCell,
    team: "Marketing",
    status: "vacation",
    name: "William Howard",
    role: "Community Manager",
    email: "william.howard@example.com",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: 5,
    age: "24",
    renderCell,
    team: "Sales",
    status: "active",
    role: "Sales Manager",
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
  {
    id: 6,
    age: "29",
    renderCell,
    role: "CEO",
    status: "active",
    team: "Management",
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 10,
    age: "24",
    renderCell,
    team: "Sales",
    status: "active",
    role: "Sales Manager",
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
  {
    id: 8,
    age: "22",
    renderCell,
    status: "active",
    name: "Jane Fisher",
    team: "Development",
    role: "Senior Developer",
    email: "jane.fisher@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 7,
    age: "25",
    renderCell,
    status: "paused",
    name: "Zoey Lang",
    team: "Development",
    role: "Technical Lead",
    email: "zoey.lang@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },

  {
    id: 9,
    age: "28",
    renderCell,
    team: "Marketing",
    status: "vacation",
    name: "William Howard",
    role: "Community Manager",
    email: "william.howard@example.com",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: 11,
    age: "29",
    renderCell,
    role: "CEO",
    status: "active",
    team: "Management",
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 12,
    age: "24",
    renderCell,
    team: "Sales",
    status: "active",
    role: "Sales Manager",
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
  {
    id: 13,
    age: "22",
    renderCell,
    status: "active",
    name: "Jane Fisher",
    team: "Development",
    role: "Senior Developer",
    email: "jane.fisher@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 14,
    age: "25",
    renderCell,
    status: "paused",
    name: "Zoey Lang",
    team: "Development",
    role: "Technical Lead",
    email: "zoey.lang@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 15,
    age: "29",
    renderCell,
    role: "CEO",
    status: "active",
    team: "Management",
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 16,
    age: "24",
    renderCell,
    team: "Sales",
    status: "active",
    role: "Sales Manager",
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
];

export const response = {
  number: 1,
  data: users,
  totalPages: 10,
  totalElements: 100,
};
