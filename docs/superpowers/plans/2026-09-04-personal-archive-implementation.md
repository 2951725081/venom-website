# Personal Archive Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` to implement this plan task-by-task. Each task must be completed, reviewed, and verified before the next dependent task begins.

**Goal:** Transform the Astro starter blog into a personal archive for project retrospectives, notes, and reference material, while preserving GitHub Pages compatibility and reducing search-engine discovery.

**Architecture:** Keep Astro static generation and split the site into independent content domains. Projects and Notes are separate Content Collections with separate route trees; the site shell owns navigation and shared visual primitives; privacy controls live in metadata, robots, and sitemap configuration. Agents must work in isolated branches/worktrees and only touch their assigned files.

**Tech Stack:** Astro 7, TypeScript, Markdown/MDX, Astro Content Collections, `@astrojs/mdx`, `@astrojs/sitemap` (removed when privacy task is accepted), GitHub Pages, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-04-personal-archive-design.md`

## Global Constraints

- The primary user is the site owner; this is a personal archive, not a recruiter-facing portfolio.
- The site remains a public GitHub Pages site and must not contain passwords, keys, private identity data, or other sensitive material.
- Use the configured `/venom-website` base path for every internal URL.
- Use a warm off-white background, near-black text, dark red accent, serif headings, and sans-serif body text.
- Use only subtle entrance and hover transitions; do not add complex scroll animation or animated backgrounds.
- Preserve static output and GitHub Pages deployment.
- Keep semantic HTML, keyboard operation, and meaningful image alternative text.
- After every file modification: inspect the diff, run the relevant validation, commit with a concise message, and push the current branch with `git push`.
- Never amend, force-push, reset, or discard existing commits unless explicitly requested.

## Agent Operating Model

### Roles

- **Chief planner (this task):** Owns the design contract, dispatches Claude agents, reviews every result, resolves conflicts, runs integration verification, and decides when the overall goal is complete.
- **Claude implementation agents:** Each agent owns one bounded task, works only within the listed files, runs its task-level checks, commits, and reports the commit hash, changed files, evidence, and remaining risks.
- **Claude QA agent:** Performs read-only integration review after implementation tasks. It may propose fixes, but does not silently modify another agent's files.

### Isolation and dispatch

1. Create one isolated worktree/branch per implementation task using a `codex/` branch prefix.
2. Dispatch only tasks whose dependencies are complete; independent Tasks 1, 2, and 4 may run in parallel.
3. Every prompt must include the exact spec path, file ownership, forbidden files, acceptance criteria, and required commands.
4. Agents must not change shared files outside their ownership boundary. If a boundary must change, they stop and report the dependency to the chief planner.
5. The chief planner reviews the diff and commit, runs independent verification, and only then marks the task accepted.

### Required agent report

Each Claude agent must return:

- Task identifier and final status (`accepted`, `needs-changes`, or `blocked`)
- Root cause or implementation summary
- Commit hash and exact changed files
- Commands run and their exit status
- Acceptance criteria met or unmet
- Known risks, follow-up work, and any files it intentionally did not touch

### Review gate

The chief planner rejects a task if any of the following is true:

- The diff changes files outside the task boundary without prior approval.
- The agent reports success without fresh command output.
- `npm run build` fails for a task that changes application/configuration code.
- Any route omits the `/venom-website` base path.
- Content schema, frontmatter, or generated routes are inconsistent.
- Privacy requirements are weakened or represented as access control.

Rejected work returns to the same Claude agent with a precise correction request. The agent is not terminated until the corrected result passes review.

## File Ownership Map

| Task | Primary owner | Files it may create or modify | Explicitly forbidden files |
| --- | --- | --- | --- |
| 1. Project content domain | Claude A | `src/content.config.ts`, `src/content/projects/**`, `src/pages/projects/**`, project-only components under `src/components/projects/**` | `src/components/Header.astro`, `src/pages/index.astro`, `src/pages/blog/**`, `src/styles/global.css` |
| 2. Notes domain | Claude B | `src/content/blog/**`, `src/pages/blog/**`, Notes-only components under `src/components/notes/**` | `src/content.config.ts`, `src/pages/index.astro`, `src/components/Header.astro`, `src/styles/global.css` |
| 3. Site shell and Home | Claude C | `src/pages/index.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/HeaderLink.astro`, `src/consts.ts` | `src/content/**`, `src/pages/blog/**`, `src/pages/projects/**`, `astro.config.mjs` |
| 4. Privacy and discovery | Claude D | `src/components/BaseHead.astro`, `astro.config.mjs`, `public/robots.txt`, `src/pages/rss.xml.js` | `src/pages/index.astro`, `src/components/Header.astro`, content collections |
| 5. Visual and accessibility pass | Claude E | `src/styles/global.css`, `src/components/projects/**`, `src/components/notes/**` | `src/pages/index.astro`, `src/components/Header.astro`, `astro.config.mjs`, content schemas |
| 6. Integration QA | Claude F | Read-only review; no files by default | All files unless the chief planner explicitly assigns a correction |

If Tasks 1 or 2 need a shared schema change, the agent reports it and the chief planner schedules a small follow-up change rather than allowing overlapping edits.

---

### Task 1: Implement the Projects content domain

**Owner:** Claude A

**Dependencies:** None. This task can run in parallel with Tasks 2, 3, and 4.

**Files:**

- Modify: `src/content.config.ts`
- Create: `src/content/projects/first-project.md`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[...slug].astro`
- Create: `src/components/projects/ProjectCard.astro`
- Create: `src/components/projects/ProjectStatus.astro`

**Interfaces:**

- Produce a `projects` collection with typed fields: `title`, `description`, `status`, `startDate`, `updatedDate`, `topics`, `summary`, and optional `nextStep`.
- Accept status values exactly `to-organize`, `organizing`, and `archived`.
- Project index consumes collection entries and groups them by status.
- Project detail consumes a collection entry by slug and renders the retrospective sections.

**Steps:**

- [ ] Extend the content schema with a typed `projects` collection without breaking the existing Notes/blog collection.
- [ ] Add one realistic, clearly marked sample project that demonstrates background, problem, decisions, failed attempts, result, retrospective, and next step.
- [ ] Build `/projects/` as a static index with status groups and empty-group handling.
- [ ] Build static project detail routes with semantic headings, date formatting, topic labels, and a return link to Projects.
- [ ] Make every internal link use `import.meta.env.BASE_URL` or a base-safe URL helper.
- [ ] Run `npm run build` and verify `/projects/` plus the sample detail route appear in generated output.
- [ ] Commit and push with a message such as `feat: add projects archive domain`.

**Acceptance:** The project collection type-checks, one project is rendered, all three status groups are supported, and the build produces static project routes under `/venom-website/projects/`.

**Expected effect:** The site gains a structured, reusable project archive independent of the existing Notes pages.

---

### Task 2: Convert the blog domain into Notes

**Owner:** Claude B

**Dependencies:** None. This task can run in parallel with Tasks 1, 3, and 4.

**Files:**

- Modify: `src/content/blog/first-post.md`, `src/content/blog/second-post.md`, `src/content/blog/third-post.md`, `src/content/blog/markdown-style-guide.md`, `src/content/blog/using-mdx.mdx`
- Modify: `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`
- Create: `src/components/notes/NoteCard.astro`

**Interfaces:**

- Preserve the existing blog collection identifier until the chief planner approves a migration, so the task does not conflict with content schema work.
- Present the existing collection as Notes with categories `technical`, `course`, `reading`, and `observation`.
- Notes index consumes category and tag data; detail pages consume title, summary, dates, and related project slugs when present.

**Steps:**

- [ ] Replace starter Astro copy with archive-oriented technical, course, reading, or observation content.
- [ ] Add or normalize category, tags, summary, and updated-date frontmatter on every retained entry.
- [ ] Change visible labels from Blog to Notes without changing the route until the chief planner decides whether a redirect is needed.
- [ ] Add category labels, tags, and recent-update metadata to the index and detail layout.
- [ ] Remove starter social-promotional wording from Notes content while keeping Markdown and MDX rendering.
- [ ] Run `npm run build` and verify all retained Notes routes render.
- [ ] Commit and push with a message such as `feat: reshape blog content as notes`.

**Acceptance:** Notes pages contain no starter promotional copy, every entry has a category and tags, MDX still builds, and the existing content routes remain static and base-safe.

**Expected effect:** Existing writing infrastructure becomes a maintainable personal Notes archive without touching Projects or the shared shell.

---

### Task 3: Build the site shell and archive Home

**Owner:** Claude C

**Dependencies:** Can start independently, but final copy should be checked after Tasks 1 and 2 are accepted.

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/HeaderLink.astro`
- Modify: `src/consts.ts`

**Interfaces:**

- Navigation exposes exactly `Home`, `Projects`, `Notes`, and `About`.
- Home consumes static collection data only through Astro build-time APIs; it must not require a client-side runtime.
- The shell exposes base-safe `homeHref`, `projectsHref`, `notesHref`, and `aboutHref` values.

**Steps:**

- [ ] Replace the starter Home copy with `Personal Archive`, a concise purpose statement, and sections for current projects, recent items, categories, and quick links.
- [ ] Render empty states that remain useful when no project or Note is available.
- [ ] Remove Astro Mastodon, Twitter, and Astro repository links from the primary shell.
- [ ] Keep the existing Home-link fix and verify both site title and Home navigate to `/venom-website/`.
- [ ] Update site title and description constants to archive-oriented copy.
- [ ] Ensure active navigation state works for all four base-prefixed routes.
- [ ] Run `npm run build` and inspect generated Home links with `rg 'href=' dist/index.html`.
- [ ] Commit and push with a message such as `feat: create personal archive home shell`.

**Acceptance:** Home reads as a personal workspace, navigation has four correct entries, no social-promotional links remain, and clicking Home from any route returns to the project root.

**Expected effect:** The site changes from a public starter landing page into a functional personal archive entry point.

---

### Task 4: Implement privacy and discovery controls

**Owner:** Claude D

**Dependencies:** None. This task can run in parallel with Tasks 1–3.

**Files:**

- Modify: `src/components/BaseHead.astro`
- Modify: `astro.config.mjs`
- Modify: `src/pages/rss.xml.js`
- Create: `public/robots.txt`

**Interfaces:**

- Every HTML page emits `robots` metadata with `noindex, nofollow`.
- `public/robots.txt` disallows all crawlers.
- Sitemap integration and sitemap links are removed, because the site is intentionally not discoverable.
- RSS is removed or disabled consistently; no orphaned navigation or metadata references may remain.

**Steps:**

- [ ] Add the robots meta tag to `BaseHead.astro` while preserving canonical and Open Graph behavior that remains useful locally.
- [ ] Add `public/robots.txt` containing `User-agent: *` and `Disallow: /`.
- [ ] Remove `@astrojs/sitemap` configuration and its generated metadata/link references.
- [ ] Remove or disable the RSS route and verify no page links to it.
- [ ] Add the personal-archive and “do not publish sensitive information” reminder to the shared footer only if shell ownership has been accepted; otherwise report the required handoff.
- [ ] Run `npm run build`, confirm no sitemap output is generated, and inspect one generated HTML file for `noindex, nofollow`.
- [ ] Commit and push with a message such as `feat: reduce archive search discovery`.

**Acceptance:** All generated HTML includes the no-index directive, `robots.txt` blocks crawlers, sitemap output and links are absent, and the implementation clearly does not claim to provide access control.

**Expected effect:** Search-engine discovery is reduced while the public Pages deployment remains functional.

---

### Task 5: Apply the visual and accessibility system

**Owner:** Claude E

**Dependencies:** Tasks 1–3 accepted, because this task styles their final markup.

**Files:**

- Modify: `src/styles/global.css`
- Modify: `src/components/projects/**`
- Modify: `src/components/notes/**`

**Interfaces:**

- Consume the existing semantic markup and class names from Tasks 1–3.
- Do not alter route behavior, collection schemas, or shell navigation.

**Steps:**

- [ ] Define warm off-white, near-black, and dark-red design tokens.
- [ ] Add serif heading and sans-serif body typography using available local fonts or a safe fallback.
- [ ] Style archive cards, status labels, tags, dates, empty states, and project retrospective sections.
- [ ] Add restrained fade/hover transitions with a `prefers-reduced-motion` fallback.
- [ ] Verify keyboard focus visibility, heading order, link names, color contrast, and responsive layout at narrow and wide viewports.
- [ ] Run `npm run build` and perform a static route smoke test for Home, Projects, Notes, About, and one detail page.
- [ ] Commit and push with a message such as `style: apply archive visual system`.

**Acceptance:** The visual system matches the approved warm off-white/editorial direction, layouts work on desktop and mobile, reduced motion is respected, and no accessibility regression is introduced.

**Expected effect:** The archive has a quiet editorial workbench style without sacrificing readability or keyboard use.

---

### Task 6: Integration QA and release audit

**Owner:** Claude F (read-only QA agent)

**Dependencies:** Tasks 1–5 accepted and their commits integrated into the chief planner's branch.

**Files:** Read-only by default. If a correction is necessary, report the exact file and evidence; do not edit another agent's worktree.

**Steps:**

- [ ] Read the design spec and this plan, then compare every requirement against the integrated tree.
- [ ] Run `npm run build` from a clean checkout.
- [ ] Enumerate generated routes and confirm Home, Projects, Notes, About, and project/note detail routes exist.
- [ ] Check generated HTML for `/venom-website`-safe internal links, `noindex, nofollow`, and absence of sitemap references.
- [ ] Check `public/robots.txt` content and confirm no sensitive data or starter promotional copy is present.
- [ ] Review mobile semantics, keyboard focus, alt text, status labels, and empty states.
- [ ] Review `git diff` and commit history for out-of-scope edits, unpushed commits, or accidental force-push requirements.
- [ ] Return a pass/fail report with exact evidence and prioritized corrections.

**Acceptance:** The QA report has no blocking findings, the clean build exits 0, and every spec requirement maps to an implemented and verified behavior.

**Expected effect:** The chief planner receives an independent release gate rather than relying on agent self-reports.

## Chief Planner Execution Protocol

1. Dispatch Tasks 1, 2, 3, and 4 to separate Claude worktrees with the exact task blocks above.
2. For each returned task, inspect the branch diff, verify the reported commands independently, and reject or accept explicitly.
3. Integrate accepted commits only after confirming no overlapping files or incompatible interfaces.
4. Dispatch Task 5 after Tasks 1–3 are accepted; give it the accepted markup and route inventory.
5. Dispatch Task 6 only after all accepted implementation commits are integrated.
6. For every QA finding, send a focused correction task to the responsible Claude agent, then repeat the review gate.
7. Run the final clean `npm run build`, `git diff --check`, route/link checks, and deployment workflow check from the chief planner branch.
8. Push the final integrated branch and verify the GitHub Actions run and deployed Pages URL.
9. Do not terminate any Claude agent session while its task is `needs-changes`, `blocked`, or awaiting verification. Keep sessions available for corrections and review.
10. Terminate/close agent sessions only after their task is accepted, all dependent integration checks pass, the QA agent reports no blocking findings, and the deployed target is verified.

## Completion Definition

The plan is complete only when:

- The archive Home, Projects, Notes, and About experience matches the approved design.
- Projects and Notes have structured, maintainable content models.
- All internal routes work under `/venom-website`.
- `noindex`, `robots.txt`, and sitemap removal are verified.
- The clean production build passes.
- QA has no blocking findings.
- The final commit is pushed and GitHub Pages serves the expected site.
- All Claude agent sessions have been reviewed and safely ended after acceptance.
