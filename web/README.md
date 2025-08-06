# Web (React + TypeScript + Vite)

UI для рендеринга форм по JSON Schema. Получает схемы с бэкенда и рисует форму (MUI) на маршруте `/:formId/:version?`.

## Требования
- Node.js ≥ 18
- Запущенный бэкенд на Nest (по умолчанию `http://localhost:3000`)

## Установка
```bash
cd web
npm i
```

## Настройка окружения
Создайте файл `.env` (или `.env.local`) в папке `web`:
```env
VITE_API_URL=http://localhost:3000
```
> После изменения `.env` перезапустите dev-сервер.

## Запуск (dev)
```bash
npm run dev
```
Откройте: http://localhost:5173

## Маршруты
- `/` — ввод `formId` и опционально `version`.
- `/:formId/:version?` — рендер формы.
  - если `version` не задана или равна `latest` → берётся последняя версия схемы.

## Билд
```bash
npm run build
npm run preview
```

## Технологии
- React + Vite + TypeScript
- Material UI (`@mui/material`)
- React JSONSchema Form (`@rjsf/mui`, валидатор AJV)
- Axios

## Возможные проблемы
- **"Invalid schema: undefined" / пустая форма** — проверьте `VITE_API_URL` и что бэкенд доступен.
- **CORS** — включите на бэке:
  ```ts
  app.enableCors({ origin: 'http://localhost:5173' });
  ```

