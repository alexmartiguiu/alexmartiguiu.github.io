# Alex Martí Guiu - Portfolio

Modern portfolio website built with **React + TypeScript + Vite + Tailwind CSS**

## Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router** - SPA navigation
- **Tailwind CSS** - Utility-first styling (via PostCSS)
- **GitHub Pages** - Static hosting

## Setup

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm 10+

### Installation

```bash
npm install
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

- **Home** - About me page
- **Research** - Research & Projects
- **Timeline** - Data-driven visual timeline loaded from CSV
- **Hobbies** - Hobbies with photo collage

## Building for Deployment

Build optimized production bundle (outputs to `docs/` for GitHub Pages):

```bash
npm run build
```

## Deployment

Deployment is automated via GitHub Actions on push to `main`:

1. `npm ci`
2. `npm run build` (outputs to `docs/`)
3. Upload built `docs/` artifact
4. Deploy artifact with `actions/deploy-pages`

**Live site:** https://alexmartiguiu.github.io

## Project Structure

```
├── index.html              # SPA entry point
├── src/
│   ├── main.tsx           # React entry (loads globals.css)
│   ├── App.tsx            # Router configuration
│   ├── globals.css        # All custom styles (portfolios classes, logos)
│   └── pages/
│       ├── Home.tsx       # About page
│       ├── Research.tsx   # Research & Projects page
│       ├── Timeline.tsx   # Timeline page (CSV-driven)
│       └── Hobbies.tsx    # Hobbies page with photo collage
├── vite.config.js         # Vite configuration (React + output to docs/)
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind config
├── postcss.config.js      # PostCSS config (autoprefixer)
├── public/
│   ├── assets/
│   │   └── data/
│   │       └── timeline.csv  # Editable timeline rows
│   └── 404.html              # SPA fallback for GitHub Pages deep links
├── docs/                  # Production build (tracked for GitHub Pages)
└── assets/                # Images and other static files
```

## Timeline Data Editing

The timeline page reads data from `public/assets/data/timeline.csv`.

Required columns:

- `id` unique row id
- `type` category (for example `work`, `education`, `research`, `project`)
- `title` main label shown on the bar
- `start` start month in `YYYY-MM`
- `end` end month in `YYYY-MM` (or keep with `ongoing=true`)
- `ongoing` `true` or `false`
- `color` any CSS color (`#16a34a`, `rgb(...)`, etc.)

Optional columns:

- `subtitle`
- `link`
- `sort_order`

After editing the CSV, run `npm run dev` (or rebuild/deploy) to see updates.

## Features

✅ SPA with client-side routing (no page reloads)  
✅ All original styling preserved  
✅ Photo collage with smart placement algorithm  
✅ TypeScript for type safety  
✅ Fast development with hot reload  
✅ Optimized production builds  
✅ GitHub Pages ready  

## Future Enhancements

- Integrate animations with framer-motion
- Add interactive data visualizations
- Blog section with markdown support
- Dark mode toggle

