import IconRss from "@/assets/icons/IconRss.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import { SITE } from "@/config";

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/colbywhite",
    linkTitle: ` ${SITE.author} on Github`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/colbywhite",
    linkTitle: `${SITE.author} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "RSS Feed",
    href: "/rss.xml",
    linkTitle: `${SITE.author}'s RSS Feed`,
    icon: IconRss,
  },
] as const;

export const SHARE_LINKS = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
] as const;
