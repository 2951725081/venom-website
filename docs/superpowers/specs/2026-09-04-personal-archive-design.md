# Personal Archive Website Design

## 1. Positioning

The website is a personal archive for organizing reference material, recording project work, and reviewing decisions. It is intended primarily for the owner rather than recruiters, collaborators, or a general audience.

The site remains deployed on public GitHub Pages for convenience, but it is not actively promoted and should be difficult for search engines to discover. Public Pages is not treated as an access-control boundary.

## 2. Information Architecture

```text
Home
├── Current projects
├── Recently edited items
├── Topic categories
└── Quick links

Projects
├── In progress
├── Completed
├── To organize
└── Project detail pages

Notes
├── Technical notes
├── Course material
├── Reading records
└── Observations

About
└── Purpose, usage notes, and privacy boundaries
```

Primary navigation is `Home`, `Projects`, `Notes`, and `About`. Public social links and recruiter-oriented profile content are not part of the first version.

## 3. Home Page

The first screen presents a personal workspace rather than a promotional hero:

1. `Personal Archive` title
2. A short explanation of the archive's purpose
3. Current projects
4. Recently edited Notes and Projects
5. Topic category links
6. A footer privacy reminder

The page prioritizes the next useful destination over personal branding.

## 4. Content Models

### Project

Each project supports a title, goal, status (`To organize`, `Organizing`, or `Archived`), start and update dates, topics, background, problems, decisions, failed attempts, results, retrospective, and next steps.

### Note

Each note supports a title, category, tags, creation and update dates, summary, body, and related projects.

Projects and Notes should use Astro Content Collections and Markdown/MDX so that content remains structured, versioned, and easy to maintain.

## 5. Visual System

- Use a warm off-white background, near-black text, and dark red as the single accent color.
- Use a serif face for headings and a sans-serif face for body text.
- Use abstract geometric marks and an initials-based symbol as the visual identity.
- Use subtle entrance and hover transitions only.
- Avoid complex scroll animation, social-media widgets, and animated backgrounds.
- Treat desktop and mobile layouts as equally important.

The intended mood is quiet and editorial, like a personal workbench with restrained experimentation.

## 6. Privacy and Discovery

The first release should:

- Add `noindex, nofollow` metadata to pages.
- Add `robots.txt` rules that disallow crawling.
- Remove sitemap generation and sitemap links.
- Explain in the footer that the site is a personal archive.
- Warn contributors not to publish passwords, keys, private identity data, or other sensitive material.
- Avoid public sharing controls and social promotion.

These measures reduce search-engine discovery but do not make the site private. Sensitive material must not be committed to the repository.

## 7. Delivery Phases

### Phase 1: Foundation

- Replace the starter home page and navigation.
- Rename `Blog` to `Notes`.
- Add the Projects page and project collection.
- Remove starter content and social links.
- Make all internal links work under the GitHub Pages base path.

### Phase 2: Archive Experience

- Add project detail templates.
- Add statuses, topics, tags, and recent-update sections.
- Add About usage and privacy guidance.
- Implement `noindex`, `robots.txt`, and sitemap changes.

### Phase 3: Optional Enhancements

- Add site search and tag filtering.
- Add Project/Note relationship navigation.
- Add targeted bilingual support for About and Projects.
- Consider private hosting if the privacy requirement increases.

## 8. Quality Requirements

- Preserve static generation and GitHub Pages compatibility.
- Validate application and configuration changes with `npm run build`.
- Keep semantic HTML, keyboard operation, and meaningful image alternative text.
- Keep every internal route compatible with the configured `/venom-website` base path.
