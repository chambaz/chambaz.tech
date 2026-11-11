# chambaz.tech - portfolio & writing

A static site built with **Zola 0.23.6** and Tailwind CSS v4. Zola compiles Markdown and Tera templates into HTML. Small browser scripts handle the theme preference and mobile menu. A client-side Three.js scene renders the hero’s Game of Life. All content and navigation work without JavaScript.

## Setup

Install [Zola](https://www.getzola.org/documentation/getting-started/installation/) 0.23.6 and Node.js 22.13 or later. Node is used for asset builds and browser checks, not for serving the published site.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Development includes drafts. CSS, scene JavaScript, and Zola content rebuild on changes.

```sh
npm run preview # Preview without drafts
npm run build   # Production HTML and assets in public/
npm run check   # Validate Markdown and links
npm run lint
npx playwright install chromium
npm test
```

## Write an essay

Create `content/writing/my-essay/index.md`:

```markdown
+++
title = "My essay"
description = "A short description for the writing index and search engines."
date = 2026-11-09
draft = true
+++

Write your essay here.

## A section

Markdown becomes HTML at build time.
```

Preview at `/writing/my-essay/`. Put images beside `index.md` and reference them as `![A useful description](image.jpg)`. Link to another essay with `[Link text](@/writing/my-essay/index.md)` so Zola can validate the link.

Set `draft = false` to publish. Production builds exclude drafts from article pages, the writing index, feeds, and sitemap. The supplied `first-essay` draft demonstrates formatting; replace or delete it. It is not a published essay.

Writing currently has a coming-soon state on the homepage and in navigation. Set `writing_coming_soon = false` under `[extra]` in `config.toml` when ready to show the latest articles and restore the navigation link. This setting does not change article draft status or disable direct article URLs.

The writing index sorts by date, with ten essays per page. Dates are required. Set `draft = true` for unpublished work; a future date alone does not schedule publication. Zola creates an Atom feed at `/writing/atom.xml` and a sitemap at `/sitemap.xml`.

## Edit the site

- `data/portfolio.toml`: biography, projects, and social URLs. Project website URLs are optional.
- `config.toml`: domain, metadata, navigation, and Markdown settings.
- `templates/index.html`: homepage layout.
- `templates/writing/`: writing index and article layouts.
- `templates/partials/`: shared header, footer, and hero simulation markup.
- `styles/site.css`: Tailwind source, theme tokens, fonts, and Markdown typography.
- `static/js/`: theme and menu behavior.
- `scripts/life/`: simulation rules, interaction state, and Three.js rendering.

Fonts load from Google Fonts, with local fallback fonts. The saved theme follows the same preference key as the previous site. Generated CSS, JavaScript bundles, and HTML are ignored by Git. Run `npm run assets` before invoking Zola directly.

## Game of Life

The hero is an interactive Conway’s Game of Life board rendered with Three.js. Draw cells or choose Random seed to start, then drag to rotate the view. It runs entirely in the browser, supports touch and keyboard input, respects reduced motion, and falls back to a static grid when JavaScript or WebGL is unavailable.

- `scripts/life/engine.js`: simulation rules and seeding.
- `scripts/life/index.js`: simulation timing and interaction state.
- `scripts/life/scene.js`: 3D rendering, camera, and input handling.

Run `npm run js` to bundle the code; Zola copies the assets into the static site.

## Publish

Confirm `base_url` in `config.toml` (currently `https://www.chambaz.tech`). Run `npm ci` and `npm run build`, then publish `public/` to any static host. Configure the host to serve `404.html` for missing pages. No application server is needed.

Railway builds the root `Dockerfile` on pushes to `main`. The build stage installs Node.js and Zola; the runtime uses Caddy to serve only the generated files. Caddy listens on Railway's `PORT` (8080 locally), serves the custom 404 page, and redirects `chambaz.tech` to `www.chambaz.tech`. Railway handles HTTPS.

To test the container locally, run `docker build -t chambaz-tech .`, then `docker run --rm -p 8080:8080 chambaz-tech` and open http://localhost:8080.

## License

The site's code and technical documentation are licensed under the [MIT License](LICENSE). You can use, modify, and redistribute them, including for commercial projects, provided you retain the copyright and license notice.

Personal writing and site copy, personal images, and branding are excluded from the MIT license. All rights to those materials are reserved unless stated otherwise. Replace them with your own when adapting the site.

Third-party code and assets retain their original licenses. Bundled asset notices are in [THIRD-PARTY-NOTICES.txt](static/THIRD-PARTY-NOTICES.txt).

This is my personal site. Feel free to fork and adapt the code. Contributions are not solicited.
