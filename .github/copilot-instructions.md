## Quick orientation for AI coding agents

This repo is a small full‑stack todo app. Give concise, local-first edits and prefer the existing patterns.

High-level architecture
- Client: Create React App located at the repository root `src/` (entry `src/index.js`, main UI in `src/App.jsx`). The client uses Axios and expects the API at `http://localhost:5000/api/todos` (see `src/App.jsx`).
- Server: Express + Mongoose in `server/` (entry `server/src/index.js`). Uses ES modules (`"type": "module"` in `server/package.json`).
- Data: MongoDB via Mongoose. Model is `server/src/models/Todo.js`.

Run & debug (local development)
- Start server: cd into `server` and run `npm run dev` (requires `MONGO_URI` in environment). `dev` uses `nodemon` and watches `server/src`.
- Start client: from repo root run `npm start` (CRA on port 3000). The client currently calls the server at `http://localhost:5000` directly.
- Example .env for local server (create `server/.env`):

  MONGO_URI=mongodb://localhost:27017/todolist
  PORT=5000

API surface (what the client expects)
- GET  /api/todos        — returns array of todos (client expects `_id` fields)
- POST /api/todos        — body { text } → creates todo
- PATCH /api/todos/:id   — partial update (used for toggling `done`)
- DELETE /api/todos/:id  — deletes a todo

Data shape (model / important fields)
- `server/src/models/Todo.js` defines:
  - text: String (required)
  - done: Boolean (default false)
  - priority: enum ["low","medium","high"] (default "medium")
  - deadline: Date | null
  - timestamps: createdAt, updatedAt

Conventions & important notes
- Server uses ES modules (import/export). Keep that style when editing `server/`.
- Routes and messages use Vietnamese comments/strings in `server/src/routes/todo.js`. Preserve or intentionally translate if changing user-facing messages.
- Client uses full API URL string in `src/App.jsx`. If you change the server port or want proxying, update `src/App.jsx` or add a CRA `proxy` setting in root `package.json`.
- `useLocalStorage` hook (in `src/hooks/useLocalStorage.js`) debounces writes (300ms). If you persist additional client state, follow this debounce pattern.
- UI uses Tailwind classes (see `tailwind.config.js` + `postcss.config.js`). Keep present utility classes rather than rewriting blocks of CSS.

Common edits and where to change things
- Add a new Todo field: update `server/src/models/Todo.js`, update route handlers if validation needed (`server/src/routes/todo.js`), and update client UI (`src/App.jsx` + relevant `src/components/*`). The client expects `_id` as the identifier.
- Change API behavior: update `server/src/routes/todo.js` and then update `src/App.jsx` Axios calls. The client code in `src/App.jsx` maps responses directly into state.

Testing & lint
- Client tests: use CRA test runner (`npm test` from repo root). There are no server tests by default.
- No project-wide linter config beyond CRA defaults.

Edge cases observed
- Server route handlers return Vietnamese error messages and always use status 500 for unexpected errors — preserve status codes when possible.
- Client update flow assumes optimistic response from server returns the updated document (the patch handlers return the new doc via `{ new: true }`). Keep that contract.

If you need clarification
- Ask about preferred language for messages (Vietnamese vs English), desired API stability, or whether you'd like a single command to run both client and server (we can add a root `concurrently` script).

Files to open first
- `server/src/index.js`, `server/src/routes/todo.js`, `server/src/models/Todo.js`, `src/App.jsx`, `src/components/ToDoInput.jsx`, `src/hooks/useLocalStorage.js`.

Keep changes minimal and local-first. When adding features, wire model → route → client in that order and run the server (server logs DB connect) before verifying the UI.
