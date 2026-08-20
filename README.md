# Storage Fun With Forms

A small demo of `localStorage` persistence through a form: pick a background color, a font color, a font style, and a decorative image — write a note — and all of it is remembered the next time you load the page.

This is a modern rebuild of the original [`local-storage-session-storage-fun-form`](https://github.com/interglobalmedia/local-storage-session-storage-fun-form) (archived June 2026). Same concept, refreshed tooling.

## What changed from the original

| | Original | Rebuild |
|---|---|---|
| Tooling | Vanilla HTML/CSS/JS, no bundler | [Vite](https://vitejs.dev/) + vanilla JavaScript (ES modules) |
| Styles | SCSS via `node-sass` (end-of-life) | SCSS via [Dart Sass](https://sass-lang.com/dart-sass/) |
| Color picker | [jscolor](http://jscolor.com/) (unmaintained local script) | [Coloris](https://github.com/melloware/coloris-npm) — actively maintained, vanilla JS, similar UX |
| Code structure | Single monolithic `main.js` | Modularized `src/modules/` — one file per function, shared constants in `src/constants.js` |
| Module system | None (global scripts) | ES Modules (`"type": "module"`) — required for Vite and `import` syntax throughout |
| Deployment | `gh-pages` npm package (manual) | GitHub Actions workflow — automatic on push to `main` |
| Testing | None | [Vitest](https://vitest.dev/) + [Istanbul](https://istanbul.js.org/) coverage |

The feature set, form fields, image options, and overall layout are a faithful port of the original — including a few intentionally-preserved label quirks (e.g. some image dropdown labels don't quite match their filenames, same as the original).

A couple of real bugs from the original `main.js` were fixed during the port. See Key Fixes During Migration below for details.

Two small additions beyond a straight port:
- A third spider web image (present in the original's asset folder but never wired into the dropdown) is now a selectable option.
- The decorative image used absolute positioning with hardcoded offsets that could push it below the form's border at smaller viewport widths — a bug present in the original. It now uses normal document flow below the `680px` breakpoint, so it can't overflow regardless of viewport size.

## Workflow & Tooling Changes

**Build & Deployment:**
- Replaced unbundled vanilla HTML/CSS/JS with [Vite](https://vitejs.dev/) (build tool + dev server)
- Replaced `gh-pages` npm package manual deploy with GitHub Actions workflow (build + deploy on push to `main`, GitHub's native Pages deployment) — `dist/` is generated fresh on GitHub's servers every run and uploaded as a Pages artifact; it is never committed to the repo

**Styling:**
- Replaced `node-sass` (end-of-life) with [Dart Sass](https://sass-lang.com/dart-sass/) — zero SCSS syntax changes required; Dart Sass is a drop-in replacement

**Color Picker:**
- Replaced `jscolor` (unmaintained local script file) with [Coloris](https://github.com/melloware/coloris-npm) (`@melloware/coloris`) — actively maintained npm package, framework-agnostic, similar popup-swatch UX to jscolor. Color inputs updated from bare hex values (`FF0000`) to `#`-prefixed hex (`#FF0000`) since Coloris expects standard CSS hex strings; a `withHash()` utility normalizes values read back from storage

**Code Structure:**
- Replaced monolithic `main.js` with modularized `src/modules/` — one file per function (`clearStorage`, `emptyStorage`, `localStorageSupport`, `populateStorage`, `renderFooter`, `restoreNote`, `setStyles`, `withHash`)
- Shared storage key constants extracted to `src/constants.js`
- Path aliases configured in `vite.config.js`: `@` → `src/`, `@modules` → `src/modules/`
- Footer copyright rendered via `renderFooter()` module rather than an inline `<script>` in HTML — cleaner CSP posture, consistent with ES module approach

**Quality Assurance:**
Tests cover `localStorageSupport`, `renderFooter`, and `withHash`: 5 tests, all passing, at 87.5% statement / 75% branch / 100% function / 100% line coverage on those three modules. The three bugs below and the remaining five modules don't have dedicated tests yet.

## Key Fixes During Migration

Three bugs identified in the original `main.js` and fixed in the rebuild:

**1. No-op argument on `localStorage.getItem`:**
The original passed a second argument to `getItem()`, which only accepts one — the second was silently ignored, making the "Get Note" button effectively a no-op. Fixed by reading the return value correctly and assigning it to the textarea.

**2. Quota-exceeded check discarded the real error:**
The original's `catch` block immediately overwrote the caught error with `new DOMException()` — a fresh, blank exception — then checked its `name` property, which of course never matched `QUOTA_EXCEEDED_ERR`. The quota message could never display. Fixed by inspecting the actual caught error directly.

**3. `setStyles()` blindly set `.value` to `null`:**
When `localStorage.getItem()` returns `null` (nothing saved yet), the original set the input's `.value` directly to `null`, which some browsers silently convert to the string `"null"`. Fixed by guarding each assignment — only applied when a real saved value exists.

## Notable Enhancements

**Responsive image overflow fix:**
The original positioned the decorative clipart image using `position: absolute` with hardcoded `top` offsets across five breakpoints. These offsets were brittle — the image could overflow below the form's border at smaller viewport widths depending on font size, browser zoom, or font-loading timing. Fixed by switching to normal document flow below the `680px` breakpoint, where the wrapper simply grows to contain the image. Above `680px`, the original's intentional "floating beside the form" treatment is preserved.

**Third spider web image:**
A third spider web image (`pinpng.com-spider-web-png-transparent-62011.png`) was present in the original's `images/` folder but never referenced in the dropdown. Now wired in as "Spider Web 3."

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

This project uses [Vitest](https://vitest.dev/) for testing and [Istanbul](https://istanbul.js.org/) for code coverage. Tests currently cover `localStorageSupport`, `renderFooter`, and `withHash` (5 tests, all passing) at 87.5% statement / 75% branch / 100% function / 100% line coverage on those three modules; the remaining modules, including the three bugs fixed during the port, will be covered as testing work continues on a separate branch.

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

**Example:**

```bash
npm test -- --reporter=verbose
```

## Project structure

This is the same folder and file layout you'd see browsing the repository on GitHub or opening it in a code editor: folders listed before files, alphabetically within each group. `public/images/` and `coverage/` are shown collapsed below, without their contents listed, since one holds 26 decorative image files and the other is Istanbul's generated report output:

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── coverage/
├── public/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── modules/
│   │   ├── clearStorage.js
│   │   ├── emptyStorage.js
│   │   ├── localStorageSupport.js
│   │   ├── populateStorage.js
│   │   ├── renderFooter.js
│   │   ├── restoreNote.js
│   │   ├── setStyles.js
│   │   └── withHash.js
│   ├── constants.js
│   ├── index.js
│   └── style.scss
├── test/
│   ├── __snapshots__/
│   │   └── renderFooter.test.js.snap
│   ├── localStorageSupport.test.js
│   ├── renderFooter.test.js
│   └── withHash.test.js
├── .gitignore
├── .nvmrc
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

If you ran `tree -a -I 'node_modules|.git|.DS_Store|.vscode|.publish|dist|output.txt|git-commit-messages.md'` from the command line, filtering out the same noise this diagram excludes but without `--dirsfirst`, files and folders would be listed together, alphabetically, rather than folders-first:

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── .nvmrc
├── coverage/
├── index.html
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
│   └── images/
├── README.md
├── src/
│   ├── constants.js
│   ├── index.js
│   ├── modules/
│   │   ├── clearStorage.js
│   │   ├── emptyStorage.js
│   │   ├── localStorageSupport.js
│   │   ├── populateStorage.js
│   │   ├── renderFooter.js
│   │   ├── restoreNote.js
│   │   ├── setStyles.js
│   │   └── withHash.js
│   └── style.scss
├── test/
│   ├── __snapshots__/
│   │   └── renderFooter.test.js.snap
│   ├── localStorageSupport.test.js
│   ├── renderFooter.test.js
│   └── withHash.test.js
└── vite.config.js
```

## Credits

Maria D. Campbell
