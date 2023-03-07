import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import IconDescriptionList from "~/components/resume.sections/IconDescriptionList";

export const links: LinksFunction = () => {
  return [{ rel: "prefetch", href: "avatar.png" }];
};

const socialLinks = [
  {
    name: "LinkedIn Logo",
    icon: "linkedin",
    description: (
      <a
        aria-label="linkedin"
        href="https://www.linkedin.com/in/colbywhite"
        className="link-secondary"
      >
        colbywhite
      </a>
    ),
  },
  {
    name: "GitHub Logo",
    icon: "github",
    description: (
      <a
        aria-label="github"
        href="https://github.com/colbywhite"
        className="link-secondary"
      >
        colbywhite
      </a>
    ),
  },
];

export default function Index() {
  return (
    <main className="prose">
      <section>
        <img
          className="float-right ml-3 mb-3 h-[124px] w-[100px] rounded-full border-4 border-primary md:h-[186px] md:w-[150px]"
          alt="Colby M. White's headshot image"
          src="/avatar.png"
        />
        <h1>About me</h1>
        <p>
          I've been a professional software engineer since 2010, working across
          the stack and focusing on technical leadership.
        </p>
        <p>
          I currently work at Fractal, a venture studio starting startups from
          scratch, helping coach and advise our CTOs as they create something
          out of nothing. I've previously worked at Blackbaud, Spanning, CA
          Technologies, and other companies through contract work.
        </p>
        <p>
          I consider myself a true full-stack engineer, focusing on whatever
          programming language or tool will get the job done. I believe the best
          software engineers are the ones who resist becoming "code monkeys" and
          prioritize building the <i>right</i> thing.
        </p>
        <p>
          I'm a regular at various Austin tech meetups and occasionally{" "}
          <Link to="/writings">blog</Link>.
        </p>
        <p>
          For what it's worth, I own two degrees from the University of Texas at
          Austin in Computer Science and Journalism.
        </p>
      </section>
      <section className="prose-lg mx-auto">
        <h2>Links</h2>
        <IconDescriptionList items={socialLinks} />
      </section>
      <section>
        <h2>Current Projects</h2>
        <ul>
          <li>
            <a href="https://powerschedules.net">Power Schedules</a>, a
            work-in-progress project to highlight which sporting events are
            worth viewing
          </li>
          <li>
            <a href="https://github.com/colbywhite/acoustic-stack">
              Acoustic stack
            </a>
            , a minimalist stack for Remix
          </li>
          <li>
            <a href="https://www.npmjs.com/package/@colbyw/tailwind-color-inverter">
              tailwind-color-inverter{" "}
            </a>
            , a utility to invert TailwindCSS colors to auto generate colors for
            a dark theme
          </li>
          <li>
            this site, which includes a <Link to="/writings">blog</Link> and an
            archive of my <Link to="/readings">interesting reads</Link>.
          </li>
        </ul>
        <h2>Past Projects</h2>
        <ul>
          <li>
            <a href="https://www.npmjs.com/package/aws-cf-monitor">
              aws-cf-monitor
            </a>
            , a wrapper around the AWS CloudFormation Node API that monitors the
            progress of CF commands while providing smart logging.
          </li>
          <li>
            <a href="https://github.com/colbywhite/wordgen">wordgen</a>, a Ruby
            gem command-line tool to generate random words
          </li>
          <li>
            <a href="https://github.com/colbywhite/timbrel">timbrel</a>, a
            simple tool to issue vagrant commands based on a configured root dir
            of vms
          </li>
          <li>
            <a href="https://github.com/open-austin/harris-county-bookings">
              Harris County Booking Data Gathering
            </a>
            , an Open Austin serverless project that accumulates the booking
            information published in Harris County’s daily JIMS 1058 reports
            into a search-friendly format. The intent is to aide non-profit
            organizations looking to do data research across time spans greater
            than a day
          </li>
        </ul>
      </section>
      <section>
        <h2>R&eacute;sum&eacute;</h2>
        You can find more detailed info on{" "}
        <a href="https://www.linkedin.com/colbywhite">LinkedIn</a>, via my{" "}
        <Link to="/resume">web r&eacute;sum&eacute;</Link> or via my{" "}
        <Link to="/resume.pdf">PDF r&eacute;sum&eacute;</Link>.
      </section>
    </main>
  );
}
