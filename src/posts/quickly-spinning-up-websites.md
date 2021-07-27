---
title: Quickly spinning up websites
date: 2021-07-26
tags:
  - spa fatigue
  - normalize.css
  - 11ty
  - sakura
  - netlify
---

Since I've been experiencing heavy [SPA fatigue] lately, I've been realizing I'm rusty on the Basic Trinity&trade; of web development - i.e. just HTML, CSS, and JS.
The last couple years of Angular-only development may have led me to forget the basics.

So when redoing this personal site, I'm intent on just using the Basic Trinity&trade;.

Question 1: what's an ideal way to start a vanilla, basic site from scratch?

There are a gazillion of tools and templates out there, but I end up tweaking them to satisfy my opinions anyway.
So I need/want one that's tailor suited to my personal tastes.

Here's where I landed.

<!-- excerpt -->

## TLDR

- I used [11ty] to be the simple SSG
- I used [normalize.css] and [sakura] to provide out-of-the-box sensible styling
- I used [Netlify] for continuous deployment and CDN hosting

## IntelliJ's basic HTML template

Creating an HTML file in IntelliJ results in the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
</body>
</html>
```

This is missing a few things. Here's what I would prefer to see:

``` html/4,8-10/
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
    <header></header>
    <main></main>
    <footer></footer>
</body>
</html>
```

This seems trivial, but the viewport is key.
It's going to start this site out with a [decent mobile experience][Coyer on initial scale].

That feels like table stakes to me.
Seems like all default HTML templates should include that, but what do I know?

## Normalize.css + Sakura

I just want a simple basic CSS theme to start out with that doesn't force me to think too much.
After minimal research on what was being used in [11ty templates], I settled on [normalize.css] as a reset to get browser consistency.
Then a [sakura] theme to be a sane starting point.

If you play with the [sakura demo] you can see how bad the default styles of browsers are.
I would love if something like sakura was just the default of all browsers.

## 11ty

I already mentioned SPA fatigue.
So obviously I'm not using a popular JS framework.

Since I'm in a "make sweeping generalizations" type of mood, I'll say that SSGs should be the starting point for a lot of projects.
I'm sure that sounds like blasphemy, but I'm very intrigued at how far the jamstack philosophy can go with a SSG being the workhorse of a project.

[11ty] seems like a solid SSG that doesn't have any opinions, which is good for a starting point.
Since it's just JS under the covers, it seems like most domain-specific problems can be solved.

And for my particular use case, I'm building a personal blog. So a SSG is the obvious choice.

I used [Rong Ying]'s [starter blog template][11ty-blog-starter] as my starting point and dialed it back to make it simpler.
Then [Phil Hawksworth's personal site][hawksworx] gave me a little inspiration to tweak the styles to my personal tastes.

## Netlify

It's hard to read about jamstack without hearing [Netlify's][Netlify] name.
Most of the dev evangelists out there preaching the jamstack gospel work at Netlify.
I doubt that's a coincidence.
I suspect it's a business strategy.

A smart business strategy.

Putting my outside-looking-in analysis of its strategy aside, Netlify is still a great product.
They're making CDNs dirt simple.
So I can't help but decide to use them as my go to CDN for a site.

Setting it up was as easy as creating a `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "_site"
```

One click in the Netlify UI later, I've got continuous deployment set up and a URL of `https://*.netlify.com`.
Easy peasy.

I decided to buy a new domain for this effort that's more suited toward personal branding (colbywhite.dev) as opposed to my previous generic one (sustainabledev.io).
So I just bought the new domain through Netlify.
Adding HTTPS was as simple as clicking a button since Netlify allows you to buy a cert through [Let’s Encrypt] via the Netlify dashboard.

The whole experience was the simplest domain and HTTPS experience I've ever had.

## Conclusion

Going from scratch to a functional and styled blog didn't take much time at all.
Most of the time was spent browsing other people's blogs and sites so I could decide which parts of [11ty-blog-starter] I wanted and what style tweaks I wanted.

I plan on snapshotting the work as a template so it could be my future starting point.

[SPA fatigue]: https://macwright.com/2020/05/10/spa-fatigue.html
[normalize.css]: https://necolas.github.io/normalize.css
[Coyer on initial scale]: https://css-tricks.com/probably-use-initial-scale1/
[sakura]: https://oxal.org/projects/sakura
[sakura demo]: https://oxal.org/projects/sakura/demo
[11ty]: https://11ty.dev
[11ty-blog-starter]: https://github.com/kohrongying/11ty-blog-starter
[hawksworx]: https://www.hawksworx.com
[Rong Ying]: https://github.com/kohrongying
[Netlify]: https://www.netlify.com
[Let’s Encrypt]: https://letsencrypt.org/
[11ty templates]: https://www.11ty.dev/docs/starter/
