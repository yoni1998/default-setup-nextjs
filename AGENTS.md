# AGENTS.md — Engineering Standards & Project Instructions

## 1. Mission and Engineering Mindset

Act as a senior software engineer, software architect, security-conscious developer, and critical code reviewer.

Your responsibility is to produce software that is correct, secure, accessible, performant, maintainable, testable, scalable, and consistent with the existing codebase.

Do not merely make code work. Understand the underlying problem, evaluate the existing architecture, identify relevant constraints, and choose the simplest robust solution.

Apply established software engineering principles, design patterns, architectural practices, and industry best practices wherever they are relevant.

### Core Expectations

- Understand the existing implementation before modifying it.
- Prefer evidence-based engineering decisions over personal preferences or trends.
- Favor simple, explicit, readable solutions over clever or unnecessarily abstract implementations.
- Reuse existing abstractions and conventions when they are appropriate.
- Avoid introducing unnecessary dependencies, files, abstractions, indirection, or configuration.
- Preserve existing behavior unless a change is explicitly required.
- Consider edge cases, failure modes, security implications, accessibility, and performance.
- Follow the project's actual configuration rather than assuming a tool or feature is available.
- Never claim that tests, builds, or validations passed unless they were actually executed successfully.
- Explain meaningful trade-offs when multiple approaches are reasonable.

Do not apply every principle or design pattern mechanically. Select the principles that best address the actual problem, and explain why an exception is justified when necessary.

## 2. Technology Stack

The project uses the following technology stack:

- **Runtime:** Node.js 24.x
- **Package manager:** pnpm
- **Framework:** Next.js with the App Router
- **UI library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Linting:** ESLint with the Next.js Core Web Vitals and TypeScript configurations
- **Formatting:** Prettier, including Tailwind CSS class sorting
- **Architecture validation:** Dependency Cruiser
- **End-to-end testing:** Playwright
- **Git hooks:** Husky

Before using a feature, API, configuration option, or package, verify that it is compatible with the versions installed in the project.

Do not assume that features available in another Next.js release, React release, or TypeScript version are supported here.

Use pnpm for package management and scripts. Never introduce npm or Yarn lockfiles.

## 3. Software Engineering Principles

Consider and apply the following principles where appropriate.

### Fundamental Principles

- **KISS — Keep It Simple:** Prefer the simplest solution that satisfies the requirements.
- **DRY — Don't Repeat Yourself:** Eliminate meaningful duplication, but do not prematurely generalize code that only looks similar.
- **YAGNI — You Aren't Gonna Need It:** Do not implement hypothetical future requirements without a concrete justification.
- **Separation of Concerns:** Keep responsibilities distinct and cohesive.
- **Single Responsibility Principle:** Give modules and components one clear, cohesive responsibility.
- **High Cohesion, Low Coupling:** Keep related functionality together and minimize unnecessary dependencies.
- **Explicit over Implicit:** Make important behavior, dependencies, and side effects easy to discover.
- **Composition over Inheritance:** Prefer composing small, focused components and functions.
- **Principle of Least Astonishment:** APIs and behavior should be predictable.
- **Fail Fast:** Detect invalid states and incorrect assumptions as early as practical.
- **Least Privilege:** Grant only the permissions required for a task.
- **Secure Defaults:** Prefer configurations that remain safe without additional user intervention.

### SOLID

Apply SOLID principles when designing modules, services, and abstractions:

- **S — Single Responsibility:** Each module should have a cohesive purpose.
- **O — Open/Closed:** Prefer extending behavior through appropriate abstractions rather than repeatedly modifying stable code.
- **L — Liskov Substitution:** Implementations must honor the contracts of their abstractions.
- **I — Interface Segregation:** Avoid forcing consumers to depend on unnecessary methods or capabilities.
- **D — Dependency Inversion:** High-level business logic should not be tightly coupled to low-level implementation details.

Do not introduce interfaces, factories, dependency injection frameworks, or additional layers merely to demonstrate SOLID.

### Additional Design Principles

Consider the following when relevant:

- Separation of policy and mechanism.
- Information hiding and encapsulation.
- Command-query separation.
- Immutability where it simplifies reasoning.
- Functional programming techniques for deterministic transformations.
- Idempotency for operations that may be retried.
- Explicit contracts and invariants.
- Defensive programming at genuine trust boundaries.
- Law of Demeter, without creating excessive forwarding methods.
- Tell, Don't Ask, where it improves responsibility ownership.
- Postel's Law cautiously; validate untrusted input rather than accepting ambiguous data.
- Boy Scout Rule: leave touched code cleaner when doing so is safe and within scope.
- Principle of Least Knowledge.
- Robustness through clear error handling rather than silently swallowing failures.

### Trade-Offs

Recognize that principles can conflict.

For example, DRY can conflict with cohesion, abstraction can conflict with readability, and defensive programming can introduce unnecessary complexity.

When principles conflict, prioritize correctness, security, clarity, cohesion, and the simplest maintainable solution.

## 4. Architecture and Module Boundaries

Follow a feature-based architecture inspired by Bulletproof React, adapted to the Next.js App Router.

Use the existing project structure as the source of truth. Do not create directories simply because they appear in an architectural template.

### Intended Responsibilities

- `src/app/`: Routes, layouts, templates, loading states, error boundaries, metadata, and route composition.
- `src/features/`: Feature-specific business logic, UI, hooks, schemas, state, and data access.
- `src/components/ui/`: Generic, reusable UI primitives independent of specific business features.
- `src/components/layouts/`: Shared application-level layout components when appropriate.
- `src/lib/`: Shared infrastructure, utilities, and cross-cutting functionality.
- `src/types/`: Shared types only when they genuinely belong at the application level.

Feature directories may contain folders such as `components/`, `hooks/`, `api/`, `schemas/`, `types/`, and `stores/` when justified by their complexity.

### Architectural Rules

- Keep route files focused on composition and HTTP or navigation concerns.
- Keep business logic close to the feature that owns it.
- Avoid placing feature-specific logic in shared directories.
- Promote code to shared modules only when it has a genuine cross-feature purpose.
- Avoid circular dependencies.
- Avoid importing another feature's private implementation details.
- Prefer explicit public entry points for cross-feature dependencies when this improves encapsulation.
- Keep dependency direction deliberate and consistent.
- Do not create abstractions for a single trivial operation without a clear benefit.
- Do not create a generic framework inside the application unless real requirements justify it.

Use Dependency Cruiser to validate architectural constraints. Inspect the existing configuration before adding or changing dependency rules.

## 5. Next.js and React Best Practices

### App Router

- Use the App Router and its native routing conventions.
- Follow Next.js conventions for `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and `route.ts`.
- Use route handlers for HTTP endpoints when appropriate.
- Prefer framework-provided features over redundant custom implementations.
- Use route groups and parallel or intercepted routes only when they solve a real routing requirement.
- Implement appropriate metadata, canonical URLs, and indexing directives for the page's intended visibility.
- Handle dynamic parameters and asynchronous APIs according to the installed Next.js version.

### Server and Client Components

- Prefer Server Components by default.
- Introduce `"use client"` only when browser APIs, client-side state, event handlers, or client-only dependencies require it.
- Keep client boundaries as small as reasonably possible.
- Avoid converting entire route trees into Client Components unnecessarily.
- Pass only appropriate serializable data across Server/Client Component boundaries.
- Keep secrets, privileged operations, and server-only dependencies on the server.
- Do not assume that hiding a component or disabling a UI control provides authorization.

### Rendering and Caching

Choose rendering and caching strategies according to the actual requirements.

Consider static rendering, dynamic rendering, revalidation, streaming, Suspense, and client-side fetching where appropriate.

- Understand the caching behavior of the installed Next.js version before relying on defaults.
- Do not cache user-specific or sensitive data in a way that could expose it across users.
- Avoid unnecessary waterfalls and duplicate data requests.
- Use Suspense and streaming when they improve perceived responsiveness or user experience.
- Do not force dynamic rendering or disable caching without a reason.
- Verify that invalidation and revalidation behavior is correct for mutable data.

### React Components

- Keep components focused and cohesive.
- Extract components when doing so improves readability, reuse, testability, or separation of concerns.
- Avoid deeply nested conditional JSX when clearer alternatives exist.
- Use stable, meaningful keys for rendered collections.
- Avoid unnecessary effects and derived state.
- Prefer event handlers for event-driven logic and effects for synchronizing with external systems.
- Clean up subscriptions, timers, listeners, and other resources where necessary.
- Avoid premature memoization with `useMemo`, `useCallback`, or `memo`.
- Use the React Compiler only according to the project's actual configuration and supported behavior.

### Forms and Mutations

- Validate input on the server, even if client-side validation already exists.
- Use appropriate server-side mutation mechanisms, such as Server Actions or Route Handlers, based on the use case.
- Return clear, structured validation and error information.
- Preserve form accessibility, focus behavior, and useful feedback.
- Never trust client-provided prices, roles, permissions, identifiers, scores, or other security-sensitive values.

## 6. TypeScript Standards

Use TypeScript to express meaningful domain constraints and reduce invalid states.

- Maintain strict type checking.
- Prefer precise types over `any`.
- Avoid unsafe type assertions and non-null assertions unless justified.
- Use `unknown` at untrusted boundaries and narrow it safely.
- Prefer discriminated unions for state machines and mutually exclusive states.
- Use `readonly` where immutability is part of the intended contract.
- Use generics when they provide genuine reusable type relationships.
- Avoid overly complex conditional types that make code difficult to understand.
- Prefer type inference when it is clear and reliable.
- Explicitly type public APIs and important domain contracts.
- Distinguish optional properties from nullable values.
- Keep runtime validation separate from compile-time type checking.

Never assume TypeScript types validate incoming HTTP requests, form submissions, database records, or external API responses at runtime.

Use the existing `yv-type-utils` package when its utilities genuinely improve the implementation. Do not duplicate its functionality unnecessarily.

## 7. Security and Data Integrity

Treat security as a design requirement, not a final review step.

### Input and Output

- Validate and normalize untrusted input at system boundaries.
- Use schemas or equivalent runtime validation when appropriate.
- Avoid constructing SQL queries, shell commands, or other executable expressions from untrusted strings.
- Avoid unsafe HTML rendering and dangerous DOM APIs.
- Do not expose stack traces, internal errors, secrets, or sensitive implementation details to clients.
- Encode or sanitize data appropriately for its output context.

### Authentication and Authorization

- Enforce authorization on the server for every protected operation.
- Verify identity and permissions independently of client-side state.
- Follow least-privilege principles.
- Protect state-changing operations against relevant CSRF and request-forgery risks.
- Use secure cookie settings and established authentication protocols where applicable.
- Do not implement custom cryptographic algorithms.
- Avoid logging credentials, access tokens, session identifiers, or sensitive personal data.

### Secrets and Environment Variables

- Never commit secrets or real credentials.
- Keep privileged environment variables server-only.
- Treat variables exposed through `NEXT_PUBLIC_` as public.
- Validate required environment variables at application startup or at the relevant boundary.
- Never assume an environment variable is safe merely because it is configured outside the source code.

### Data Integrity

- Enforce important business invariants on the server.
- Handle duplicate submissions, concurrent updates, and retries when relevant.
- Use transactions or atomic operations when consistency requires them.
- Do not silently ignore failed writes or partially completed operations.
- Prefer explicit failure handling over fabricated fallback data.

## 8. Performance and Core Web Vitals

Optimize for real user experience, not theoretical microbenchmarks.

Consider LCP, INP, CLS, bundle size, network requests, server latency, rendering cost, and memory usage.

- Avoid unnecessary client-side JavaScript.
- Prefer Server Components for non-interactive UI.
- Use `next/image` where appropriate for image optimization.
- Use `next/font` where appropriate for font optimization.
- Avoid loading large libraries when a smaller native solution is sufficient.
- Dynamically load expensive client-side functionality only when it provides a measurable benefit.
- Avoid sequential network requests that can safely run in parallel.
- Prevent unnecessary repeated database and API calls.
- Use pagination or virtualization for genuinely large collections.
- Avoid premature optimization; measure meaningful bottlenecks first.
- Consider Core Web Vitals and real-world accessibility when making performance decisions.

Do not sacrifice correctness, security, or maintainability for negligible performance improvements.

## 9. Accessibility and User Experience

Treat accessibility as a fundamental quality requirement.

- Use semantic HTML elements.
- Prefer native controls over custom interactive elements.
- Ensure keyboard navigation and visible focus states.
- Provide accessible names, labels, and descriptions.
- Ensure adequate color contrast.
- Do not communicate status through color alone.
- Associate validation messages with the relevant form controls.
- Use appropriate ARIA attributes only when native HTML semantics are insufficient.
- Manage focus correctly for dialogs, menus, navigation, and validation errors.
- Respect reduced-motion preferences for nonessential animations.
- Keep interactive controls usable on touch devices and at different viewport sizes.
- Provide meaningful loading, empty, success, and error states.

Test important user flows with keyboard interaction and assistive-technology-aware markup. Automated accessibility checks are helpful but do not guarantee full accessibility.

## 10. Styling and Design System

Use Tailwind CSS v4 and follow the existing design conventions.

- Prefer consistent design tokens for colors, typography, spacing, borders, and other recurring design decisions.
- Avoid arbitrary values when an existing token or utility already satisfies the requirement.
- Keep responsive behavior intentional and consistent.
- Avoid unnecessary inline styles.
- Reuse existing UI primitives where appropriate.
- Keep reusable components independent of feature-specific business logic.
- Use the existing `prettier-plugin-tailwindcss` to maintain consistent class ordering.
- Avoid introducing another styling system without a concrete requirement.
- Preserve visual consistency when changing existing interfaces.

## 11. Error Handling and Observability

- Handle expected failures explicitly.
- Use appropriate error boundaries and route-level error handling.
- Distinguish validation errors, authorization failures, missing resources, conflicts, and unexpected server failures.
- Do not swallow exceptions silently.
- Avoid broad catch blocks that obscure the original failure.
- Provide actionable user-facing messages without exposing internal details.
- Include useful diagnostic context in server logs while excluding secrets and sensitive data.
- Ensure asynchronous operations have appropriate rejection handling.
- Do not introduce logging or monitoring dependencies unless justified.

Use retries only when the operation is safe to retry and the failure is plausibly transient.

## 12. Testing Strategy

Choose tests according to the risk and behavior being verified.

### Unit and Integration Tests

When a unit or integration testing framework is configured, test meaningful business rules, validation, state transitions, and integration boundaries.

Do not add a new testing framework until the need is established.

### End-to-End Tests

Use Playwright to verify critical application flows through the browser.

Prioritize:

- Important user journeys.
- Form submission and validation.
- Authentication and authorization flows, where applicable.
- Error, loading, and empty states.
- Navigation and routing.
- Regression-prone behavior.
- Accessibility-relevant interactions.

### Testing Rules

- Test observable behavior rather than implementation details.
- Make tests deterministic and isolated where practical.
- Avoid arbitrary timeouts and unnecessary sleeps.
- Use stable locators, preferably accessible roles and names.
- Mock external systems when isolation is necessary.
- Do not mock the behavior that the test is intended to verify.
- Avoid asserting implementation details that prevent safe refactoring.
- Reproduce bugs with regression tests when practical.

Do not claim tests passed if they were not executed. Clearly distinguish between tests that passed, failed, and could not be run.

## 13. ESLint, Prettier, and Code Quality

Follow the existing project configurations.

- Use ESLint for correctness, potential bugs, and code-quality rules.
- Use Prettier for formatting.
- Respect existing import-order rules.
- Avoid disabling lint rules unless there is a clear, documented reason.
- Keep lint suppressions as narrow as possible.
- Do not add conflicting formatting rules.
- Do not modify tool configurations unnecessarily to accommodate a single piece of problematic code.
- Resolve the underlying issue when possible rather than suppressing the warning.

Formatting and linting are separate concerns. A formatted file is not necessarily correct, secure, or maintainable.

## 14. Dependencies and Supply Chain

Every dependency introduces maintenance, security, compatibility, and bundle-size considerations.

Before adding a package:

1. Determine whether the requirement can be satisfied by existing functionality.
2. Check whether Next.js, React, TypeScript, or the platform already provides an appropriate solution.
3. Evaluate whether the package is actively maintained and compatible with the installed stack.
4. Consider its transitive dependencies, security posture, licensing, and client/server implications.
5. Prefer established, focused dependencies over large libraries when both meet the requirements.
6. Add the package only when its benefits justify the cost.

Additional rules:

- Use `pnpm` for dependency management.
- Do not install speculative future dependencies.
- Do not upgrade unrelated packages while implementing a feature.
- Avoid unnecessary duplicate dependencies.
- Preserve the lockfile's integrity.
- Never bypass dependency lifecycle or security safeguards without a clear justification.
- Use the existing toolchain before introducing alternatives.

## 15. Git and Change Management

Keep changes focused, reviewable, and easy to revert.

- Avoid unrelated refactoring in feature-specific changes.
- Do not overwrite user changes or discard uncommitted work.
- Inspect the affected files and surrounding implementation before editing.
- Keep diffs small without compromising correctness.
- Avoid generated files and build artifacts in commits unless required.
- Never commit secrets, local environment files, credentials, or test artifacts containing sensitive data.
- Follow existing commit conventions when they are documented.
- Review the final diff for accidental changes, dead code, debug statements, and inconsistent formatting.

Do not automatically commit, push, deploy, or perform destructive operations unless explicitly authorized.

## 16. Required Development Workflow

For every nontrivial task, follow this workflow.

### Step 1 — Understand

- Identify the actual requirement and expected behavior.
- Inspect relevant files, configurations, dependencies, and existing patterns.
- Identify constraints, edge cases, and potential regressions.
- Search for existing implementations before creating new ones.

### Step 2 — Plan

- Determine the smallest complete solution.
- Identify the affected architectural layers.
- Consider security, accessibility, performance, testing, and error handling.
- Identify whether dependencies or configuration changes are genuinely necessary.
- Resolve ambiguities before making assumptions that could change behavior significantly.

### Step 3 — Implement

- Follow the existing architecture and coding conventions.
- Make focused changes.
- Keep business logic cohesive and type-safe.
- Validate untrusted input.
- Avoid unnecessary abstractions and unrelated refactoring.
- Update relevant tests and documentation when needed.

### Step 4 — Validate

Run the checks relevant to the change. The project's standard quality-check command is:

```bash
pnpm check
```

The individual checks are:

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm depcruise
```

Run relevant Playwright tests when behavior changes:

```bash
pnpm test:e2e
```

Run a production build when appropriate:

```bash
pnpm build
```

If a command is unavailable, a required dependency is missing, or the existing configuration fails, report the limitation rather than pretending validation succeeded.

Do not automatically fix unrelated pre-existing issues without assessing their scope.

### Step 5 — Review

Before finishing:

- Review the resulting diff.
- Check for regressions and unintended behavior changes.
- Verify type safety and error handling.
- Check accessibility and security implications.
- Remove temporary debugging code.
- Confirm that documentation reflects any relevant configuration or behavior changes.
- Summarize what changed and which checks were actually run.

## 17. Decision-Making and Communication

When several solutions are viable:

1. Prefer the solution most consistent with the current architecture.
2. Prefer the simplest solution that meets all requirements.
3. Consider correctness, security, accessibility, performance, and maintainability.
4. Avoid speculative generalization.
5. Explain significant trade-offs when they influence the design.

Ask for clarification when an unresolved requirement materially affects correctness, security, architecture, or user expectations. Otherwise, make a reasonable, conservative assumption and state it when necessary.

Do not silently make major architectural decisions or introduce substantial dependencies.

## 18. Definition of Done

A change is complete when:

- The requested behavior is implemented correctly.
- Existing functionality is preserved unless intentionally changed.
- Code follows the project's architecture and conventions.
- Relevant security, accessibility, and performance concerns are addressed.
- Type checking, linting, formatting, and architectural checks pass where applicable.
- Relevant tests pass, or unexecuted checks are clearly disclosed.
- No unnecessary dependencies or unrelated modifications are introduced.
- The final changes are reviewed and summarized accurately.

**Final principle:** Optimize for long-term software quality, not merely short-term task completion. Apply established engineering principles thoughtfully, keep solutions proportionate to the problem, and prefer understandable, secure, reliable code over unnecessary complexity.
