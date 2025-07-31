type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <div
      className="mx-auto my-10 flex w-full max-w-380 flex-1 flex-col gap-4 px-4 lg:px-6"
      {...props}
    >
      {children}
    </div>
  );
};
