import AboutSection from "~/components/resume.sections/AboutSection";
import DescriptionListSection from "~/components/resume.sections/DescriptionListSection";
import TimelineSection from "~/components/resume.sections/TimelineSection";
import WorkPlaceComponent from "~/components/resume.sections/WorkPlaceComponent";
import SchoolComponent from "~/components/resume.sections/SchoolComponent";
import type { Resume } from "./resume.type";

const YEAR_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
};
const MONTH_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
};

export default function Resume({ resume }: { resume: Resume }) {
  const workEntryToDateRange = (workEntry: Resume["work"][number]) => ({
    start: workEntry.startDate,
    end: workEntry.endDate,
    displayFormat: MONTH_DISPLAY_FORMAT,
  });
  const schoolToDateRange = (school: Resume["education"][number]) => ({
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
