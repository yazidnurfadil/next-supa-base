import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";

interface LoginLayoutWrapperProps {
  children: React.ReactNode;
}

export const LoginLayoutWrapper = ({ children }: LoginLayoutWrapperProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            alt="gradient"
            className="size-full"
            src="https://nextui.org/gradients/docs-right.png"
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
            isZoomed
            isBlurred
            radius="none"
            alt="gradient"
            disableSkeleton
            className="size-full"
            src="https://www.xentech.eu/wp-content/uploads/2021/03/green-gradient-1.png"
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
  );
};
