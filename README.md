# Fotoowl Media Assignment

A React + TypeScript monorepo featuring a headless media SDK and components for a Pexels integration.

## Folder Structure

- `apps/web-app`: Vite + React + TypeScript web application.
- `packages/media-core`: Framework-agnostic TypeScript SDK for the Pexels API.
- `packages/media-react`: React provider + hooks wrapper around `media-core`.
- `packages/media-native`: React Native provider + hooks wrapper around `media-core`.
- `packages/media-ui-react`: React headless components (Grid, Lightbox, Reels).
- `packages/media-ui-native`: React Native headless components (Grid, Lightbox, Reels).
- `skills/`: Guidelines and rules for AI assistants.

## Getting Started

### Prerequisites

Ensure you have [pnpm](https://pnpm.io/) installed.

### Setup and Installation

1. Clone the repository and run `pnpm install` in the root:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Typecheck packages:
   ```bash
   pnpm build
   ```

4. Lint code:
   ```bash
   pnpm lint
   ```

## AI-Assisted Work Disclosure

This project was built with the assistance of agentic AI coding assistants. 

* **AI-Assisted Features**:
  * Scaffolding the workspace, project references, and monorepo structure.
  * Designing and implementing the headless wrappers (`media-react` and `media-native`).
  * Creating the clean headless components hooks and getters in `media-ui-react`.
  * Implementing in-memory caching and request de-duplication within the `HttpClient` in `media-core`.
* **Hand-Written & Refactored Features**:
  * Fine-tuning the strict TypeScript compiler configurations.
  * Designing the API key fallback screens and environment variable injection hooks.
  * Restructuring pagination and transitioning from infinite scroll to responsive grid layouts for photos/videos.

## AI Skills Testing

We designed and tested two distinct AI skill documents in the `skills/` directory:
1. **[wiring-data](file:///c:/Users/rahul/Downloads/fotoowl-media-assignment/skills/wiring-data/SKILL.md)**: Guides the AI on context boundaries, TanStack query setup, and event logger callbacks.
2. **[using-components](file:///c:/Users/rahul/Downloads/fotoowl-media-assignment/skills/using-components/SKILL.md)**: Instructs the AI on headless prop-getters, pagination hook consumption, and modal accessibility controls.

Both files were verified in practice by using them to direct the AI assistant during subsequent feature refactoring and web application integration.

