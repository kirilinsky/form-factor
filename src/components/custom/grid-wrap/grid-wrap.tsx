"use client";

import React from "react";
import { FieldConfig } from "@/lib/types/form";

interface GridItemWrapProps {
  children: React.ReactNode;
  field: FieldConfig;
  totalColumns: number;
}

export const GridItemWrap = ({
  children,
  field,
  totalColumns,
}: GridItemWrapProps) => {
  const actualColumnSpan = Math.min(field.column || 1, totalColumns);
  const hasOffset = field.offset === "left" || field.offset === "right";

  const containerStyles: React.CSSProperties = {
    display: "grid",
    gridColumn:
      hasOffset || actualColumnSpan >= totalColumns
        ? "1 / -1"
        : `span ${actualColumnSpan}`,
    gridTemplateColumns: "subgrid",
  };

  return (
    <div style={containerStyles}>
      {field.offset === "left" && totalColumns > 1 && (
        <div className="hidden md:block" />
      )}
      <div
        style={{ gridColumn: `span ${actualColumnSpan}` }}
        className="w-full"
      >
        {children}
      </div>
      {field.offset === "right" && totalColumns > 1 && (
        <div className="hidden md:block" />
      )}
    </div>
  );
};
