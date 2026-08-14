# Erevos-IV Website

This repository contains the source for the personal website of Erevos‑IV. It provides an easy-to-edit React + Vite site you can run locally, build for production, and deploy to common hosting platforms.

## Features

- Lightweight React app powered by Vite for fast dev builds and HMR
- Simple content structure in `src/` for quick edits
- Ready to add TypeScript, Tailwind, or other tools as needed

## Quick start (development)

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server (HMR enabled)

   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually http://localhost:5173)

## Build & preview (production)

- Build the production bundle:

  ```bash
  npm run build
  ```

- Preview the production build locally:

  ```bash
  npm run preview
  ```

## Project structure

- `index.html` — app entry
- `src/` — application source code (components, pages, assets)
- `public/` — static assets copied to the build
- `package.json` — scripts and dependencies

Edit files in `src/` to update the site's content and components.

## Environment & configuration

If your site needs API keys or environment-specific values, create a `.env` file locally and keep secrets out of the repository. Vite uses `VITE_`-prefixed variables to expose values to client code.

Example:

```env
VITE_API_URL=https://api.example.com
```

Access it in code as `import.meta.env.VITE_API_URL`.

## Deployment

This site can be deployed to many static hosts. Common options:

- Vercel — automatic deployments from the repository; supports preview deployments for PRs
- Netlify — connect the repo and set `npm run build` as the build command
- GitHub Pages — use `gh-pages` or a GitHub Action to publish the `dist`/`build` folder

Ensure your build command is `npm run build` and the publish directory matches Vite's output (usually `dist/`).

## Contributing

Contributions are welcome. Typical workflow:

1. Fork the repository
2. Create a branch for your change
3. Make changes and run the dev server to verify
4. Open a pull request describing your changes

Alternatively, open an issue to propose larger changes or discuss ideas.

## License

Add a LICENSE file to this repository to specify licensing. If you're not sure, the MIT license is a permissive default.

## Contact

GitHub: https://github.com/Erevos-IV

---

If you'd like, I can:
- Add a LICENSE file (MIT, Apache-2.0, etc.)
- Convert the project to TypeScript or add Tailwind CSS
- Create a GitHub Action for automated deploys

Tell me which of these you'd like and I'll make the change.
