"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Container } from "@/components/atoms/Container";

type ErrorpageContainerProps = {
  error?: Error;
  reset?: () => void;
  statusCode?: number;
};

export function ErrorpageContainer({
  error,
  statusCode,
  reset: _reset,
}: ErrorpageContainerProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      data-id="element-0"
      className="flex w-full flex-1 items-center justify-center px-6 pb-[65px] lg:px-8"
    >
      <Container>
        <div data-id="element-1" className="text-center">
          <h1
            data-id="element-3"
            className="text-9xl font-bold tracking-tight sm:text-5xl"
          >
            {statusCode || 500}
          </h1>
          <p
            data-id="element-4"
            className="mt-6 text-base leading-7 text-gray-600"
          >
            {error?.message || "Internal Server Error"}
          </p>
          <div
            data-id="element-5"
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/"
              data-id="element-6"
              className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Home
            </Link>
            <a
              href="#"
              target="_blank"
              data-id="element-8"
              className="text-sm font-semibold"
            >
              Contact us{" "}
              <span aria-hidden="true" data-id="element-9">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
