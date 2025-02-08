import React from "react";

import { clsx } from "@heroui/shared-utils";
import { ChevronIcon } from "@heroui/shared-icons";
import { button, pagination } from "@heroui/theme";
import {
  Pagination,
  usePagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@heroui/pagination";

import { Meta } from "@storybook/react";

export default {
  component: Pagination,
  title: "Atoms/Pagination",
  argTypes: {
    page: {
      control: {
        type: "number",
      },
    },
    siblings: {
      control: {
        type: "number",
      },
    },
    boundaries: {
      control: {
        type: "number",
      },
    },
    showShadow: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
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
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "bordered", "light", "faded"],
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
} as Meta<typeof Pagination>;

const defaultProps = {
  ...pagination.defaultVariants,
  total: 10,
  siblings: 1,
  boundaries: 1,
  initialPage: 1,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithControls = {
  args: {
    ...defaultProps,
    showControls: true,
  },
};

export const PaginationLoop = {
  args: {
    ...defaultProps,
    loop: true,
    showControls: true,
  },
};

export const InitialPage = {
  args: {
    ...defaultProps,
    initialPage: 3,
  },
};

export const IsCompact = {
  args: {
    ...defaultProps,
    isCompact: true,
    showControls: true,
  },
};

export const Controlled = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex flex-col gap-5">
      <p>Page: {currentPage}</p>
      <Pagination
        {...defaultProps}
        showShadow
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          className={button({
            size: "sm",
            variant: "flat",
            color: "secondary",
          })}
        >
          Previous
        </button>
        <button
          className={button({
            size: "sm",
            variant: "flat",
            color: "secondary",
          })}
          onClick={() =>
            setCurrentPage((prev) =>
              prev < defaultProps.total ? prev + 1 : prev
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const CustomItems = () => {
  const renderItem = ({
    ref,
    value,
    onNext,
    setPage,
    isActive,
    className,
    onPrevious,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button onClick={onNext} className={clsx(className, "bg-default-200")}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          onClick={onPrevious}
          className={clsx(className, "bg-default-200")}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button className={className}>...</button>;
    }

    return (
      <button
        ref={ref}
        onClick={() => setPage(value)}
        className={clsx(
          className,
          isActive &&
            "bg-gradient-to-b from-default-500 to-default-800 font-bold text-white shadow-lg dark:from-default-300 dark:to-default-100"
        )}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      {...defaultProps}
      showControls
      radius="full"
      variant="light"
      className="gap-2"
      disableCursorAnimation
      renderItem={renderItem}
    />
  );
};

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
    showShadow: true,
    classNames: {
      base: "gap-0 rounded border-2 border-default",
      item: "w-8 h-8 text-sm rounded-none bg-transparent",
      cursor:
        "bg-gradient-to-b shadow-lg shadow-default from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
    },
  },
};

export const CustomWithHooks = () => {
  const { range, onNext, setPage, activePage, onPrevious } = usePagination({
    ...defaultProps,
    total: 6,
    siblings: 10,
    boundaries: 10,
    showControls: true,
  });

  return (
    <div className="flex flex-col gap-2">
      <p>Active page: {activePage}</p>
      <ul className="flex items-center gap-2">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} className="size-4" aria-label="next page">
                <button
                  onClick={onNext}
                  className="size-full rounded-full bg-default-200"
                >
                  <ChevronIcon className="rotate-180" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} className="size-4" aria-label="previous page">
                <button
                  onClick={onPrevious}
                  className="size-full rounded-full bg-default-200"
                >
                  <ChevronIcon />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li key={page} className="size-4">
                ...
              </li>
            );
          }

          return (
            <li key={page} className="size-4" aria-label={`page ${page}`}>
              <button
                onClick={() => setPage(page)}
                className={clsx(
                  "size-full rounded-full bg-default-300",
                  activePage === page && "bg-secondary"
                )}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
