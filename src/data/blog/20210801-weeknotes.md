---
title: Weeknotes - Aug. 1
description: Weeknotes - Aug. 1
pubDatetime: 2021-08-01T11:00:00.000-06:00
tags:
  - weeknotes
  - résumé
  - cross-functional teams
  - event sourcing
---

Starting something new: Weeknotes. Swagger jacked it from [Jan Früchtl](https://fruechtl.me/writing/weeknotes-1), who swagger jacked it from others. "No idea's original" - Nas.

Will use it to collect dev-related things I've learned/done/read throughout the week. We'll see if it proves to be productive in getting me to keep track of ideas. I have a feeling I'll forget to jot things down as they come. 🤷 If I keep it short and sweet, maybe that'll be conducive to me actually keeping up. Short, sweet, sassy. My new motto.

## Productivity

- Started using Notion, partially to help keep track of Weeknotes, but mainly because of the convo on [Shop Talk Show](https://shoptalkshow.com/472/#t=21:34) regarding its unique approach to the database. "Everything's a block!" So far it's nice, but I'd prefer if I could just write markdown.
- I have a friend named Peña. And for our whole relationship I've struggled to efficiently put that accent mark there when typing. I finally found the answer from Quincy Larson via an [old tweet](https://twitter.com/ossia/status/1325888422364516359). I feel like I can be a good friend now in slack! And I don't know Jan Früchtl, but I went ahead and figured that one out too just in case I ever meet him. (Spoiler: Option + u, u)

## Developer experience

- Been revamping my site to leverage 11ty and noticing that WebStorm struggles to understand the correct syntax highlighting for templating sometimes. If I name the file `index.html.njk`, then, and only then, will it realize that it is both a nunjucks file _and_ a HTML file. But this isn't the ideal filename. There's other 11ty-related things it could pick up on too. Someone should make a 11ty plugin. _searches quickly to see if it exists._ Yea, someone not named Colby should get on that.
- I support [Ben Northrop](http://www.bennorthrop.com/Essays/2021/techrez-a-better-resume-for-tech.php) and his quest to reinvent résumés via [techrez.io](https://techrez.io). I also support what they're doing at [jsonresume.org](https://jsonresume.org). Current résumé formats suck. That is all.

## Software philosophy

- I need to do more tangible research on cross-functional teams. My intuition says include _everybody_: frontend devs, backend devs, managers, product, tech writers, security devs, support, sales, marketing. Well, maybe I don't need sales and marketing ... ugh, yes I do! How many times has a salesman promising something to a customer ended up screwing over a project. My job is not zeros and ones; it's solving customer problems. And I need all those other nerds in order to do it.
- Here's Gene Kim and Scott Havens explicitly drawing the connection between [event sourcing architecture to a functional philosophy][does19] at DOES19. Functional all the things!

[does19]: https://youtu.be/FskIb9SariI
