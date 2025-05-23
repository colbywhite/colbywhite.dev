---
title: A Jamstack definition without the edge?
pubDatetime: 2022-07-16T02:08:15.231Z
tags:
  - JAMstack
  - Netlify
  - edgecomputing
---

I'm not a fan of the phrase Jamstack. It's not a very good name. It's referring to something that's not a stack and the JAM acronym (JavaScript, APIs, Markup) applies to nearly every web app thus the distinction is useless. I've offered my own alternative name - [edge-first approach] - but I don't have much reach so I doubt it'll catch on like the Netlify-backed name of Jamstack.

And thus many will keep using the phrase, and I'll continue to be irked by its usage and the resulting definitions like the one Netlify's Phil Hawksworth recently offered up in his _[The Jamstack definition evolved]_ post.

Here's Hawksworth's "refreshed" definition:

> Jamstack is an architectural approach that decouples the web experience layer from data and business logic, improving flexibility, scalability, performance, and maintainability.
>
> Jamstack removes the need for business logic to dictate the web experience. It enables a composable architecture for the web where custom logic and 3rd party services are consumed through APIs.
>
> The best practices for building with the Jamstack evolve alongside modern technologies.

For the sake of pointing out the good, I would applaud the use of the word _approach_ here to help clarify that this is not a stack in a traditional sense. I would prefer they used a different name in order to further that clarification, but I sense I'm never going to win that battle.

As for the rest of the definition, I don't think this it's particularly useful since it doesn't actually define the approach. Instead, it lists out one of the main benefits of the approach - decoupling the UI.

(It also ignores the other benefits - security and performance - which seems unfair to those benefits. But I do think the decoupling is the most impactful benefit, so I won't quibble too much.)

You can imagine different approaches that most wouldn't associate with Jamstack that also decouple the UI and thus would match Hawksworth's definition. Event-driven architecture is all about decoupling components of your system, including the UI, but I don't think anybody thinks of that when they think of Jamstack.

And historically, I find that conversations around front-end-back-end decoupling typically revolve around having separate data models so you can change one without the other. So this definition becomes a bit confusing.

Then there's the last sentence. Hawksworth explicitly calls out that sentence as being "key" but I would argue it's meaningless. Of course things evolve with technology. You don't need years of coding experience to know that. According to Hawksworth, _"It is important to acknowledge that the way we build sites and applications will iterate and improve."_ But that's not really what a definition is meant to do. It's meant to define and that last line doesn't help distinguish this approach from any other approach.

Most importantly though, this definition misses the biggest part of this approach - the edge. That's why Netlify is such a trailblazer in this field. They were the first ones that I saw who took the concept of a CDN and expanded it to a robust platform that is running code at the edge. I don't know who the actual first was. Maybe CloudFlare. But Netlify was the first on that I personally noticed since their marketing efforts are pretty effective in their own way.

That's the innovation of this approach. The edge is the best way we've got to deliver a file to a customer. That use to just mean static files but Netlify and their contemporaries have pushed far beyond that, which has forced us all to rethink how we use that word _static_. A definition that leaves out the edge seems counter-productive to me.

Allow me to resurface my previous definition (and name).

> The _edge-first approach_: building a webapp by treating as much of it as possible as a static, pre-rendered site in order to leverage an edge server.

I poke fun at this Jamstack name and the ones who came up with it, but [naming is hard]. My definition isn't perfect either, but I would argue that it actually attempts to define the approach and it doesn't leave that only piece of technology that's necessary for this approach to work.

[edge-first approach]: https://colbywhite.dev/posts/jamstack-identity-crisis/
[the jamstack definition evolved]: https://www.netlify.com/blog/the-jamstack-definition-evolved/
[richard shackleton]: https://medium.com/front-end-weekly/gated-content-and-the-jamstack-is-it-achievable-of-course-6408f1ccf7e8
[naming is hard]: http://thecodelesscode.com/case/220
