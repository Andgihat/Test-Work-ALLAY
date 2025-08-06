import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function HomePage() {
  const [formId, setFormId] = React.useState('');
  const [version, setVersion] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = formId.trim();
    const versionSchemas = version.trim();
    if (!id) return;
    navigate(
      versionSchemas
        ? `/${encodeURIComponent(id)}/${encodeURIComponent(versionSchemas)}`
        : `/${encodeURIComponent(id)}/latest`
    );
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Открыть форму по схеме
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="ID Схемы"
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
              placeholder="auth-form"
              required
              fullWidth
              autoFocus
            />

            <TextField
              label="Версия"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="оставьте пустым для latest"
              fullWidth
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              helperText="Пусто — откроется последняя версия"
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Открыть
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

