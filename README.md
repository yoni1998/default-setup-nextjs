# Next.js + TypeScript

A scalable web application built with **Next.js**, **TypeScript**, **Tailwind CSS v4**, and **Node 24**.

## Tech Stack

- **Node 24** — Runtime used for development and project tooling.
- **pnpm** — Package manager for installing dependencies and running scripts.
- **Next.js + React + TypeScript** — Full-stack React framework with file-based routing, server rendering, and static type checking.
- **Tailwind CSS v4** — Utility-first CSS framework for styling the application.
- **ESLint** — Code quality checks using Next.js Core Web Vitals and TypeScript configurations, alongside custom rules.
- **Prettier** — Consistent code formatting, including automatic Tailwind CSS class sorting.
- **Dependency Cruiser** — Validates module dependencies and architectural boundaries.
- **Playwright** — End-to-end (E2E) testing in a real browser.
- **Husky** — Git hooks integration.

## Architecture

The project follows a **feature-based architecture inspired by Bulletproof React**, adapted to the Next.js App Router.

Code is organized around application features rather than grouping everything by technical type. This keeps related components, hooks, API logic, schemas, and feature-specific types together.

The architecture aims to establish clear boundaries between:

- **App** — Next.js routes, layouts, loading states, error boundaries, and application-level composition.
- **Features** — Self-contained business features and their related components, hooks, API logic, schemas, and state.
- **Shared** — Reusable UI components, utilities, hooks, and other code that is not specific to a single feature.

The `app/` directory handles routing and page composition, while feature-specific implementation lives in `features/`. This helps prevent route definitions from becoming tightly coupled to business logic.

**Dependency Cruiser** helps enforce these boundaries by detecting unwanted dependencies between modules.

Next.js Server Components are used by default. Client Components are introduced only where browser-side interactivity, React state, or event handlers are required.

## Getting Started

### Prerequisites

Install the following tools:

- [Node 24](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

Check your installed versions:

```bash
node --version
pnpm --version
```

### Installation

Clone the repository, navigate to the project directory, and install the dependencies:

```bash
pnpm install
```

### Start the Development Server

```bash
pnpm dev
```

Next.js starts the development server and displays the local URL in the terminal, usually `http://localhost:3000`.

### Production Build

```bash
pnpm build
```

This creates an optimized production build using Next.js. The generated build output is stored in `.next/`.

Start the production server locally:

```bash
pnpm start
```

Build the application before running the production server.

## Development Tools

### Code Quality and Validation

Run the available checks individually:

| Command             | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `pnpm typecheck`    | Checks TypeScript types without emitting output.                            |
| `pnpm lint`         | Runs ESLint across the project.                                             |
| `pnpm lint:fix`     | Automatically fixes supported ESLint issues.                                |
| `pnpm format`       | Formats supported project files with Prettier.                              |
| `pnpm format:check` | Checks formatting without modifying files.                                  |
| `pnpm depcruise`    | Analyzes dependencies in `src/` against the configured architectural rules. |

Run all configured quality checks in sequence:

```bash
pnpm check
```

This runs type checking, linting, formatting validation, and Dependency Cruiser.

### Bundle Analysis

Next.js supports bundle analysis through its built-in analyzer in compatible versions. Configure and run the analyzer according to the installed Next.js version when bundle inspection becomes necessary.

### End-to-End Testing with Playwright

Playwright tests application behavior through browser interactions, helping verify complete user flows.

Run the E2E test suite:

```bash
pnpm test:e2e
```

Launch the interactive Playwright UI:

```bash
pnpm test:e2e:ui
```

Generate tests by interacting with the application in a browser:

```bash
pnpm test:e2e:codegen
```

The code-generation script targets `http://localhost:3000`. Make sure the Next.js development server is running at that URL before starting code generation.

## Available Scripts

| Script                  | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `pnpm dev`              | Starts the Next.js development server.            |
| `pnpm build`            | Creates an optimized production build.            |
| `pnpm start`            | Starts the production server.                     |
| `pnpm typecheck`        | Runs TypeScript checks without emitting files.    |
| `pnpm lint`             | Checks project code with ESLint.                  |
| `pnpm lint:fix`         | Fixes supported lint issues automatically.        |
| `pnpm format`           | Formats project files with Prettier.              |
| `pnpm format:check`     | Checks formatting without modifying files.        |
| `pnpm depcruise`        | Checks dependency rules and module relationships. |
| `pnpm check`            | Runs all configured quality checks.               |
| `pnpm test:e2e`         | Runs Playwright E2E tests.                        |
| `pnpm test:e2e:ui`      | Opens the Playwright UI.                          |
| `pnpm test:e2e:codegen` | Opens Playwright Codegen for the configured URL.  |

## Project Conventions

- Use TypeScript for application code.
- Prefer Server Components unless client-side interactivity is required.
- Keep business logic inside its corresponding feature.
- Keep shared components generic and independent of individual features.
- Validate external input at application boundaries.
- Keep environment variables and server-only logic out of Client Components.
- Use ESLint for code quality and Prettier for formatting.
- Use Dependency Cruiser to maintain architectural boundaries.
- Write Playwright tests for critical user flows.
