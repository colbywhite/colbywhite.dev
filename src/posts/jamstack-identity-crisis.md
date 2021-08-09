---
title: Jamstack identity crisis
date: 2021-08-07
tags:
  - jamstack
  - architecture
  - naming is hard
  - JavaScript Jam
  - edge-first approach
---

I recently was fascinated by the debate in a recent episode of [Javascript Jam] where they debate on what Jamstack actually is and whether or not the name is even valid.

Yes, I'm fascinated by what amounts to a naming debate. Well, [naming is hard] and I enjoy a challenge. So naturally I'm about to throw my hat in the ring and see if I can come up with a better name and definition.

<!-- excerpt -->

First, let me try to quickly recap the context around Jamstack as I see it before I submit my proposal for a possible solution.

## Context as seen by a noob

> Disclaimer: This recap is based on a relatively short amount of time of me being extremely intrigued with this Jamstack concept in my spare time. If you've been in the Jamstack space for years and know that I'm oversimplifying something key, bear with me. 
>
> One day I'll add more interactive features on this blog for you to school me and point out my imprecision. But for now, humor me.

In the olden days in a galaxy far, far away, shortly after [Al Gore finished inventing the internet][Gore], the web was fairly straightforward. You had a server that had a bunch of static HTML files on it. There wasn't any JavaScript. There wasn't any CSS. Just pure HTML on a server. 

When the browser went to a site, all it was doing was downloading an HTML file to read the markup and rendering a UI based on said markup. That was it. No JS frameworks. No API calls. No databases. Just a bunch of ugly HTML files - with a liberal amount of `<blink>` tags in them because the 90s were wild.

It was a simpler time. To make a site, just make a HTML file.

It was a faster time. All the browser is doing is downloading a single HTML file.

It was a safer time. There wasn't a whole lot of surface area for a hacker to hack. Even if you did manage to hack my single web server, what are you going to do? Add more `<blink>` tags?

But of course, you couldn't really do a whole lot with these static sites. I mean, they were static.

Fast-forward to now, where 30 years of web development has given us a new JS framework every other week, slow API calls, scary security hacks that we all pretend we're concerned about, and a bunch of ads being served by JS ad farms slowing pages down. 

To be fair, we did finally get rid of that `<blink>` tag. So it wasn't all bad.

In exchange for cool dynamic websites and webapps that have proven so useful that they've changed both our habits and economy, we've introduced an alarming amount of complexity, security, and performance concerns.

Enter the (poorly named) Jamstack. In my telling of the story, Jamstack was trying to reevaluate that bargain. Can we get back to the days of a simple HTML file without sacrificing all the cool dynamic functionality we've grown to love from our modern webapps?

## So WTF is Jamstack then?

Here's my crack at explaining what this Jamstack label is trying to describe. 

> It is an approach to building webapps that defaults to treating as much of the app as possible as a static and pre-rendered website served by an edge server.

That's what I've got. I'm sure some wordsmiths out there can iterate on this. But there are four key things missing from today's discussion over the name that I think we all would benefit from including since it would clear up much of the confusion around this space.

### Jamstack is not a stack; it's an approach

Even before hearing [Jeff Escalante] go on what I consider a perfectly valid and logical mic-drop rant in the aforementioned episode, I've been annoyed by the name _Jamstack_. It's been hard to explain to people without getting perplexed stares. But the episode helped me crystallize why.

What we refer to as Jamstack **IS NOT AN EFFING STACK**.

The MEAN stack is a stack of technologies (MongoDB, Express.js, Angular, and Node). The LAMP stack is a stack of technologies (Linux, Apache, MySQL, and PHP). The LYCE stack is a stack of technologies (Linux, Yaws, CouchDB, Erlang). Go down the [list][Stack list]. They're all acronyms for a specific set of technologies that stack on top of each other to build out your application.

Let's reevaluate the original acronym of JAMstack: JavaScript, APIs, and markup.

Stare at that for a second. What in the modern web _doesn't_ have JavaScript, APIs, and markup? Everything has JAM in its stack. This is a distinction that never actually distinguished anything.

Not trying to throw too much shade on the original acronym since - as [Brian Rinaldi] attempted to explain in the episode - there were well-intentioned humans who came up with the name for well-intentioned reasons. But by the simple metric of _Does the name accurately describe the thing it's naming while differentiating it from the things it's **not** naming_, the original name/acronym objectively fails.

I would argue this is because the original name was trying to shoehorn these concepts into a stack-like mental model when there was nothing really stack-like about them as far as I can tell.

What everyone is trying to describe is an approach to how devs architect their apps. It's a shift in mental model. For the last 30 years, we've been approaching every nail with our "heavyweight JS framework makes calls to a backend server running a server-side app framework which makes calls to a database in order to render a page" hammer. Instead of swinging that heavy-handed hammer - and dealing with the security, performance, and scaling repercussions that come with that hammer - Jamstack prompts us to step back and see if a different approach would get the job done.

### Jamstack isn't scared of your dynamic content

That hammer is great when the content of the site is truly dynamic. But I mean, _truly_ dynamic. "The content is changing multiples times a minute" dynamic. "There would be significant business consequences if the user sees stale content" dynamic.

The more I've read up on this space through the last few months, the more and more I'm realizing that some things I would have normally considered dynamic don't really meet that bar. The next thing I've been planning on researching is how the ecommerce space seems to be embracing the Jamstack approach. That's a problem set that I wouldn't think of using pre-rendering for. But it seems to be effective. That makes me step back and rethink this whole static/dynamic dichotomy.

Maybe things aren't as dynamic as we previously thought, and thus pre-rendering things at build time might be more useful of a tool. Jamstack wants us to analyze that point thoroughly for our use cases before jumping for that heavy hammer.

### Jamstack knows your app isn't either static or dynamic - it's a mix of both

A big part of the talk around this space has a scent of binary thinking. _Your app is either a static app or a dynamic app._ This isn't very productive.

One of the best examples I've seen of breaking through that binary thinking was [Kapehe Sevilleja]'s appearance on [Learn with Jason]. They build a blog which, by itself, is easy to think of as a static site. The site only updates when you create a new blog post. That's fairly static. You can easily re-run the build when there's a new blog post.

But what if you want a feature where readers can click a like button on a post and the amount of likes is displayed somewhere on the post? Sounds dynamic at first until you realize that the like button is the only dynamic item on the whole page, thus making the vast majority of the page static. Solution? Build 99% of the site with build-time pre-rendering and then sprinkle a little JS on top to get that like button to display the number of likes.

The world is not binary. These apps can be a mix. The Jamstack approach is prompting us to _default_ to thinking of the app as static because life in static apps is so much simpler. For the bits that need dynamic runtime logic and the default doesn't work, sprinkle some JS and/or an API call on top. (For Kapehe's walk through, she leveraged Sanity.io's headless CMS capabilities - she works for Sanity.io - to get this done, but I would argue the specific tool is less important in the context of this post.)

This isn't about choosing static or dynamic but more about defaulting to static and iterating from there when it's needed.

### Jamstack knows nothing beats the edge

My proposed definition only mentioned one piece of actual technology that could be listed in a traditional stack definition: edge server. For most of us, this means a CDN, but increasingly the industry seems to be realizing that we can even move serverless functions out to the edge. Maybe more.

Leveraging the edge is dirt simple if you can manage to approach your app as static. Just shove the resulting HTML files into the CDN and now you've truly gone back to those early days of simple web servers. Only now your server is a CDN and way more performant.

And what about those dynamic bits that you are 100% certain have to be considered dynamic? Serverless functions at the edge might fit your use case. Maybe a headless CMS or some other third-party service better suites you. Or perhaps you still need a traditional backend for that last mile. So be it. 

If you've managed to pre-render a large portion of the app/site and put it in a CDN, you're going to have better performance and a simpler architecture.

## My proposal for a new name

I've been using the name Jamstack throughout this post to describe what I'm talking about simply because it already exists. It's time for me to ditch that name and offer an alternative. Here's my official nomination.

> The _edge-first approach_: building a webapp by treating as much of it as possible as a static, pre-rendered site in order to leverage an edge server.

The name explicitly calls out the main piece of technology that matters here (the edge). The word _approach_ makes it clear that your mental model is more important than the specific technologies in your stack. And the word _first_ makes it clear that your mental model starts with static content at the edge, but it might not end there since you may need/want to add some runtime logic.

I also like that the definition can be derived by recognizing the edge is awesome. Everything else mostly flows from there.

1. The edge is fast. How can I leverage that?
2. Pre-rendered static content does well at the edge. How much of my app can be pre-rendered?
3. Looks like X percent can be pre-rendered. That's surprisingly high. What about the last Y percent?
4. Maybe a mix of headless CMS, third-party API calls, and serverless functions at the edge can handle the rest?
5. Wow. Now I have a simpler backend, better performance, easier scalability, and a lower security surface area to worry about. Time to profit. 💰

If someone reads this definition, I can still see them having doubts that the _X percent_ in step 3 isn't all that high for their use case.

But now you can have a dialogue and start pointing out how it can be higher than you might think. That part of the conversation will likely get into the details of the optional technologies in this space that can help you get to the edge at step 4. Static-site generators, headless CMSs, serverless functions that are likely on the edge themselves, and the automation that stitches it altogether.

I'm currently trying to better grok step 4 of that list. There's a handful of technologies that can be used there, each working better with certain use cases than others.

But it's not the starting point. The starting point is the edge.

[Javascript Jam]: https://www.javascriptjam.com/episode/episode-5-panel-debate-what-is-jamstack
[naming is hard]: http://thecodelesscode.com/case/220
[Gore]: https://origins.osu.edu/history-news/gore-did-help-invent-internet
[Jeff Escalante]:  https://twitter.com/jescalan
[Brian Rinaldi]:  https://twitter.com/remotesynth
[Kapehe Sevilleja]: https://twitter.com/kapehe_ok
[Stack list]: https://en.wikipedia.org/wiki/Solution_stack
[The Evolution of Jamstack]: https://cfe.dev/events/jamstack-identity-crisis/
[Learn with Jason]: https://www.learnwithjason.dev/pushing-the-limits-of-static-sites-with-sanity
