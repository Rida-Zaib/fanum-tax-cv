# Fanum Tax CV

An AI career assistant that reviews a user's CV, GitHub profile, and portfolio,
rates their skills, and recommends jobs, internships, courses, and extracurriculars.

## Stack
- Frontend: React (Vite, JavaScript)
- Backend: Node.js + Express
- AI: Claude API
- Database: SQLite
- External data: GitHub REST API

## Conventions
- Commits follow Conventional Commits (feat:, fix:, docs:, chore:, refactor:, test:)
- Small, focused commits; one change per commit
- camelCase for variables, PascalCase for React components
- Keep API keys in .env (never commit them)
- Run `npm test` before committing

## Project structure (planned)
- /client   React frontend
- /server   Express backend
- /docs     Notes and design decisions

## Rules (learned from FE-03)
- Forms use react-hook-form + zod. Validation lives in a zod schema file next to the component (e.g. settingsSchema.js), never inline in JSX.
- Every input has a <label htmlFor>. Errors render with role="alert" and aria-describedby.
- Every new component ships with a Vitest + React Testing Library test file, and `npm test` passes before commit.
- Each component has its own stylesheet (ComponentName.css). Do not add component styles to index.css.
- Prompts must name exact file paths. After the AI finishes, run `git status` and delete any file that is not in the spec.

## Tone of the app
Feedback is honest and specific, with a light, fun voice.

## AI assistant
Development is done with Cursor as the AI-assisted IDE.
