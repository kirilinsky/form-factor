import { FieldConfig, FieldOption } from "../types/form";

/**
 * Fetches options from an external API and formats them for the Select component
 */
export async function fetchFieldOptions(
  field: FieldConfig,
): Promise<FieldOption[]> {
  if (!field.source.url) return [];

  const response = await fetch(field.source.url);

  if (!response.ok) {
    throw new Error(`Failed to fetch options from ${field.source.url}`);
  }

  const data = await response.json();

  return data.map((item: any) => ({
    label: item.name || item.label || "Unknown",
    value: String(item.id || item.value || ""),
  }));
}
