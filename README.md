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
| Testing | None | [Vitest](https://vitest.dev/) + [Istanbul](https://istanbul.js.org/) coverage |

The feature set, form fields, image options, and overall layout are a faithful port of the original — including a few intentionally-preserved label quirks (e.g. some image dropdown labels don't quite match their filenames, same as the original).

A couple of real bugs from the original `main.js` were fixed during the port (a no-op argument on `localStorage.getItem`, and a quota-exceeded check that discarded the actual caught error) — see `src/index.js` for details. Tests were added to cover these bugs found in the original codebase during the rebuild process.

Two small additions beyond a straight port:
- A third spider web image (present in the original's asset folder but never wired into the dropdown) is now a selectable option.
- The decorative image used absolute positioning with hardcoded offsets that could push it below the form's border at smaller viewport widths — a bug present in the original. It now uses normal document flow below the `680px` breakpoint, so it can't overflow regardless of viewport size.

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

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the app and deploys it to GitHub Pages automatically on every push to `main`. It can also be triggered manually from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

**One-time setup, before the workflow can succeed:** go to **Settings → Pages** in the repo and set **Source** to **GitHub Actions**. This has to be done first — if the workflow runs before the Pages source is set, it'll fail since the `github-pages` deployment environment doesn't exist yet.

## Testing

This project uses [Vitest](https://vitest.dev/) for testing and [Istanbul](https://istanbul.js.org/) for code coverage. Tests cover the three bugs identified in the original codebase during the rebuild process.

### Run all tests (watch mode)

```bash
npm test
```

Vitest runs in watch mode by default — it re-runs affected tests automatically on file changes until you exit with `Ctrl+C`.

### Run a specific test file

```bash
npm test -- test/withHash.test.js
```

### Run tests matching a name pattern

```bash
npm test -- -t "withHash"
```

### Run coverage

```bash
npm run coverage
```

Coverage output is written to the `coverage/` directory using the Istanbul provider and is tracked in the repo for reference alongside the blog series.

### Reporter options

Pass `--reporter` to control terminal output format:

| Reporter | Description |
|---|---|
| `--reporter=verbose` | Shows every individual test name and pass/fail status — useful for seeing exactly which tests ran |
| `--reporter=dot` | Minimal output — one dot per passing test, `x` for failures. Good for large suites |
| `--reporter=json` | Outputs results as JSON — useful for piping into other tools |
| `--reporter=junit` | XML format — common in CI pipelines that ingest JUnit reports (Jenkins, etc.) |

Example:

```bash
npm test -- --reporter=verbose
```

## Project structure

```
.
├── index.html                  # Markup, ported from the original
├── public/
│   ├── favicon.ico
│   └── images/                 # Decorative clipart images (26 total)
├── src/
│   ├── constants.js            # Shared constants (storage keys, etc.)
│   ├── index.js                # App entry point and event wiring
│   ├── style.scss              # Styles (ported from original main.scss)
│   └── modules/
│       ├── clearStorage.js
│       ├── emptyStorage.js
│       ├── localStorageSupport.js
│       ├── populateStorage.js
│       ├── renderFooter.js
│       ├── restoreNote.js
│       ├── setStyles.js
│       └── withHash.js
├── test/
│   ├── __snapshots__/
│   │   └── renderFooter.test.js.snap
│   ├── localStorageSupport.test.js
│   ├── renderFooter.test.js
│   └── withHash.test.js
└── .github/workflows/
    └── deploy.yml              # GitHub Pages deploy workflow
```

## Credits

Maria D. Campbell
