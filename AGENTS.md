## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Git Workflow

- After modifying any project file, inspect the diff and run the most relevant validation command (at minimum, `npm run build` for application or configuration changes).
- After validation passes, commit the changes with a concise message.
- Push every new commit to the current remote branch immediately with `git push`.
- If committing or pushing fails, report the exact error and do not claim the change is complete.
- Do not amend, force-push, reset, or discard existing commits unless explicitly requested.
