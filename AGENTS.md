# AGENTS.md

Pokédex app: React 19 + Vite 8 SPA. Plain JavaScript (JSX) — **no TypeScript**.

## Commands (pnpm — do NOT use npm)

- `pnpm dev` — dev server (restart after editing `vite.config.js`)
- `pnpm build` — production build
- `pnpm lint` — ESLint (no test or typecheck steps exist)
- `pnpm add <pkg>` — install a new dependency (never `npm i`)

## Conventions

- `@` alias → `src/` (configured in `vite.config.js`). Import as `@/App.jsx`.
- React Router v8 (declarative mode): `BrowserRouter` already wraps `<App />` in `src/main.jsx`. Define routes with `<Routes>`/`<Route>` in `App.jsx` or new route files.
- Docs/examples (e.g. react-router, Vercel skills) are TypeScript-first; strip types, write plain JSX.
- Format per `.prettierrc` (`semi: true`, single quotes). Note: `src/App.jsx` is still the untouched Vite template (semicolon-free) — match `.prettierrc`, not that file.

## Misc

- Repo-local opencode skills live in `.opencode/skills/` (react-best-practices, composition-patterns, react-view-transitions, content-semantics); agents load them automatically.
- `index.html` is the only HTML file; title/description live there, not in components.
