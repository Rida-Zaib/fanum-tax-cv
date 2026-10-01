@'
# Fanum Tax CV

An AI career assistant that reviews a user's CV, GitHub profile, and portfolio,
rates their skills, and recommends jobs, internships, courses, and extracurriculars.

## Stack
- Frontend: React
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

## Tone of the app
Feedback is honest and specific, with a light, fun voice.

## AI assistant
Development is done with Cursor as the AI-assisted IDE.
'@ | Set-Content CLAUDE.md -Encoding utf8