# Personal Archive Website Implementation Plan

> **For the primary implementation agent:** Execute this plan sequentially. After each code change, inspect the diff, run the relevant validation, commit, and push before continuing.

**Goal:** Transform the Astro starter blog into a personal archive for project retrospectives, notes, and reference material while preserving GitHub Pages compatibility and reducing search-engine discovery.

**Architecture:** Keep Astro static generation. Implement the site in seven sequential phases: content model, Projects, Notes, site shell/Home, privacy controls, visual/accessibility polish, and final release audit. Projects and Notes remain separate content domains; shared navigation and metadata remain centralized.

**Tech Stack:** Astro 7, TypeScript, Markdown/MDX, Astro Content Collections, GitHub Pages, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-04-personal-archive-design.md`

## Global Constraints

- This is a personal archive for the owner, not a recruiter-facing portfolio.
- GitHub Pages is public and is not an access-control boundary; never commit passwords, keys, private identity data, or other sensitive material.
- Every internal URL must work under `/venom-website`.
- Use a warm off-white background, near-black text, dark red accent, serif headings, and sans-serif body text.
- Use subtle entrance and hover transitions only; support `prefers-reduced-motion`.
- Preserve static generation and GitHub Pages deployment.
- Keep semantic HTML, keyboard operation, meaningful image alternative text, and responsive desktop/mobile layouts.
- After every file modification: inspect `git diff`, run the relevant validation command, commit with a concise message, and push with `git push`.
- Do not amend, force-push, reset, revert, or discard existing commits unless explicitly requested.

## Execution and Review Protocol

The primary agent performs all implementation and review work. No external agents, parallel branches, or unreviewed merges are used.

For each phase:

1. Read the phase scope and inspect the current implementation.
2. Make only the listed changes.
3. Run the phase validation commands and inspect their complete output.
4. Review the diff for scope, base-path correctness, accessibility, and privacy regressions.
5. Commit and push the phase before starting the next phase.
6. If validation fails, stop progression, diagnose the root cause, fix only that phase, and repeat validation.

The primary agent must not claim a phase accepted without fresh verification evidence.

---

### Phase 1: Establish the content model

**Files:** `src/content.config.ts`, existing content files as needed.

**Steps:**

- [ ] Inspect the existing blog collection schema and preserve its working Markdown/MDX behavior.
- [ ] Add a typed `projects` collection with `title`, `description`, `status`, `startDate`, `updatedDate`, `topics`, `summary`, and optional `nextStep`.
- [ ] Restrict project status to `to-organize`, `organizing`, and `archived`.
- [ ] Define Note metadata for category, tags, summary, creation date, updated date, and optional related project slugs.
- [ ] Add one representative project and normalize existing Notes frontmatter.
- [ ] Run `npm run build` and confirm content synchronization succeeds.
- [ ] Run `git diff --check`, review the schema diff, commit as `feat: define personal archive content model`, and push.

**Acceptance:** Both collections type-check, existing MDX builds, project statuses are constrained, and representative content has complete metadata.

**Review:** Confirm schema names match every later page query and that no sensitive or starter promotional content was introduced.

---

### Phase 2: Implement Projects

**Files:** `src/content/projects/**`, `src/pages/projects/**`, `src/components/projects/**`.

**Steps:**

- [ ] Create a static `/projects/` index grouped by `organizing`, `to-organize`, and `archived`, including useful empty states.
- [ ] Create static project detail routes under `/projects/<slug>/`.
- [ ] Render goal, status, dates, topics, background, problems, decisions, failed attempts, result, retrospective, and next step.
- [ ] Add reusable ProjectCard and status presentation components with semantic markup.
- [ ] Use `import.meta.env.BASE_URL` or a shared base-safe helper for every internal link.
- [ ] Run `npm run build` and verify generated Projects routes and sample detail output.
- [ ] Run `git diff --check`, review route/link output, commit as `feat: add projects archive pages`, and push.

**Acceptance:** Projects index and detail pages are static, all three statuses are represented, and URLs resolve beneath `/venom-website/projects/`.

**Review:** Check frontmatter-to-template consistency, empty states, heading order, and no accidental dependency on client-side JavaScript.

---

### Phase 3: Convert Blog into Notes

**Files:** `src/content/blog/**`, `src/pages/blog/**`, `src/components/notes/**`.

**Steps:**

- [ ] Replace starter Astro promotional copy with technical, course, reading, or observation material.
- [ ] Add category, tags, summary, creation date, updated date, and related-project metadata where useful.
- [ ] Change visible navigation and headings from Blog to Notes while preserving or deliberately redirecting existing routes.
- [ ] Add category, tag, and update metadata to Notes index and detail pages.
- [ ] Preserve Markdown and MDX rendering.
- [ ] Run `npm run build` and verify all retained Notes routes.
- [ ] Run `git diff --check`, review content and route output, commit as `feat: reshape blog content as notes`, and push.

**Acceptance:** Notes contain no starter promotional copy, every entry has usable metadata, MDX builds, and Notes routes remain base-safe.

**Review:** Confirm no Projects schema or shared shell files were changed unintentionally.

---

### Phase 4: Build the archive shell and Home

**Files:** `src/pages/index.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/HeaderLink.astro`, `src/consts.ts`, `src/pages/about.astro`.

**Steps:**

- [ ] Replace the starter Home page with `Personal Archive`, a purpose statement, current projects, recent items, categories, and quick links.
- [ ] Add useful empty states for missing projects or Notes.
- [ ] Set navigation to exactly `Home`, `Projects`, `Notes`, and `About`.
- [ ] Remove Astro Mastodon, Twitter, and repository links.
- [ ] Ensure title and Home links point to `/venom-website/` using `BASE_URL`.
- [ ] Update archive-oriented site title, description, About content, and footer privacy reminder.
- [ ] Ensure active navigation works for all base-prefixed routes.
- [ ] Run `npm run build`, inspect generated Home links, and verify route inventory.
- [ ] Run `git diff --check`, commit as `feat: create personal archive shell`, and push.

**Acceptance:** Home is a personal workspace, navigation has four correct entries, social-promotional links are gone, and Home works from every route.

**Review:** Manually check the rendered hierarchy and verify empty states do not look like errors.

---

### Phase 5: Reduce search-engine discovery

**Files:** `src/components/BaseHead.astro`, `astro.config.mjs`, `src/pages/rss.xml.js`, `public/robots.txt`, and any directly related metadata file.

**Steps:**

- [ ] Add `robots` metadata with `noindex, nofollow` to every HTML page through BaseHead.
- [ ] Add `public/robots.txt` with `User-agent: *` and `Disallow: /`.
- [ ] Remove sitemap integration and sitemap links from configuration and generated pages.
- [ ] Remove or disable RSS consistently and remove orphan references.
- [ ] Keep wording clear that these measures reduce discovery but do not provide access control.
- [ ] Run `npm run build`, verify no sitemap output exists, inspect generated HTML for `noindex, nofollow`, and inspect robots.txt.
- [ ] Run `git diff --check`, commit as `feat: reduce archive search discovery`, and push.

**Acceptance:** All HTML is no-indexed, crawlers are disallowed, sitemap output and links are absent, and the public/private distinction is accurately documented.

**Review:** Search all source and generated files for stale sitemap/RSS references and accidental claims of privacy.

---

### Phase 6: Apply visual and accessibility polish

**Files:** `src/styles/global.css`, `src/components/projects/**`, `src/components/notes/**`, and only directly related markup files if required.

**Steps:**

- [ ] Define warm off-white, near-black, and dark-red design tokens.
- [ ] Apply serif headings and sans-serif body typography using available local fonts or safe fallbacks.
- [ ] Style archive cards, status labels, tags, dates, empty states, and retrospective sections.
- [ ] Add restrained fade/hover transitions and a reduced-motion override.
- [ ] Check keyboard focus visibility, semantic headings, link names, image alt text, color contrast, and narrow/wide layouts.
- [ ] Run `npm run build` and smoke-test Home, Projects, Notes, About, and one detail route.
- [ ] Run `git diff --check`, commit as `style: apply archive visual system`, and push.

**Acceptance:** The site matches the approved quiet editorial workbench style, remains readable and keyboard-accessible, and works responsively.

**Review:** Compare the final UI against the design spec; reject decorative additions that harm clarity or performance.

---

### Phase 7: Final integration audit and deployment verification

**Files:** Read-only audit first; only modify a source file when a concrete finding requires correction.

**Steps:**

- [ ] Run `npm run build` from the integrated `main` checkout and confirm exit code 0.
- [ ] Run `git diff --check` and confirm the working tree has no unintended changes.
- [ ] Enumerate generated routes and confirm Home, Projects, Notes, About, and detail pages exist.
- [ ] Check every internal generated link for `/venom-website` compatibility.
- [ ] Check `noindex, nofollow`, `robots.txt`, absence of sitemap output, and absence of stale RSS links.
- [ ] Search for starter promotional copy and sensitive-looking material.
- [ ] Verify navigation behavior in a browser, especially Home from Notes and Projects.
- [ ] Inspect the GitHub Actions workflow and wait for a successful Pages deployment.
- [ ] Open the deployed Pages URL and verify the title, navigation, Home behavior, Projects, Notes, and About routes.
- [ ] If any check fails, return to the responsible phase, fix and re-verify before finalizing.

**Acceptance:** Every design requirement is evidenced by source/output checks, the production build passes, GitHub Actions succeeds, and the deployed site behaves as specified.

## Completion Definition

The plan is complete only when all seven phases pass review, the final commit is pushed to `main`, GitHub Pages serves the expected archive, and no unresolved validation or privacy findings remain.
