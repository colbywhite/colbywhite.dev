# colbywhite.dev

This is the personal site of Colby M. White.

Started from the [satnaing/astro-paper](https://github.com/satnaing/astro-paper) template.

## TODO

- Fix back button on posts.
  - Likely requires a different breadcrumb strategy for posts.
- Add transition name to timestamps.
  - Consolidate FormattedTime and Datetime in the process.
- Replace uses of `@/utils/getSortedPosts` to `@content/blog/queries` version.
- Don't get all the bookmarks every build.
  - Is netlify actually caching them between builds?
- Display both published and modified dates.
