---
title: Decision after decision after decision
pubDatetime: 2021-09-04T11:00:00.000-06:00
tags:
  - it's not just about code
  - decisions
---

Just want to jot down this description from Dr. Gail Murphy so I have it somewhere. This is a good way to describe a phenomenon I've personally experienced. Coding a lot of times is the easiest part of this job. Problem solving and decision making are by far the most difficult and important parts of the job. But because it's difficult, it's common for people - both engineers and non-engineers - to want to breeze through it quickly without much though and just throw 0s and 1s at whatever the problems is.

And it's not hard to guess the result.

Murphy explains it in a bit more detail.

> When I think about software development, if you even take just the act of coding, which is one small piece of software development, even if you have that interface defined ... and you start to think about how you're going to actually write the code that provides the functionality promised by that interface, ... **you're making decision after decision after decision.** You're making decisions about exactly the variables that you're using to express the code so that other people can understand it later, you're making decisions about how you express that code through various constructs and loops, you might be relying on other people's components. So every decision is having an impact on your output. ... So if I make this decision about a variable name, is that going to impact me in the future? Maybe the variable name isn't going to be so bad, but maybe the way that you're starting to create a different looping structure, deciding on an algorithm to use, that's actually going to have ramifications down the line. **You're probably not going to be able to predict what those ramifications are, And that wouldn't be so bad if you could undo things. It's just so hard to undo things that every decision can feel weighty if you really think about it. So you can't allow yourself to think about it. You just make progress. And start to make decision upon decision upon decision. But at the end, the sum of those decisions puts you in some concrete [in terms] of what that piece of software is going to look like**. ... Now, when we think about that at the level of writing a function, maybe it's not so bad. But then you start to think about, well, what about at the level of a module? Okay, now there's a lot more choices. What about the level of modules that interact through an exception handling mechanism? Now there's even more decisions, right? **So it's compounding decisions time and time again in a place where we often don't provide people with enough information to make a good decision.** We might not know what are other decisions that are happening that might impact this one because we don't have an ability to understand all the information that's being bombarded at us as a software developer within a big system.

<cite>
  Dr. Gail Murphy, Professor of Computer Science and Vice President of Research
  and Innovation at the University of British Columbia, on [**The Idealcast**
  with Gene Kim][Idealcast]
</cite>

[idealcast]: https://itrevolution.com/the-idealcast-episode-21/
