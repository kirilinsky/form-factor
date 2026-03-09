"use client";

import * as React from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldConfig } from "@/lib/types/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/format-bytes/format-bytes";

export function FileField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => {
        const files: File[] = Array.isArray(value)
          ? value
          : value
            ? [value]
            : [];

        const handleFileChange = (newFiles: FileList | null) => {
          if (!newFiles) return;
          const filesArray = Array.from(newFiles);
          const result = field.fileConfig?.multiple
            ? [...files, ...filesArray]
            : filesArray[0];
          onChange(result);
        };

        const removeFile = (index: number) => {
          if (field.fileConfig?.multiple) {
            const newFiles = files.filter((_, i) => i !== index);
            onChange(newFiles.length > 0 ? newFiles : null);
          } else {
            onChange(null);
          }
        };

        const previewNode = field.fileConfig?.showUploadedPreview &&
          files.length > 0 && (
            <div className="mt-3 space-y-2 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between rounded-md border bg-muted/20 p-2 text-xs animate-in fade-in slide-in-from-top-1"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileIcon className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                    <span className="truncate font-medium">{file.name}</span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      ({formatBytes(file.size)})
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          );

        if (field.fileConfig?.compact) {
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.id}>
                {field.label}
                {field.validation.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </FieldLabel>
              <Input
                id={field.id}
                type="file"
                multiple={field.fileConfig?.multiple}
                accept={field.fileConfig?.accept}
                disabled={!field.editable}
                onChange={(e) => handleFileChange(e.target.files)}
                className={cn(fieldState.invalid && "border-destructive")}
              />
              {field.helperText && (
                <FieldDescription>{field.helperText}</FieldDescription>
              )}
              {previewNode}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        return (
          <Field
            data-invalid={fieldState.invalid}
            className="rounded-md border p-4 shadow-sm h-full flex flex-col"
          >
            <FieldContent className="flex flex-col justify-between h-full space-y-4">
              <div className="space-y-1">
                <FieldLabel className="text-sm font-medium">
                  {field.label}
                  {field.validation.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </FieldLabel>
                {field.helperText && (
                  <FieldDescription className="text-xs text-muted-foreground">
                    {field.helperText}
                  </FieldDescription>
                )}
              </div>

              <div className="space-y-3">
                <input
                  type="file"
                  ref={inputRef}
                  className="hidden"
                  multiple={field.fileConfig?.multiple}
                  accept={field.fileConfig?.accept || undefined}
                  onChange={(e) => handleFileChange(e.target.files)}
                />

                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileChange(e.dataTransfer.files);
                  }}
                  className={cn(
                    "group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 py-6 transition-colors hover:bg-muted/10",
                    fieldState.invalid && "border-destructive/50",
                  )}
                >
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="rounded-full bg-background p-2 shadow-sm border">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {field.placeholder || "Click or drag to upload"}
                    </div>
                  </div>
                </div>
                {previewNode}
              </div>
            </FieldContent>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className="mt-2" />
            )}
          </Field>
        );
      }}
    />
  );
}
