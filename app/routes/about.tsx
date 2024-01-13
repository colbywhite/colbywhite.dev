import { Link, useLoaderData } from "@remix-run/react";
import resume from "../resume.json";
import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
import IconDescriptionList from "~/components/resume.sections/IconDescriptionList";
import ProfessionalExperienceDetails from "~/components/ProfessionalExperienceDetails";
import type { ResumeSchema as ResumeType } from "~/components/resume.sections/resume.type";
import { json } from "@remix-run/server-runtime";
import Details from "~/components/Details";
import { MapIcon, NewsletterIcon, WebsiteIcon } from "~/components/icons";

export const links: LinksFunction = () => {
  return [{ rel: "prefetch", href: "avatar.jpg" }];
};

const infoIcons = [
  {
    name: "website",
    icon: WebsiteIcon,
    className: "hidden print:flex",
    description: (
      <Link
        aria-label="Colby White's website"
        className="link text-accent-content"
        to="/"
      >
        colbywhite.dev
      </Link>
    ),
  },
  {
    name: "newsletter",
    icon: NewsletterIcon,
    description: (
      <Link
        aria-label="JS Everywhere newsletter"
        className="link text-accent-content"
        to="https://jseverywhere.com"
      >
        <i>JS Everywhere</i>
      </Link>
    ),
  },
  {
    name: "LinkedIn Logo",
    icon: "linkedin",
    description: (
      <Link
        aria-label="linkedin"
        to="https://www.linkedin.com/in/colbywhite"
        className="link text-accent-content"
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
        className="link text-accent-content"
      >
        colbywhite
      </Link>
    ),
  },
  {
    name: "location",
    icon: MapIcon,
    description: <>Austin, TX</>,
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
        <div className="card-compact card float-none mb-4 bg-accent p-4 text-accent-content shadow-xl print:float-left print:mr-8 md:float-left md:mr-8">
          <figure className="m-0">
            <img
              className="h-[186px] w-[150px] rounded-full border-4 border-accent-content"
              alt="Colby M. White's headshot"
              src="/avatar.jpg"
            />
          </figure>
          <div className="card-body items-center p-0">
            <h2 className="card-title mt-4 text-accent-content">
              Colby M. White
            </h2>
            <IconDescriptionList items={infoIcons} />
          </div>
        </div>
        <h1 className="hidden md:block">About Colby M. White</h1>
        <h1 className="hidden print:block">Colby M. White's Resume</h1>
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
              <code className="mx-1 rounded bg-secondary p-2 font-mono text-secondary-content">
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
                <code className="mr-1 rounded bg-secondary p-2 font-mono text-secondary-content">
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
                className="text-secondary-content"
              >
                <code className="mr-1 rounded bg-secondary p-2 font-mono">
                  humbleteebox.com
                </code>
              </Link>
              , a project to help golfers find a nearby tee box that suites
              their skill-set.
            </li>
            <li>
              <Link
                to="https://powerschedules.net"
                className="text-secondary-content"
              >
                <code className="mr-1 rounded bg-secondary p-2 font-mono">
                  powerschedules.net
                </code>
              </Link>
              , a project that aims to filter sporting events that are actually
              worth viewing
            </li>
            <li>
              <Link to="/" className="text-secondary-content">
                <code className="mr-1 rounded bg-secondary p-2 font-mono">
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
