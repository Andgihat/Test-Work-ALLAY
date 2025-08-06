import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);

export function validateIsJsonSchema(jsonSchema: any) {
  if (typeof jsonSchema !== 'object' || jsonSchema === null) {
    throw new Error('jsonSchema must be an object');
  }
  return true;
}

export const ajvInstance = ajv;
