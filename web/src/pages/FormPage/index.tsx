import * as React from 'react';
import { useParams } from 'react-router-dom';
import { withTheme } from '@rjsf/core';
import { Theme as MuiTheme } from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { Alert, Box, Container, LinearProgress, Paper, Typography } from '@mui/material';
import type { UiSchema } from '@rjsf/utils';

import { buildUiSchema } from '../../utils/form';
import { fetchSchema } from '../../api/schemas';

const MuiForm = withTheme(MuiTheme);

interface SchemaRecord {
  formId: string;
  version: number;
  jsonSchema: Record<string, unknown>;
}

export default function FormPage(): React.JSX.Element {
  const { formId, version } = useParams();
  const [data, setData] = React.useState<SchemaRecord | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

React.useEffect(() => {
  if (!formId) return;
  let mounted = true;

  (async () => {
    try {
      setLoading(true);
      setError(null);

      const payload = await fetchSchema(formId, version);
      if (!mounted) return;

      if (!payload || typeof payload.jsonSchema !== 'object') {
        throw new Error('Некорректный ответ сервера: отсутствует jsonSchema');
      }
      setData(payload);
    } catch (e: any) {
      if (!mounted) return;
      setError(e?.response?.data?.message || e?.message || 'Не удалось загрузить схему');
      setData(null);
    } finally {
      if (mounted) setLoading(false);
    }
  })();

  return () => { mounted = false; };
}, [formId, version]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Загрузка схемы…</Typography>
        </Box>
        <LinearProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="warning">Данные схемы не найдены</Alert>
      </Container>
    );
  }

  const uiSchema: UiSchema = buildUiSchema(data.jsonSchema as any);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {data.formId} (v{data.version})
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <MuiForm
          schema={data.jsonSchema}
          uiSchema={uiSchema}
          validator={validator}
          showErrorList={false}
          onSubmit={(e) => alert(JSON.stringify(e.formData, null, 2))}
        />
      </Paper>
    </Container>
  );
}


