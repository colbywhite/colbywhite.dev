import WorkPlaceComponent from "~/components/resume.sections/WorkPlaceComponent";
import { type ResumeSchema } from "~/components/resume.sections/resume.type";
import TimelineDetails from "~/components/TimelineDetails";

const MONTH_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
};

export default function ProfessionalExperienceDetails({
  resume,
}: {
  resume: ResumeSchema;
}) {
  const workEntryToDateRange = (workEntry: ResumeSchema["work"][number]) => ({
    start: workEntry.startDate,
    end: workEntry.endDate,
    displayFormat: MONTH_DISPLAY_FORMAT,
  });
  return (
    <>
      <TimelineDetails
        title="Professional Experience"
        items={resume.work}
        getDates={workEntryToDateRange}
      >
        {(workEntry) => <WorkPlaceComponent workEntry={workEntry} />}
      </TimelineDetails>
    </>
  );
}
