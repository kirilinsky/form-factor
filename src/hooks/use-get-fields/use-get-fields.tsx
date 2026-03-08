import { useState, useEffect } from "react";
import { FieldConfig, FieldOption } from "@/lib/types/form";
import { fetchFieldOptions } from "@/lib/fetch-select-options/fetch-select-options";

export function useGetField(field: FieldConfig) {
  const [options, setOptions] = useState<FieldOption[]>(field.options || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isApiSource =
      field.useSource && field.source?.type === "api" && field.source?.url;

    if (isApiSource) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchFieldOptions(field);
          setOptions(data);
        } catch (error) {
          console.error(`Error loading options for ${field.name}:`, error);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [field.source?.url, field.useSource]);

  return { options, isLoading };
}
