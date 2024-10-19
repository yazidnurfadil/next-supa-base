"use client";

import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

import Providers from "@/providers";

interface LoginLayoutWrapperProps {
  children: React.ReactNode;
}

export const LoginLayoutWrapper = ({ children }: LoginLayoutWrapperProps) => {
  return (
    <Providers>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="absolute inset-0 z-0 md:hidden">
            <Image
              className="size-full"
              src="https://nextui.org/gradients/docs-right.png"
              alt="gradient"
            />
          </div>
          {children}
        </div>

        <div className="my-10 hidden md:block">
          <Divider orientation="vertical" />
        </div>

        <div className="relative hidden flex-1 items-center justify-center overflow-hidden p-6 md:flex">
          <div className="absolute inset-0 z-0 flex justify-end">
            <Image
              className="size-full"
              radius="none"
              isBlurred
              disableSkeleton
              isZoomed
              src="https://www.xentech.eu/wp-content/uploads/2021/03/green-gradient-1.png"
              alt="gradient"
            />
          </div>

          <div className="z-10">
            <h1 className="text-[45px] font-bold text-success-700">ABC</h1>
            <div className="mt-4 font-light text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              possimus voluptate, sapiente assumenda deserunt repellendus,
              perferendis odit voluptas hic dolores laborum fugit ut? Architecto
              quo ex quidem vitae quae rem.
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
};
