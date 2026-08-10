**@fotoowl/media-react**

***

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

## SDK Documentation

A complete TypeDoc-based API documentation configuration is set up for `@fotoowl/media-react`.

### How to Generate Documentation

Run the following command from the workspace root to generate both the HTML and Markdown documentation:

```bash
pnpm docs:sdk
```

For active development, run the following command to watch for source changes and rebuild the HTML documentation automatically:

```bash
pnpm docs:sdk:watch
```

### Documentation Output

* **HTML Site (Vercel Deployable)**: Generated in the `sdk-docs/` folder.
* **Markdown Files (GitHub / Local)**: Generated in the `sdk-docs-markdown/` folder.

### How to Preview Locally

To preview the generated HTML documentation locally:

1. Serve the `sdk-docs/` directory using any static file server (e.g., `npx serve sdk-docs`).
2. Open the served URL in your web browser.

### How to Deploy to Vercel

To deploy this documentation to Vercel (e.g., to submit as the **SDK Documentation URL**):

1. Import this repository into Vercel.
2. In the Vercel Project Settings, configure the following values:
   * **Framework Preset**: `Other`
   * **Build Command**: `pnpm docs:sdk`
   * **Output Directory**: `sdk-docs`
3. Click **Deploy**. Vercel will automatically run the build and host the resulting static site.
