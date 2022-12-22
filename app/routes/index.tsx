import AboutSection from "~/components/resume.sections/AboutSection";
import resume from "../resume.json";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import DescriptionListSection from "~/components/resume.sections/DescriptionListSection";
import TimelineSection from "~/components/resume.sections/TimelineSection";
import type { WorkEntry } from "~/components/resume.sections/WorkPlaceComponent";
import WorkPlaceComponent from "~/components/resume.sections/WorkPlaceComponent";
import type { School } from "~/components/resume.sections/SchoolComponent";
import SchoolComponent from "~/components/resume.sections/SchoolComponent";

export function loader() {
  // TODO pull resume from gist
  return json({ resume });
}

const YEAR_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
};
const MONTH_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
};

export default function Index() {
  const { resume } = useLoaderData<typeof loader>();
  const workEntryToDateRange = (workEntry: WorkEntry) => ({
    start: workEntry.startDate,
    end: workEntry.endDate,
    displayFormat: MONTH_DISPLAY_FORMAT,
  });
  const schoolToDateRange = (school: School) => ({
    start: school.startDate,
    end: school.endDate,
    displayFormat: YEAR_DISPLAY_FORMAT,
  });
  return (
    <main className="flex flex-col gap-2 px-1 md:gap-8 md:px-2">
      <AboutSection info={resume.basics} />
      <TimelineSection
        title="Work Experience"
        items={resume.work}
        getDates={workEntryToDateRange}
      >
        {(workEntry) => <WorkPlaceComponent workEntry={workEntry} />}
      </TimelineSection>
      <TimelineSection
        title="Education"
        items={resume.education}
        getDates={schoolToDateRange}
      >
        {(school) => <SchoolComponent school={school} />}
      </TimelineSection>
      <DescriptionListSection
        items={resume.skills}
        title="Skills"
        term={({ name }) => name}
        details={({ keywords }) => keywords.join(", ")}
      />
      <DescriptionListSection
        items={resume.projects}
        title="Projects"
        term={({ name, url }) => (
          <a className="font-bold" href={url}>
            {name}
          </a>
        )}
        details={({ description }) => description}
      />
    </main>
  );
}
