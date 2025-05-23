---
title: Jamstack is dead
pubDatetime: 2023-02-28T11:00:00.000-06:00
tags:
  - JAMstack
  - Rendering
  - SSR
  - CSR
  - SSG
  - Edge
---

I've [written] [before] about my beefs with the name _Jamstack_. It's one of my bigger pet peeves.

But I usually still see value in the concept, regardless of its confusing name.
That's mainly because I kept a fairly narrow idea around its core value:
_a static, pre-rendered site served from the edge has a boatload of benefits - simplicity, performance, security to name a few._

And thus over the years I've kept my focus on the **static-site generator** part of the concept.

But recently, I've had my own personal light bulb go off, and I've moved beyond SSGs and have really embraced the recent resurgence of **server-side rendering**.

The newest battle in the JS framework war has really been focused on making SSR an easier thing to achieve,
which in itself is a backlash to the decade of [battles over client-side rendered SPAs] that left us all with scars.

Once SSR became significantly easier to achieve, it quickly became my new default over SSGs.
[Kent C. Dodds] summarized it well in his [Frontend Masters course on Remix].

> If you are building a blog and all it has a static content, then you're not going to get any different UX whether you server render that or SSG that.
> Some people are like, "Hold on a second. With SSG, I can put that on a CDN and it's going to be faster, right?"
>
> **Well, it turns out that for decades now CDNs have been able to take server-rendered HTML and save it on the CDN.
> And so you get effectively the same UX anyway and then you have way more flexibility if you SSR that.**
> So SSG will be no better at serving the user than SSR will even for a completely static site.

Kent then points out that what's left is the use case for dynamic content, but that's a fairly easy no-brainer:
SSR beats SSG for that handily.
(And I'm on the [Remix] bandwagon and think that that particular framework can beat CSR as well, but that's a different post.)

The result for me is that I'm not fascinated by SSG like was a couple of years ago.
And thus - since I posit that SSG benefits were the major innovation of Jamstack - I'm not fascinated by Jamstack either.

To sum that up with some clickbait: **Jamstack is dead to me**.

I think I've had that conclusion for a while now, but what crystallized it for me was the recent [ShopTalk Show episode] with [Brian Rinaldi],
who (among many other things) is the author of the [JAMstacked newsletter].
Most of it was echoing many of my own complaints about the term, but your mind always processes it differently when you hear it come from someone else's mouth.

Something about their conversation triggered a thought: **the far better way to talk about sites in 2023 (and probably years ago as well) is to talk about the rendering strategy.**
Javascript, APIs, and markup was always an awful way to categorize sites. CSR, SSR, and SSG are far more productive ways to talk about web development.

And thus I'm done talking about Jamstack. It's a meaningless term and arguably always was.
Talk to me about your rendering strategy and we'll likely have a more productive conversation about your app.

[written]: jamstack-identity-crisis
[before]: jamstack-definition-without-the-edge
[remix]: https://remix.run
[battles over client-side rendered spas]: https://infrequently.org/2023/02/the-market-for-lemons
[kent c. dodds]: https://kentcdodds.com
[frontend masters course on remix]: https://frontendmasters.com/courses/remix
[shoptalk show episode]: https://shoptalkshow.com/554/
[brian rinaldi]: https://remotesynthesis.com
[jamstacked newsletter]: https://jamstack.email
