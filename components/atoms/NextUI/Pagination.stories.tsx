import React from "react";
import { Meta } from "@storybook/react";

import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
  usePagination,
} from "@nextui-org/pagination";
import { ChevronIcon } from "@nextui-org/shared-icons";
import { clsx } from "@nextui-org/shared-utils";
import { button, pagination } from "@nextui-org/theme";

export default {
  title: "Atoms/Pagination",
  component: Pagination,
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
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
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
    showControls: true,
    loop: true,
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
    showControls: true,
    isCompact: true,
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
          className={button({
            color: "secondary",
            size: "sm",
            variant: "flat",
          })}
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </button>
        <button
          className={button({
            color: "secondary",
            size: "sm",
            variant: "flat",
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
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button className={clsx(className, "bg-default-200")} onClick={onNext}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          className={clsx(className, "bg-default-200")}
          onClick={onPrevious}
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
        className={clsx(
          className,
          isActive &&
            "bg-gradient-to-b from-default-500 to-default-800 font-bold text-white shadow-lg dark:from-default-300 dark:to-default-100"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      {...defaultProps}
      disableCursorAnimation
      showControls
      className="gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
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
  const { activePage, range, setPage, onNext, onPrevious } = usePagination({
    ...defaultProps,
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      <p>Active page: {activePage}</p>
      <ul className="flex items-center gap-2">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page" className="size-4">
                <button
                  className="size-full rounded-full bg-default-200"
                  onClick={onNext}
                >
                  <ChevronIcon className="rotate-180" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page" className="size-4">
                <button
                  className="size-full rounded-full bg-default-200"
                  onClick={onPrevious}
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
            <li key={page} aria-label={`page ${page}`} className="size-4">
              <button
                className={clsx(
                  "size-full rounded-full bg-default-300",
                  activePage === page && "bg-secondary"
                )}
                onClick={() => setPage(page)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
