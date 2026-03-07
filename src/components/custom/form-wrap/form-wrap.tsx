interface FormWrapProps {
  children: React.ReactNode;
  columns: number;
}

export const FormWrap = ({ children, columns }: FormWrapProps) => {
  return (
    <div
      className="grid gap-6 w-full items-start grid-cols-1 md:[grid-template-columns:var(--grid-cols)]"
      style={
        {
          "--grid-cols": `repeat(${columns}, minmax(0, 1fr))`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
