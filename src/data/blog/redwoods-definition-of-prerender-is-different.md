---
title: Redwood's definition of prerender is ... different
pubDatetime: 2022-09-11T01:17:46.438Z
tags:
  - JAMstack
  - RedwoodJS
  - prerendering
---

Here's what RedwoodJS's [latest docs](https://github.com/redwoodjs/redwood/blob/b9110e9a7267c2102585ec9353da427a7067a92c/docs/docs/prerender.md) say about prerendering:

> Redwood currently supports prerendering at _build_ time. So before your deploy your web side, Redwood will render your pages into HTML, **and once the JavaScript has been loaded on the browser, the page becomes dynamic.**

I would argue this isn't the intuitive definition of prerendering, mainly because of the second clause that adds runtime hydration to the process. If the JS is enabled on the client, the above definition dictates that you're going to do client-side rendering. That's not what I'd call prerendering.

For prerendering, I'd expect some HTML to be built at build time and that HTML to be used as is at run time. It's unexpected for something that's "prerendered" to switch over to client-side rendering for the whole page because the JS is enabled. Something along the lines of _client-side rendering with a prerendered fallback_ would be a better description.

Fallback is probably the right vocabulary to describe what Redwood is doing here since it matches fairly closely to Next.js' [`fallback: 'blocking'`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking) mode of prerendering, although it's not a one-to-one comparison.

There's nothing wrong with this style of client-side rendering, but to call it prerendering is at best confusing and at worst flat-out wrong. I lean toward it just being the wrong word since the Jamstack community - which is the community that popularized the term - actually has a [published definition for prerender](https://jamstack.org/glossary/pre-render/).

> To generate the markup which represents a view in advance of when it is required. This happens during a build rather than on-demand so that web servers do not need to perform this activity for each request received.

This describes what Redwood is doing to generate their fallback, but they're still heavily leveraging client-side rendering at runtime.

This likely sounds like semantics, but there are tangible consequences. It's hiding the fact that Redwood is a bad tool to reach for when addressing certain common use cases.

Take the common blog scenario. You have a handful of posts that don't change and you write a new post perhaps weekly. Using Redwood, every visitor to your blog has to render the pages and every user will get the same rendered result. It's a waste of time for the user and adds error scenarios you have to design for.

Prerendering is a great solution for this scenario. Build each page at build time once and now your users just use the results. No API calls needed. No performance hit. (Yes, that strategy buckles when you have a gazillion pages to build and your build takes forever, but it'll get you far.) Redwood's client-side render with a prerendered fallback strategy isn't necessarily wrong or bad. It just makes Redwood an sub-optimal choice for several use cases.

And it gets odd when you consider that one of those use cases - the above blog scenario - is used for Redwood's own tutorial. In their defense, the creators are fully aware this is [not the prime use case](https://redwoodjs.com/docs/tutorial/foreword).

> In this tutorial we're going to build a blog engine. In reality a blog is probably not the ideal candidate for a Redwood app: blog articles can be stored in a CMS and statically generated to HTML files and served as flat files from a CDN (the classic [Jamstack](https://jamstack.org/) use case). But as most developers are familiar with a blog, and it uses all of the features we want to demonstrate, we decided to build one anyway.

The result is confusing. If you're skimming through the tutorial and skimming through the docs on "prerendering", you'll come away thinking standard prerendering logic applies. There's two key sentences (on two different pages) that you would've had to pay close attention to in order to realize differently.

For full disclosure, I missed those two sentences. Their full definition of prerender is currently only in the canary docs, not the stable docs. This is likely due to the fact that that distinction matters with for version 3.0, which [adds prerendering to cells](https://community.redwoodjs.com/t/redwood-v3-0-0-rc-is-now-available/3836#cell-and-route-parameter-prerendering-2). And the disclaimer about the tutorial is present in its forward and I just dived into the tutorial - which I'd argue isn't unreasonable.

The result is I spent quite a lot of time trying to achieve a fairly benign use case only to realize days later I was using the wrong tool. Not the end of the world. This is what learning's all about.

But I can't help but be a little irked that it was mostly triggered by misusing the word prerendering. Naming's hard, but it matters.
