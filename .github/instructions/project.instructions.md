# My HomePage Project

````instructions
# My HomePage Project

## Using Techs

- Use **Astro** for the frontend framework
- Use **Markdown** for content files (projects, blog posts)
- Use **Tailwind CSS** for styling
- Use **TypeScript** for any necessary scripting

## Project Structure

```
/
├─ public/ - static assets
├─ src/
│  ├─ content/                     - markdown content (projects, blog)
│  │  ├─ projects/                 - markdown files for project pages
│  │  ├─ blog/                     - markdown files for blog posts
│  │  └─ README.md                 - content conventions and frontmatter schema
│  ├─ components/                 - UI components
│  │  ├─ Header.astro              - site header component
│  │  ├─ Footer.astro              - site footer component
│  │  └─ SEO.astro                 - reusable meta / Open Graph component
│  ├─ layouts/
│  │  └─ BaseLayout.astro         - base layout for pages
│  ├─ lib/                        - helper libraries (server-side)
│  │  └─ content.ts               - content loading / slug helpers
│  ├─ types/                      - shared TypeScript types
│  │  └─ content.ts               - frontmatter interfaces (Post, Project)
│  └─ pages/
│     ├─ index.astro              - home page
│     ├─ projects/
│     │  ├─ index.astro           - projects listing page
│     │  └─ [slug].astro          - pages from markdown files in content/projects/
│     ├─ blog/
│     │  ├─ index.astro           - blog listing page
│     │  └─ [slug].astro          - pages from markdown files in content/blog/
│     └─ styles/
│        └─ global.css            - global styles (Tailwind entry)
└─ other settings
```

## Content frontmatter schema

Define and enforce a small, consistent frontmatter schema for all Markdown content. Recommended minimal fields:

- `title` (string) — required
- `date` (ISO 8601 string) — required for posts; optional for projects
- `description` (string) — required (used for meta/preview)
- `tags` (string[]) — optional
- `slug` (string) — optional; if omitted, generated from filename
- `cover` (string) — optional path to cover image
- `draft` (boolean) — optional; skip building when true

Example frontmatter:

```
---
title: "My Project"
date: "2026-02-16"
description: "Short summary used on listings and meta tags."
tags: ["astro", "tailwind"]
slug: "my-project"
cover: "/assets/covers/my-project.jpg"
draft: false
---
```

## Conventions and helpers

- Filenames: prefer `slug.md` or `YYYY-MM-DD-slug.md` for blog posts. Keep project pages as `slug.md`.
- Images: place site-wide assets in `public/` (e.g., `public/assets/`), or adjacent to content in a predictable folder.
- Parsing & helpers: add `src/lib/content.ts` to centralize reading and parsing Markdown/MDX files, slug generation, and sorting. This keeps page components simple and testable.
- Types: add `src/types/content.ts` with interfaces like `PostFrontmatter` and `ProjectFrontmatter` so pages and helpers are strongly typed.
- SEO: create `src/components/SEO.astro` to accept a frontmatter-like props object and render canonical/meta/OG tags consistently.
- MDX: MDX support is optional; if using MDX, keep interactive JSX/shortcodes small and prefer embedding components via named imports.

## Suggested file additions (templates)

- `src/types/content.ts` — export interfaces for `Post` and `Project` frontmatter.
- `src/lib/content.ts` — export `getAllPosts()`, `getPostBySlug(slug)`, `getAllProjects()`, etc.
- `src/components/SEO.astro` — small component consuming frontmatter to render meta tags.
- `src/content/README.md` — describe required frontmatter and filename rules so contributors follow the conventions.

## Styling

- Tailwind CSS is the styling system. Use `src/pages/styles/global.css` as the entrypoint for Tailwind directives and imports.

## Migration notes

- If you rename or move content files, update any imports or helper glob patterns (e.g., `import.meta.glob` paths) that reference `src/content/**`.

## Why these choices

- Centralized `lib` + `types` improves DX and reduces duplicated parsing logic.
- `SEO` component ensures consistent meta and OG tags across pages.
- A `content/README.md` helps external contributors and keeps frontmatter consistent.

---

Keep this file up-to-date as the project grows; small conventions here save time later.

````
