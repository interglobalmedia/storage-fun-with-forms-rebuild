# Storage Fun With Forms

A small demo of `localStorage` persistence through a form: pick a background color, a font color, a font style, and a decorative image — write a note — and all of it is remembered the next time you load the page.

This is a modern rebuild of the original [`local-storage-session-storage-fun-form`](https://github.com/interglobalmedia/local-storage-session-storage-fun-form) (archived June 2026). Same concept, refreshed tooling.

## What changed from the original

| | Original | Rebuild |
|---|---|---|
| Tooling | Vanilla HTML/CSS/JS, no bundler | [Vite](https://vitejs.dev/) + vanilla JavaScript (ES modules) |
| Styles | SCSS via `node-sass` (end-of-life) | SCSS via [Dart Sass](https://sass-lang.com/dart-sass/) |
| Color picker | [jscolor](http://jscolor.com/) | [Coloris](https://github.com/melloware/coloris-npm) (actively maintained) |
| Deployment | `gh-pages` npm package | GitHub Actions workflow |

The feature set, form fields, image options, and overall layout are a faithful port of the original — including a few intentionally-preserved label quirks (e.g. some image dropdown labels don't quite match their filenames, same as the original).

A couple of real bugs from the original `main.js` were fixed during the port (a no-op argument on `localStorage.getItem`, and a quota-exceeded check that discarded the actual caught error) — see `src/main.js` for details.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the app and deploys it to GitHub Pages. It currently runs only on manual trigger (`workflow_dispatch`) — uncomment the `push` trigger in the workflow file once you're ready to deploy automatically on every push to `main`.

To deploy manually right now: go to the **Actions** tab on GitHub → select **Deploy to GitHub Pages** → **Run workflow**.

You'll also need to set the Pages source to **GitHub Actions** under **Settings → Pages** in the repo, if it isn't already.

## Known issues

`npm audit` currently reports 2 vulnerabilities (1 moderate, 1 high), both stemming from `esbuild` as a transitive dependency of `vite@5.x`:

> esbuild enables any website to send any requests to the development server and read the response — [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)

This only affects the **local dev server** (`npm run dev`) — it has no bearing on the built/deployed static site, since esbuild is build tooling, not part of the runtime output. `npm audit fix --force` will resolve it but jumps to `vite@8.x`, a breaking major-version change. Holding off until a non-breaking fix lands (Vite 6/7 stabilizing) or doing a deliberate, tested upgrade rather than forcing it blind.

## Project structure

```
.
├── index.html              # Markup, ported from the original
├── public/
│   ├── favicon.ico
│   └── images/              # Decorative clipart images
├── src/
│   ├── main.js              # App logic (JS port of original main.js)
│   └── style.scss           # Styles (ported from main.scss)
└── .github/workflows/
    └── deploy.yml          # GitHub Pages deploy workflow
```

## Credits

Maria D. Campbell
