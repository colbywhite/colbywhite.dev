---
title: Learning curve for edge platforms (SSG edition)
description: Learning curve for edge platforms (SSG edition)
pubDatetime: 2022-07-02T20:48:09.243Z
tags:
  - JAMstack
  - CDN
  - Netlify
  - ssg
  - edgecomputing
---

This is the beginning of me trying to compare most of the edge platforms available nowadays. This isn't meant to figure out the _best_ one; the goal is more focused on understanding the different features in the space. (Hopefully this becomes a living document that grows as the space itself grows, but I make no promises.)

## The application

In order to facilitate this comparison, I started with a very basic static site application and deployed it on each platform. No better way to get a feel for how easy a platform is to use than to actually use it. Granted, a very basic static site isn't the most exciting use case and might limit the insights from this exercise, but it's quick to spin up and get going with.

For the static site itself, I decided to take an [11ty starter project](https://www.11ty.dev/docs/starter/) off the shelf. [Cameron MacFarland's](https://twitter.com/distantcam) [windty](https://github.com/distantcam/windty) became the winner.

## The platforms

Now that I have a basic app to play with, let's list out the platforms I want to look at.

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
- [Azure](https://docs.microsoft.com/en-us/azure/static-web-apps/overview)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Surge.sh](https://surge.sh/)
- [Render](https://render.com/)

## Learning curve

Building our app requires two steps.

```shell
yarn install
yarn build
```

The result is a `_site` directory that needs to be deployed. Let's see how much work was required for each platform.

### Netlify

Netlify does the `yarn` commands on its own since it detects the application is using `yarn` on its own. But it does need to be told about the output directory. To do so it's a [simple `netlify.toml` file](https://github.com/colbywhite/windty/commit/5beaccdf09553730a8e1b18c56b64f4850019e30).

```toml
[build]
command = "yarn build"
publish = "_site"
```

Combine that with clicking a few buttons in the UI to give Netlify git access, and we have automated deploys on every push to a netlify URL.

3 stars out of 3 for simplicity.

Result: https://statuesque-pie-1cc806.netlify.app/

### Vercel

Vercel was able to go a step further and detect that the application is using 11ty. Thus, there was no need to even specify the output directory. Thus clicking through the UI to connect it to git was enough to give us automated deploys to a vercel URL.

3 stars out of 3 for simplicity.

Result: https://windty.vercel.app/

### GitHub Pages

MacFarland's original windty project was set up with GitHub pages so we can just look at what he has set up via a [GitHub Action](https://github.com/distantcam/windty/blob/main/.github/workflows/build.yml).

This a fairly standard action for a node project that runs the commands we need ran. Then it finishes by using an [action](https://github.com/marketplace/actions/github-pages-action) designed for deploying to GitHub Pages. (It's authored by [Shohei Ueda](https://peaceiris.com/).)

```yaml
- name: Deploy
    uses: peaceiris/actions-gh-pages@v3
    if: github.ref == 'refs/heads/main'
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      publish_dir: ./_site
```

This requires a GitHub Token, so there is some UI clicks needed to obtain that and to set it has a secret for the repo. But that is fairly standard.

The other gotcha here is the fact that the URL you get from Pages is a sub-route as opposed to being deployed at root. To account for this there is some tweaking done in the 11ty config.

```javascript
var pathPrefix = "";
if (process.env.GITHUB_REPOSITORY) {
  pathPrefix = process.env.GITHUB_REPOSITORY.split("/")[1];
}

return {
  dir: {
    input: "src",
  },
  pathPrefix,
};
```

This configures the [`pathPrefix` config property](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix) based on an [environment variable](https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables) that's set by GitHub in order to build the site with knowledge of the sub-route. This isn't a huge hurdle once you know about it, but it is something that might not be immediately obvious. The solution is also specific to 11ty; I imagine another SSG would have a similar but different solution.

2 stars out of 3 due to the small gotcha.

Result: https://distantcam.github.io/windty/

### GitLab Pages

This follows along the same lines of GitHub Pages. Start with a [config file for CI](https://gitlab.com/colbywhite/windty/-/blob/main/.gitlab-ci.yml) that does the standard build commands. But one extra step is needed since GitLab very much wants your [static files in a `./public` directory](https://docs.gitlab.com/ee/user/project/pages/getting_started/pages_from_scratch.html#specify-the-public-directory-for-output). So a `mv _site public` is needed to move the output to a directory GitLab will understand.

(Another option would be to [configure the 11ty output directory](https://www.11ty.dev/docs/config/#output-directory) to `public` instead of the default `_site` we've been using. Tomayto, tomahto.)

```yaml
image: node:latest
cache:
  paths:
    - node_modules/
pages:
  script:
    - yarn install
    - yarn build
    - mv _site public
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

No tokens needed here which is nice.

GitLab has the same sub-route in their deployment like GitHub, so we have to account for that again.

```javascript
// Since GitLab pages are published in a subdir, set the prefix when on GitLab.
var pathPrefix = "";
if (process.env.CI_PROJECT_NAME) {
  pathPrefix = process.env.CI_PROJECT_NAME;
}

return {
  dir: {
    input: "src",
  },
  pathPrefix,
};
```

GitLab has a [different environment variable](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) to specify what we're looking for, but same concept.

2 stars out of 3 due to the small gotcha.

Result: https://colbywhite.gitlab.io/windty/

### Azure

I've never been a fan of the [Azure portal](https://portal.azure.com/#home). There's so much stuff to click that it becomes overwhelming. (For instance, as I write this, it's taking me forever to remember what I clicked in the UI the first time in the portal to deploy.)

However, the goal is to create a _Static Web App_ service. Once you find that you go through a UI that asks a bunch of questions, most of them irrelevant. You'll have to create a _Resource Group_ for reasons and you'll have to select some defaults for Azure Functions, which we won't be using. The relevant part of the UI is around the build. They have presets for many SSGs, but not 11ty. But it's simple to specify the _Output location_ as `_site` like we need.

Once you make it through though and connect it to your repo, a commit is created to your repo that adds a [GitHub Action](https://github.com/colbywhite/windty/blob/main/.github/workflows/azure-static-web-apps-gray-glacier-0ebe2aa10.yml) for you. Much like the UI, the configuration is verbose, but the key is the `Azure/static-web-apps-deploy@v1` step.

```yaml
- name: Build And Deploy
  id: builddeploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_GRAY_GLACIER_0EBE2AA10 }}
    repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
    action: "upload"
    ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
    # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
    app_location: "/" # App source code path
    api_location: "" # Api source code path - optional
    output_location: "_site" # Built app content directory - optional
    ###### End of Repository/Build Configurations ######
```

That's our magic sauce to get our automated deployment.

1 star out of 3 due to all the verbosity in the process.

Result: https://gray-glacier-0ebe2aa10.1.azurestaticapps.net/

### AWS Amplify

This is another UI-heavy process. But once through it, you're given a fairly standard yaml file representing the build that does the basics, but it's in the AWS UI only at first. Download it and add it to the root of the repo in order to have a better way to control the build process. Then we can account for the `_site` output directory.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - yarn run build
  artifacts:
    baseDirectory: _site
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

Now we have our automatic deploys.

3 stars out of 3 for simplicity.

Result: https://main.d3cjst1g08rdt6.amplifyapp.com/

### Surge\.sh

Surge is driven by the CLI. So running `surge` created the project and asked me which directory to deploy. Very straightforward.

Combining this with a standard GitHub Action for node yields our automatic deployments easily.

```yaml
- run: yarn surge --domain windty.surge.sh ./_site --token ${{ secrets.SURGE_TOKEN }}
```

(Obtaining the token was done via `surge token`.)

3 stars out of 3 for simplicity.

Result: https://windty.surge.sh/

### Render

This is another one simple one that's similar to Vercel. Use the UI to connect it to your repo and then specify the `_site` directory.

And that's it.

3 stars out of 3 for simplicity.

Result: https://windty.onrender.com/

## Recap

I see a few different trends.

### Config file in the repo

This is my preferred strategy. Allow me to put a small file in the root of the repository that defines my build and deploy.

In the context of an SSG app on an edge platform, this should be simple: specify build command and the output directory. And ideally, the platform can take some educated guesses as to what these are.

Netlify (`netlify.toml`), GitLab (`.gitlab-ci.yml`), and Vercel (`vercel.json`, although it was able to figure out what we wanted without extra configuration.)

Render doesn't use a specific config file but it's UI is designed around the same concept (build command and output directory) so it's a UI-based version of the same idea.

### Build vs deploy

Most of these platforms offer you the ability to build _and_ deploy - which is great in my opinion. Some of them don't combine them in a first-class way though.

Netlify, Vercel, GitLab, AWS, and Render all are running the builds for you on their systems.

GitHub Pages & Azure both leverage GitHub Actions to run the deployment, meaning you build it on your own and run a command for the deploy. Surge takes it even further and just gives you a command that you can run on any system.

### Root route

The sub-routes in GitHub and GitLab Pages adds a subtle gotcha that has to be accounted for slightly differently in each SSG. Having the ability to deploy to a root route like the rest is small but noteworthy.

### Conclusion

Netlify, Vercel, Render, and Surge.sh are the most straightforward for this kind of project. That would likely change once you start adding edge functions.
