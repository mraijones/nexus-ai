# Nexus AI

A React + TypeScript + Vite application with Supabase backend integration.

## 🔍 System Status

Check if the system is operational:
- **API Health Check**: `/api/health`
- **Status Page**: `/status`

For more information, see the [Health Check Documentation](./docs/health-check.md).

## 🚀 Deployment

**⚠️ Deployment Issue:** If you're experiencing deployment failures, see [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md) for detailed instructions on how to configure the required GitHub Secrets.

### Quick Fix for Deployment Issues:
The deployment requires two GitHub Secrets to be configured:
- `SUPABASE_ACCESS_TOKEN` - Your Supabase personal access token
- `SUPABASE_PROJECT_REF` - Your Supabase project reference ID

See the [Deployment Troubleshooting Guide](./DEPLOYMENT_TROUBLESHOOTING.md) for step-by-step instructions.

## 🛠️ Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## 🧭 How to see your updates

### Local preview (fastest)
1) Install deps: `npm install`  
2) Add env vars in `.env.local` (copy `.env.example` if available):
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
3) Run the app: `npm run dev` and open the URL printed by Vite (usually http://localhost:5173).  
4) (Optional) Run the worker that processes tasks in another terminal: `npm run worker`.  
5) If you haven’t run DB migrations yet, apply the SQL files in `supabase/migrations` using the Supabase SQL editor (or `supabase db push` if you use the CLI).

### Production build check
1) Ensure the same env vars are set.  
2) Build: `npm run build`.  
3) Preview the static output: `npm run preview` (serves the production bundle locally).

### Deploy (e.g., Vercel)
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the hosting platform.  
- If using the background worker, configure its env vars too (`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, etc., per `docs/integration.md`).  
- Run/verify migrations before or during deployment so the schema matches the app.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
