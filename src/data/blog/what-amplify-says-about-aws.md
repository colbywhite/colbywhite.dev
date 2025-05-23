---
title: What Amplify says about AWS
pubDatetime: 2022-08-18T15:00:00.449Z
tags:
  - AWS
  - aws-amplify
---

I recently had to spend some time spinning up a simple Hello, World app onto AWS. It was a bare-bones `create-react-app` UI that was behind a very basic Google OAuth guard. The whole exercise was to get a feel for how much work is needed to use AWS and Cognito for auth.

In the end, I came away cementing a personal trend that's been growing throughout the last few years: AWS is no longer my default platform to reach for. It just does soooo much.

The process to set up Cognito through their interactive Amplify CLI involved answering ~5 questions to set up an IAM user, another 11 questions to initialize the stack, another 2 questions and a some UI screens to set up the hosting for the React assets, and another 35 questions to set up Cognito.

I later did the same app with Clerk for the auth and it ended up being a grand total of 4 clicks in the UI and I was done. I didn't even have to go create a Google OAuth application on GCP.

Going through the Amplify CLI is burdensome not because the CLI is inherently bad though. I later rebuilt the stack via Pulumi and it still took just as long to create the stack.

In order to spin up a Cognito backend, here's what I ended up needing:

- An user pool
- An identity pool
- An IAM role for standard users
- An IAM role for admin users
- An user group for standard users
- An user group for admin users
- An identity provider
- An user pool client
- An user pool domain
- An IAM role for authenticated users
- An IAM role for unauthenticated users
- An identity pool role attachment

All this for "we need auth."

You see the similar pattern even on deploying the CRA UI, even though it manifests much smaller. Here's what that part of the stack needed:

- A S3 bucket
- A S3 bucket policy
- A Cloud Front distribution with a boatload of different configuration options

All this for "deploy the UI."

The existence of Amplify seems to be an admission that doing releatively simple things on the AWS platform can be overwhelming and involve several moving parts. Amplify attempts to simplify AWS and all the different things it can do into a "simple" CLI, but it feels like a nearly impossible task. AWS can do soooo much that it's hard to imagine a simplified version.

Five years ago, the thought of rolling my eyes at AWS would've been unthinkable. It was the cutting edge and brought FaaS (function as a service) to the mainstream via Lambda.

But now it seems dated. Many of the edge platforms are able to deliver the same result with orders of magnitude better developer experience because they are optimized to do a handful of things really, really well.

AWS still corners the market in terms of being able to do nearly _everything_. But that is simultaneously its strength and weakness.
