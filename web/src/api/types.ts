export interface SchemaRecord {
  formId: string;
  version: number;
  jsonSchema: Record<string, unknown>;
}
