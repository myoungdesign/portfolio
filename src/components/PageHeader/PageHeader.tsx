type PageHeaderProps = {
  children: React.ReactNode;
};

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className="w-full bg-gray-10 px-4 pb-4 pt-32">
      <div className="mx-auto w-full max-w-(--container-8xl) pb-3 pt-4">
        <h1>{children}</h1>
      </div>
    </div>
  );
}
