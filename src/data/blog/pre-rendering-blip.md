---
title: The pre-rendering blip
description: The pre-rendering blip
pubDatetime: 2022-10-01T23:34:28.894Z
tags:
  - JAMstack
  - CSS
  - CSS Animation
  - UX
  - pre rendering
---

A common scenario I've found when thinking about pre-rendering is the scenario where there's a small piece of the content that just can't effectively be pre-rendered. Imagine a page where 95% of the content is static and can be resolved at build time, but there's one component that needs something about the client in order to be rendered - a time zone, a user login, a list of recent activity, etc.

It can be frustrating to ditch all the benefits of pre-rendering because of one small component that's likely not even critical. The solution is to hydrate in some fashion. Pre-render the 95% and fill in the last 5% at runtime when you have the relevant information.

The only small downside here is a UI/UX one: the blip the page has when it fills in the runtime content.

Let's run through potential solutions for the blip.

## The problem

Let's simulate the blip with this contrived example in Gatsby.

```jsx
const IndexPage = () => {
  const [clientRendered, setClientRendered] = useState(false);
  useEffect(() => {
    setTimeout(() => setClientRendered(true), 2000);
  }, []);
  return (
    <main className="flex flex-col gap-4">
      {clientRendered && <p>Client-rendered content goes here.</p>}
      <p>Pre-rendered content goes here.</p>
    </main>
  );
};
```

This example exaggerates the delay via `setTimeout` for demo purposes, but the effect is still the same. The pre-rendered content is seen immediately and then the client-rendered content flashes into place. The flash in itself could be harmless for some use cases, but layout shifts are bound to happen as a side effect. Notice how in the above example the pre-rendered content is shifted down in the layout once the client renders.

How jarring the blip is will depend heavily on the use case. I recently had a scenario where I wanted to display an event time in the browser's local timezone. This resulted in a pre-rendered empty block that flashed full with the correct time. It wasn't particularly pretty but got unbearable when there were dozens of events (and thus dozens of time flashes) on one page. It's hard to ignore it when it's at that scale.

## Potential solutions

Let's list out our options here

#### Empty at build; flash at runtime

This is the simplest approach. Explicitly render an empty block in the DOM and let it get flashed in at runtime with client content..

Ideally you're able to know enough about the resulting client to prevent layout shifts and any other CSS impacts.

#### Default content at build; flash at runtime

Your use case might have a sensible default version of the content that can be baked in during build. An option I entertained for my time zone scenario was to use the `US/East` time zone at build time and let the client update itself with the user's time zone at runtime.

This still has a flash, but you're flashing from one thing to another. If the default is applicable to most users though then most users won't see the flash. Downside is that there's a chance that default content might not be applicable to a lot of users, or perhaps even misleading.

#### Loading icon at build; flash at runtime

A loading icon can potentially give a better UX by clearly indicating what's going on. And when it's completed the client content can flash into place.

The major downside is that loading icons don't scale well. Dozens of them spinning in different spots on the same page is lazy UX at best, vomit-inducing UX at worst. Skeleton screens are an improvement but still have the same issues. And there's a flash to the client content when you're done.

#### Any of the above three with an animation

CSS animations are actually very easy to implement and applying them to any of the above scenarios can level it up quickly. Here's a simple fade-in animation that could lessen that jarring impact of a flash of content.

```css
.fade-in {
  animation: fade-in 1s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

A CSS ninja can come up with even more sophisticated animations to make the content really pop. The downside here is now CSS considerations become a part of the solution. It's gone from a Jamstack-y type of problem to a CSS problem.

#### Pre-render multiple versions; redirect at runtime

This initially sounds advanced but it's what a lot of sites do already when localizing content. Imagine a scenario where you want to support three different locales. The build would result in three different versions of the content and some minimal redirect logic at the index page.

```
/index.html
/en-US/index.html
/es-MX/index.html
/fr-CA/index.html
```

A lot of CDNs can do this natively, thus removing the need for a root index page. You get a blip on the initial load to the site to get you to the right locale page, but from there on out you're blip-free.

This strategy doesn't have to be regulated to just locales, although it doesn't seem to be a first-class citizen in many CDNs. But Netlify allows for [cookie-based redirects](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-cookie-presence). You could imagine a solution to the earlier time zone issue that saves the time zone as a cookie and lets the CDN figure it out from there. This moves the initial blip to the CDN layer and makes it a one-time thing.

The downside here is the potential for a ballooning of URLs. You see this today when site's use this for locales where every locale ends up with a URL. That's worth it for locales, but perhaps not for others.

## Recap

The options from above that likely apply to the most scenarios use CSS animations to ease the blip. It's a vague answer but it has to be vague since the right CSS strategy depends heavily on your use case and the style of your page. Thus the conversation quickly moves away from a technical one to a design one.

I chose a simple fade-in animation for my time zone issue, but struggled because I still had dozens of times fading in at the same time. So I then moved toward fading in the whole page, which works for my particular use case.

But my implementation could be better since the timing is now based on loading the CSS first. Some initial loads still blip, others fade in nicely because the CSS was cached. So I've gone from focusing on pre-rendering to focusing on CSS. For my scenario, that's fine.
