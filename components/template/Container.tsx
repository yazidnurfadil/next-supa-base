import { HTMLAttributes, ReactNode } from "react";

import { Card, CardBody } from "@nextui-org/card";

export interface FullScreenContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const TableContainer = ({ children }: { children: ReactNode }) => (
  <Card shadow="sm" className="mx-auto w-full">
    <CardBody>{children}</CardBody>
  </Card>
);

export const Container = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`relative max-w-screen-2xl overflow-x-visible ${className}`}>
    {children}
  </div>
);

export const FullScreenContainer = ({
  children,
  className = "",
  ...props
}: FullScreenContainerProps) => (
  <div
    {...props}
    className={`relative mx-2 grid min-h-screen items-center justify-center overflow-x-hidden ${className}`}
  >
    <div className="container my-12 max-w-screen-lg">{children}</div>
  </div>
);
