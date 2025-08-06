import type { RJSFSchema, UiSchema } from '@rjsf/utils';

export function humanizeKey(key: string): string {
  const s = key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s ? s[0].toUpperCase() + s.slice(1) : key;
}

export function buildUiSchema(schema: RJSFSchema): UiSchema {
  const ui: UiSchema = { 'ui:submitButtonOptions': { submitText: 'Отправить' } };
  const props = (schema as any)?.properties ?? {};

  Object.keys(props).forEach((key) => {
    ui[key] = ui[key] ?? {};

    if (!props[key]?.title) {
      (ui[key] as any)['ui:title'] = humanizeKey(key);
    }

    if (key.toLowerCase().includes('password')) {
      (ui[key] as any)['ui:widget'] = 'password';
      (ui[key] as any)['ui:placeholder'] = '••••••••';
    }

    if (props[key]?.type === 'array') {
      const prev = (ui[key] as any)['ui:options'] || {};
      (ui[key] as any)['ui:options'] = { ...prev, orderable: false };
    }
  });

  return ui;
}
