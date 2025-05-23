---
title: Weeknotes - Aug. 15
pubDatetime: 2021-08-09T11:00:00.000-06:00
tags:
  - weeknotes
  - dev notes
  - css tools
  - schematics
---

Fairly boring week in terms of software.

## CSS/Design

- More CSS tools! (most of these are coming from Brad Frost)
  - [pattern lab](https://patternlab.io/)
  - [Style Guide Resources](http://styleguides.io/)
  - [Style Guide Guide](https://bradfrost.github.io/style-guide-guide/)
  - [CSS Layout Patterns](https://csslayout.io/patterns)

## Schematics

- They are colloquially referred to as [Angular Schematics]. But you can use them _outside_ of Angular projects. [Okta] is a good example this.
- When creating your own schematic, there are helper methods that exist deep in the `@schematics/angular/utility` package (for example, `addImportToModule` ). I wish these were better documented, but whatever, I found them. However, these utility methods are additive. `addImportToModule`, `addExportToModule`, etc, etc. They dont seem to have the inverse version of these methods. `removeImportFromModule`. `removeExportFromModule`. etc, etc. After searching around, I could only find one example of someone doing this - the [German Aerospace Center Earth Observation Center]. They built their own inverse version inspired from Angular’s. It boggles my mind that Angular itself doesn’t already have the removal versions of these methods somewhere. And it also boggles my mind that I legit can only find one removal version in all of Github. This seems like a very common thing to be doing. It seems far more likely that im missing something or putting in the wrong search keys.

## Misc

- I like Adam Gordon Bell's [idiots and maniacs] dichotomy. A useful self check. Bonus points since it led me down a [George Carlin] rabbit hole.

[okta]: https://github.com/oktadev/schematics
[angular schematics]: https://angular.io/guide/schematics
[german aerospace center earth observation center]: https://github.com/dlr-eoc/ukis-frontend-libraries/blob/2a65df0d22dbcba1998a6cc6bdd125555965ad55/projects/core-ui/schematics/ast-utils.ts#L150
[idiots and maniacs]: https://earthly.dev/blog/idiots-and-maniacs/
[george carlin]: https://youtu.be/T7YcQ5wh4Ds
