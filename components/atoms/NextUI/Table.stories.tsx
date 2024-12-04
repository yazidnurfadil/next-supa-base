/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useMemo, useCallback } from "react";

import { User } from "@nextui-org/user";
import { table } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { EyeIcon, EditIcon, DeleteIcon } from "@nextui-org/shared-icons";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableProps,
  getKeyValue,
  TableColumn,
  TableHeader,
} from "@nextui-org/table";

import { Meta } from "@storybook/react";

import useSWR from "swr";
import { useAsyncList } from "@react-stately/data";

export default {
  component: Table,
  title: "Atoms/Table",
  argTypes: {
    isStriped: {
      control: {
        type: "boolean",
      },
    },
    layout: {
      options: ["auto", "fixed"],
      control: {
        type: "select",
      },
    },
    shadow: {
      options: ["none", "sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    selectionMode: {
      options: ["none", "single", "multiple"],
      control: {
        type: "select",
      },
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
} as Meta<typeof Table>;

const defaultProps = {
  ...table.defaultVariants,
  className: "max-w-lg",
};

const rows = [
  {
    key: "1",
    role: "CEO",
    status: "Active",
    name: "Tony Reichert",
  },
  {
    key: "2",
    status: "Paused",
    name: "Zoey Lang",
    role: "Technical Lead",
  },
  {
    key: "3",
    status: "Active",
    name: "Jane Fisher",
    role: "Senior Developer",
  },
  {
    key: "4",
    status: "Vacation",
    name: "William Howard",
    role: "Community Manager",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

type SWCharacter = {
  name: string;
  mass: string;
  height: string;
  birth_year: string;
};

const StaticTemplate = (args: TableProps) => (
  <Table aria-label="Example static collection table" {...args}>
    <TableHeader>
      <TableColumn>NAME</TableColumn>
      <TableColumn>ROLE</TableColumn>
      <TableColumn>STATUS</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow key="1">
        <TableCell>Tony Reichert</TableCell>
        <TableCell>CEO</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
      <TableRow key="2">
        <TableCell>Zoey Lang</TableCell>
        <TableCell>Technical Lead</TableCell>
        <TableCell>Paused</TableCell>
      </TableRow>
      <TableRow key="3">
        <TableCell>Jane Fisher</TableCell>
        <TableCell>Senior Developer</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
      <TableRow key="4">
        <TableCell>William Howard</TableCell>
        <TableCell>Community Manager</TableCell>
        <TableCell>Vacation</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const TableWithSwitchTemplate = (args: TableProps) => (
  <Table aria-label="Table with Switch" {...args}>
    <TableHeader>
      <TableColumn>NAME</TableColumn>
      <TableColumn>ROLE</TableColumn>
      <TableColumn>ACTIVE</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow key="1">
        <TableCell>Tony Reichert</TableCell>
        <TableCell>CEO</TableCell>
        <TableCell>
          <Switch />
        </TableCell>
      </TableRow>
      <TableRow key="2">
        <TableCell>Zoey Lang</TableCell>
        <TableCell>Technical Lead</TableCell>
        <TableCell>
          <Switch />
        </TableCell>
      </TableRow>
      <TableRow key="3">
        <TableCell>Jane Fisher</TableCell>
        <TableCell>Senior Developer</TableCell>
        <TableCell>
          <Switch />
        </TableCell>
      </TableRow>
      <TableRow key="4">
        <TableCell>William Howard</TableCell>
        <TableCell>Community Manager</TableCell>
        <TableCell>
          <Switch />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const EmptyTemplate = (args: TableProps) => (
  <Table aria-label="Example empty table" {...args}>
    <TableHeader>
      <TableColumn>NAME</TableColumn>
      <TableColumn>ROLE</TableColumn>
      <TableColumn>STATUS</TableColumn>
    </TableHeader>
    <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
  </Table>
);

const DynamicTemplate = (args: TableProps) => (
  <Table aria-label="Example table with dynamic content" {...args}>
    <TableHeader columns={columns}>
      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    </TableHeader>
    <TableBody items={rows}>
      {(item) => (
        <TableRow key={item.key}>
          {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
  </Table>
);

const CustomCellTemplate = (args: TableProps) => {
  const columns = [
    { uid: "name", name: "NAME" },
    { uid: "role", name: "ROLE" },
    { uid: "status", name: "STATUS" },
    { uid: "actions", name: "ACTIONS" },
  ];
  const users = [
    {
      id: 1,
      age: "29",
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
      team: "Sales",
      status: "active",
      role: "Sales Manager",
      name: "Kristen Copper",
      email: "kristen.cooper@example.com",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    },
  ];

  type User = (typeof users)[number];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    paused: "danger",
    active: "success",
    vacation: "warning",
  };

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            name={cellValue}
            description={user.email}
            avatarProps={{ radius: "lg", src: user.avatar }}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-sm font-bold capitalize">{cellValue}</p>
            <p className="text-sm font-bold capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            className="capitalize"
            color={statusColorMap[user.status]}
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" {...args}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const CustomCellWithClassnamesTemplate = (args: TableProps) => {
  const columns = [
    { uid: "name", name: "NAME" },
    { uid: "role", name: "ROLE" },
    { uid: "status", name: "STATUS" },
    { uid: "actions", name: "ACTIONS" },
  ];
  const users = [
    {
      id: 1,
      age: "29",
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
      team: "Sales",
      status: "active",
      role: "Sales Manager",
      name: "Kristen Copper",
      email: "kristen.cooper@example.com",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    },
  ];

  type User = (typeof users)[number];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    paused: "danger",
    active: "success",
    vacation: "warning",
  };

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            name={cellValue}
            description={user.email}
            avatarProps={{ radius: "lg", src: user.avatar }}
            classNames={{
              description: "text-default-400",
            }}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-sm font-bold capitalize">{cellValue}</p>
            <p className="text-sm font-bold capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={statusColorMap[user.status]}
            className="font-semibold capitalize"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" color="foreground">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="foreground" content="Edit user">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" {...args}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const SortableTemplate = (args: TableProps) => {
  const list = useAsyncList<SWCharacter>({
    async load({ signal }) {
      const res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      const json = await res.json();

      return {
        items: json.results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column! as keyof SWCharacter];
          const second = b[sortDescriptor.column! as keyof SWCharacter];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      onSortChange={list.sort}
      sortDescriptor={list.sortDescriptor}
      aria-label="Example table with client side sorting"
      {...args}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Name
        </TableColumn>
        <TableColumn key="height" allowsSorting>
          Height
        </TableColumn>
        <TableColumn key="mass" allowsSorting>
          Mass
        </TableColumn>
        <TableColumn allowsSorting key="birth_year">
          Birth year
        </TableColumn>
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const LoadMoreTemplate = (args: TableProps) => {
  const [page, setPage] = React.useState(1);

  const list = useAsyncList<SWCharacter>({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      const json = await res.json();

      return {
        cursor: json.next,
        items: json.results,
      };
    },
  });

  const hasMore = page < 9;

  return (
    <Table
      aria-label="Example table with client side sorting"
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Button
              variant="flat"
              onPress={list.loadMore}
              isDisabled={list.isLoading}
            >
              {list.isLoading && <Spinner size="sm" color="white" />}
              Load More
            </Button>
          </div>
        ) : null
      }
      {...args}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const PaginatedTemplate = (args: TableProps) => {
  const [page, setPage] = React.useState(1);

  const rowsPerPage = 4;

  const paginatedRows = useMemo(
    () => [
      ...rows,
      {
        key: "5",
        status: "Active",
        name: "Emily Collins",
        role: "Marketing Manager",
      },
      {
        key: "6",
        status: "Active",
        name: "Brian Kim",
        role: "Product Manager",
      },
      {
        key: "7",
        status: "Active",
        role: "UX Designer",
        name: "Laura Thompson",
      },
      {
        key: "8",
        status: "Paused",
        role: "Data Analyst",
        name: "Michael Stevens",
      },
      {
        key: "9",
        status: "Active",
        name: "Sophia Nguyen",
        role: "Quality Assurance",
      },
      {
        key: "10",
        status: "Vacation",
        name: "James Wilson",
        role: "Front-end Developer",
      },
      {
        key: "11",
        status: "Active",
        name: "Ava Johnson",
        role: "Back-end Developer",
      },
      {
        key: "12",
        status: "Active",
        name: "Isabella Smith",
        role: "Graphic Designer",
      },
      {
        key: "13",
        status: "Paused",
        name: "Oliver Brown",
        role: "Content Writer",
      },
      {
        key: "14",
        status: "Active",
        name: "Lucas Jones",
        role: "Project Manager",
      },
      {
        key: "15",
        status: "Active",
        role: "HR Manager",
        name: "Grace Davis",
      },
      {
        key: "16",
        status: "Active",
        name: "Elijah Garcia",
        role: "Network Administrator",
      },
      {
        key: "17",
        role: "Accountant",
        status: "Vacation",
        name: "Emma Martinez",
      },
      {
        key: "18",
        status: "Active",
        name: "Benjamin Lee",
        role: "Operations Manager",
      },
      {
        key: "19",
        status: "Paused",
        name: "Mia Hernandez",
        role: "Sales Manager",
      },
      {
        key: "20",
        status: "Active",
        name: "Daniel Lewis",
        role: "DevOps Engineer",
      },
      {
        key: "21",
        status: "Active",
        name: "Amelia Clark",
        role: "Social Media Specialist",
      },
      {
        key: "22",
        status: "Active",
        name: "Jackson Walker",
        role: "Customer Support",
      },
      {
        key: "23",
        status: "Active",
        name: "Henry Hall",
        role: "Security Analyst",
      },
      {
        key: "24",
        status: "Paused",
        role: "PR Specialist",
        name: "Charlotte Young",
      },
      {
        key: "25",
        status: "Active",
        name: "Liam King",
        role: "Mobile App Developer",
      },
    ],
    []
  );

  const pages = Math.ceil(paginatedRows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return paginatedRows.slice(start, end);
  }, [page, paginatedRows]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showShadow
            page={page}
            showControls
            total={pages}
            color="secondary"
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      {...args}
    >
      <TableHeader>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const AsyncPaginatedTemplate = (args: TableProps) => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useSWR<{
    count: number;
    results: SWCharacter[];
  }>(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
    keepPreviousData: true,
  });

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data?.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState =
    isLoading || data?.results.length === 0 ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showShadow
              page={page}
              showControls
              total={pages}
              color="primary"
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      {...args}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.results ?? []}
        loadingState={loadingState}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item?.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const InfinitePaginationTemplate = (args: TableProps) => {
  const [hasMore, setHasMore] = React.useState(false);

  const list = useAsyncList<SWCharacter>({
    async load({ signal, cursor }) {
      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      const json = await res.json();

      setHasMore(json.next !== null);

      return {
        cursor: json.next,
        items: json.results,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  return (
    <Table
      baseRef={scrollerRef}
      aria-label="Example table with client side sorting"
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner color="white" ref={loaderRef} />
          </div>
        ) : null
      }
      {...args}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const Default = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
  },
};

export const Dynamic = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const EmptyState = {
  render: EmptyTemplate,

  args: {
    ...defaultProps,
  },
};

export const NoHeader = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    hideHeader: true,
  },
};

export const CustomCells = {
  render: CustomCellTemplate,

  args: {
    ...defaultProps,
    className: "max-w-3xl",
  },
};

export const Striped = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    isStriped: true,
  },
};

export const RemoveWrapper = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    removeWrapper: true,
    classNames: {
      table: "max-w-lg",
    },
  },
};

export const SingleSelection = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    selectionMode: "single",
  },
};

export const MultipleSelection = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    color: "secondary",
    selectionMode: "multiple",
  },
};

export const DisabledKeys = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    color: "warning",
    disabledKeys: ["2"],
    selectionMode: "multiple",
  },
};

export const DisallowEmptySelection = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    color: "primary",
    selectionMode: "multiple",
    defaultSelectedKeys: ["2"],
    disallowEmptySelection: true,
  },
};

export const Sortable = {
  render: SortableTemplate,

  args: {
    ...defaultProps,
  },
};

export const LoadMore = {
  render: LoadMoreTemplate,

  args: {
    ...defaultProps,
    className: "max-w-3xl max-h-auto",
  },
};

export const Paginated = {
  render: PaginatedTemplate,

  args: {
    ...defaultProps,
    className: "max-w-lg min-h-[292px]",
  },
};

export const AsyncPaginated = {
  render: AsyncPaginatedTemplate,

  args: {
    ...defaultProps,
    className: "max-w-3xl max-h-auto min-h-[400px]",
  },
};

export const InfinityPagination = {
  render: InfinitePaginationTemplate,

  args: {
    ...defaultProps,
    className: "max-w-3xl max-h-[440px] min-h-[400px] overflow-auto",
  },
};

export const HeaderSticky = {
  render: InfinitePaginationTemplate,

  args: {
    ...defaultProps,
    layout: "fixed",
    isHeaderSticky: true,
    className: "max-w-3xl max-h-[440px] min-h-[400px] overflow-auto",
  },
};

export const CustomWithClassNames = {
  render: CustomCellWithClassnamesTemplate,

  args: {
    ...defaultProps,
    classNames: {
      th: ["bg-transparent", "text-default-700", "border-b", "border-default"],
      base: [
        "max-w-3xl",
        "bg-gradient-to-br",
        "from-purple-500",
        "to-indigo-900/90",
        "shadow-xl",
      ],
      td: [
        "py-4",
        "text-sm",
        "text-default-700",
        "border-b",
        "border-default",
        "group-data-[last=true]:border-b-0",
      ],
    },
  },
};

export const DisableAnimation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    color: "secondary",
    disableAnimation: true,
    selectionMode: "multiple",
  },
};

export const TableWithSwitch = {
  render: TableWithSwitchTemplate,
  args: {
    ...defaultProps,
    selectionMode: "multiple",
  },
};
