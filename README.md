# rohinivarshney.github.io

Personal portfolio website for **Rohini Varshney** — Talent Acquisition Specialist, HR Professional, and Recruitment Strategist.

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — accessible component library built on Radix UI
- [React Router v6](https://reactrouter.com/) — client-side routing
- [TanStack Query](https://tanstack.com/query) — data fetching & caching
- [Vitest](https://vitest.dev/) — unit testing

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Project Structure

```
src/
├── components/       # Reusable UI components (navbar, theme toggle, etc.)
│   └── ui/           # shadcn/ui primitives
├── pages/            # Route-level pages (Index, Admin, NotFound)
├── lib/
│   ├── content.ts    # Site content data & localStorage persistence
│   └── utils.ts      # Utility helpers
├── hooks/            # Custom React hooks
└── assets/           # Static assets (images)
```

## Admin Panel

The site includes a local-only admin panel at `/admin` for editing site content. Changes are persisted to `localStorage` and require no backend.

> This is not a real authentication system — it is intended for personal local use only.

## Deployment

The site is deployed via [GitHub Pages](https://pages.github.com/) at [rohinivarshney.github.io](https://rohinivarshney.github.io).

## License

[MIT](./LICENSE)
