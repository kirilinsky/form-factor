import React from "react";

interface FormWrapProps {
  children: React.ReactNode;
  columns?: number;
}

export const FormWrap = ({ children, columns = 1 }: FormWrapProps) => {
  return (
    <div
      className="grid gap-6 w-full "
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};
