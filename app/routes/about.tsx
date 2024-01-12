import { Link, useLoaderData } from "@remix-run/react";
import resume from "../resume.json";
import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
import IconDescriptionList from "~/components/resume.sections/IconDescriptionList";
import ProfessionalExperienceDetails from "~/components/ProfessionalExperienceDetails";
import type { ResumeSchema as ResumeType } from "~/components/resume.sections/resume.type";
import { json } from "@remix-run/server-runtime";
import Details from "~/components/Details";

export const links: LinksFunction = () => {
  return [{ rel: "prefetch", href: "avatar.jpg" }];
};

const socialLinks = [
  {
    name: "LinkedIn Logo",
    icon: "linkedin",
    description: (
      <Link
        aria-label="linkedin"
        to="https://www.linkedin.com/in/colbywhite"
        className="link-secondary link"
      >
        colbywhite
      </Link>
    ),
  },
  {
    name: "GitHub Logo",
    icon: "github",
    description: (
      <Link
        aria-label="github"
        to="https://github.com/colbywhite"
        className="link-secondary link"
      >
        colbywhite
      </Link>
    ),
  },
];

export function loader({ request }: LoaderArgs) {
  // TODO pull resume from gist
  const typedResume = resume as ResumeType;
  const isPrint = Boolean(request.headers.get("X-printMode"));
  return json({ resume: typedResume, isPrint });
}

export default function Index() {
  const { resume, isPrint } = useLoaderData<typeof loader>();
  return (
    <main className="prose">
      <section>
        <div className="float-right mx-2 mb-2 flex flex-col items-center gap-1 md:mx-3 md:mb-3">
          <img
            className="h-[124px] w-[100px] rounded-full border-4 border-primary md:h-[186px] md:w-[150px]"
            alt="Colby M. White's headshot"
            src="/avatar.jpg"
          />
          <IconDescriptionList items={socialLinks} />
        </div>
        <h1>About me</h1>
        <ul>
          <li>
            Professional software engineer since 2010 as a true full-stack
            engineer (as opposed to a backend dev who tolerates JS) focusing on
            technical leadership.
          </li>
          <li>
            Worked with 50+ startup CTOs during tenure at Fractal Software as an
            advisor/consultant, helping form teams from scratch. This involved
            more than just code and focused on building the appropriate business
            strategy and engineering culture.
          </li>
          <li>
            Creator of the{" "}
            <i>
              <Link to="https://www.jseverywhere.dev/">JS Everywhere</Link>
            </i>{" "}
            newsletter, chronicling the increasing dominance of full-stack JS
            frameworks and all of its side effects.
          </li>
          <li>
            Working with the RedwoodJS core team as a project lead of the
            <Link
              to="https://redwood-autoform.netlify.app"
              className="text-accent-content"
            >
              <code className="mx-1 rounded bg-accent p-2 font-mono">
                AutoForm
              </code>
            </Link>
            project which aims to simplify HTML form creation in the Redwood
            ecosystem.
          </li>
          <li>
            Owner of two degrees from the University of Texas at Austin in
            Computer Science (2012) and Journalism (2010). Currently pursuing a
            third in Kinesiology.
          </li>
          <li>
            Formerly worked professionally at Fractal, Blackbaud, Spanning, CA
            Technologies, and other companies through contract work.
          </li>
          <li>Regular at various Austin tech meetups.</li>
        </ul>
      </section>
      <section>
        <Details title="Current Projects" open>
          <ul>
            <li>
              <Link
                to="https://redwood-autoform.netlify.app"
                className="text-accent-content"
              >
                <code className="mr-1 rounded bg-accent p-2 font-mono">
                  AutoForm
                </code>
              </Link>
              , a component designed to automatically generate a form element
              based on a given schema. The project is designed to work inside
              the <a href="https://redwoodjs.com">RedwoodJS</a> ecosystem and is
              being built in conjunction with the core team.
            </li>
            <li>
              <Link
                to="https://humbleteebox.com"
                className="text-accent-content"
              >
                <code className="mr-1 rounded bg-accent p-2 font-mono">
                  humbleteebox.com
                </code>
              </Link>
              , a project to help golfers find a nearby tee box that suites
              their skill-set.
            </li>
            <li>
              <Link
                to="https://powerschedules.net"
                className="text-accent-content"
              >
                <code className="mr-1 rounded bg-accent p-2 font-mono">
                  powerschedules.net
                </code>
              </Link>
              , a project that aims to filter sporting events that are actually
              worth viewing
            </li>
            <li>
              <Link to="/" className="text-accent-content">
                <code className="mr-1 rounded bg-accent p-2 font-mono">
                  colbywhite.dev
                </code>
              </Link>
              , which includes a personal <Link to="/writings">blog</Link> and
              an archive of my <Link to="/readings">interesting reads</Link>.
            </li>
          </ul>
        </Details>
      </section>
      <section>
        <Details title="Past/Defunct Projects" open={isPrint}>
          <ul>
            <li>
              <a href="https://github.com/colbywhite/acoustic-stack">
                Acoustic stack
              </a>
              , a minimalist stack for Remix
            </li>
            <li>
              <a href="https://www.npmjs.com/package/@colbyw/tailwind-color-inverter">
                tailwind-color-inverter
              </a>
              , a utility to invert TailwindCSS colors to auto generate colors
              for a dark theme
            </li>
            <li>
              <a href="https://www.npmjs.com/package/aws-cf-monitor">
                aws-cf-monitor
              </a>
              , a wrapper around the AWS CloudFormation Node API that monitors
              the progress of CF commands while providing smart logging.
            </li>
            <li>
              <a href="https://github.com/colbywhite/wordgen">wordgen</a>, a
              Ruby gem command-line tool to generate random words
            </li>
            <li>
              <a href="https://github.com/colbywhite/timbrel">timbrel</a>, a
              simple tool to issue vagrant commands based on a configured root
              dir of vms
            </li>
            <li>
              <a href="https://github.com/open-austin/harris-county-bookings">
                Harris County Booking Data Gathering
              </a>
              , an Open Austin serverless project that accumulates the booking
              information published in Harris County’s daily JIMS 1058 reports
              into a search-friendly format. The intent is to aide non-profit
              organizations looking to do data research across time spans
              greater than a day
            </li>
          </ul>
        </Details>
      </section>
      <section>
        <ProfessionalExperienceDetails resume={resume} open={isPrint} />
      </section>
    </main>
  );
}
