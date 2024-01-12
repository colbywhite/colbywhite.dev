import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";
import IconDescriptionList from "~/components/resume.sections/IconDescriptionList";

export const links: LinksFunction = () => {
  return [{ rel: "prefetch", href: "avatar.jpg" }];
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
    )
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
    )
  }
];

export default function Index() {
  return (
    <main className="prose">
      <section>
        <img
          className="float-right mb-3 ml-3 h-[124px] w-[100px] rounded-full border-4 border-primary md:h-[186px] md:w-[150px]"
          alt="Colby M. White's headshot"
          src="/avatar.jpg"
        />
        <h1>About me</h1>
        <p>
          I've been a professional software engineer since 2010, working across
          the stack and focusing on technical leadership. I'm currently a project-lead working with the <a
          href="https://redwoodjs.com/">RedwoodJS</a> core team on a <a
          href="https://github.com/colbywhite/rw-form-generator">AutoForm project</a>.
        </p>
        <p>
          If you're looking for help completed a web-based project for you business,
          contact via this <a href="https://forms.gle/enucYH3qFG4dhCqj6">inquiry form</a>.
        </p>
        <h3>Loose notes</h3>
        <ul>
          <li>
            I'm a regular at various Austin tech meetups and occasionally{" "}
            <Link to="/writings">blog</Link>.
          </li>
          <li>
            I own two degrees from the University of Texas at Austin in Computer Science (2012) and
            Journalism (2010) and am pursuing a third in Kinesiology.
          </li>
          <li>
            Formerly worked at Fractal, Blackbaud, Spanning, CA Technologies, and
            other companies through contract work.
          </li>
        </ul>
      </section>
      <section>
        <details className="mt-8 mb-4">
          <summary className="font-bold text-2xl text-[--tw-prose-headings]">
            Current Projects
          </summary>
          <ul>
            <li>
              <a href="https://github.com/colbywhite/rw-form-generator">AutoForm</a>, a
              work-in-progress component designed to automatically generate a form element based on a given schema. The
              project is designed to work inside the <a
              href="https://redwoodjs.com/">RedwoodJS</a> ecosystem and is being built in conjunction with the core
              team.
            </li>
            <li>
              <a href="https://github.com/colbywhite/ghin/">Humble Tee Box</a>, a
              work-in-progress project to help golfers find a nearby tee box that suites their skill-set.
            </li>
            <li>
              <a href="https://powerschedules.net">Power Schedules</a>, a
              work-in-progress project to highlight which sporting events are
              worth viewing
            </li>
            <li>
              this site, which includes a <Link to="/writings">blog</Link> and an
              archive of my <Link to="/readings">interesting reads</Link>.
            </li>
          </ul>
        </details>
      </section>
      <section>
        <details className="mt-8 mb-4">
          <summary className="font-bold text-2xl text-[--tw-prose-headings]">
            Past Projects
          </summary>
          <ul>
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
        </details>
      </section>
      <section>
        <h2>R&eacute;sum&eacute;</h2>
        You can find more detailed info on{" "}
        <a href="https://www.linkedin.com/colbywhite">LinkedIn</a>, via my{" "}
        <Link to="/resume">web r&eacute;sum&eacute;</Link> or via my{" "}
        <a href="/resume.pdf">PDF r&eacute;sum&eacute;</a>.
      </section>
      <section>
        <h2>Links</h2>
        <IconDescriptionList items={socialLinks} />
      </section>
    </main>
  );
}
