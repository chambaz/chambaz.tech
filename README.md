# Adam Chambers — portfolio

A single-page portfolio built with Vite, React, TypeScript, and Tailwind CSS v4.

## Run locally

Use Node.js 22.12 or later.

```sh
npm install
npm run dev
```

## Check and build

```sh
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist` directory to a static host.

## Edit content

- `src/content.ts`: biography, role, projects, and social URLs. Empty URLs display a pending label instead of a link.
- `src/App.tsx`: headings and page layout.
- `src/index.css`: fonts, theme colors, and visual studies. Layout styles use Tailwind utilities.

Fonts load from Google Fonts and rsms.me, with local fallback fonts. Theme preference follows the operating system until the visitor uses the theme button. A saved preference applies before React starts.

## Before launch

Confirm role wording and project selections. Replace draft descriptions, contribution notes, and visual studies with approved content and assets. Add exact project and social URLs. Confirm domain details and update page metadata.

The 3D element is deferred to the next design stage. The current page has no animation or WebGL dependency.
