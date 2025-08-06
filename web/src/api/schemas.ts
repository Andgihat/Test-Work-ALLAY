import { api } from './api';

export interface SchemaRecord {
  formId: string;
  version: number;
  jsonSchema: Record<string, unknown>;
}

function buildSchemaPath(formId: string, version?: string | number): string {
  const id = encodeURIComponent(String(formId).trim());
  const v = typeof version === 'number' ? String(version) : version?.trim();

  if (!v || v === 'latest') return `/schemas/${id}/latest`;
  return `/schemas/${id}/${encodeURIComponent(v)}`;
}

export async function fetchSchema(formId: string, version?: string | number) {
  const url = buildSchemaPath(formId, version);
  const { data } = await api.get<SchemaRecord>(url);
  return data;
}

export const getLatest = (formId: string) => fetchSchema(formId, 'latest');
export const getByVersion = (formId: string, version: number | string) =>
  fetchSchema(formId, version);
