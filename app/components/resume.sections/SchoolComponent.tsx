import type { ResumeSchema } from "./resume.type";

export default function SchoolComponent({
  school,
}: {
  school: ResumeSchema["education"][number];
}) {
  return (
    <>
      <h2 className="m-0">
        {school.area}
        &nbsp; <span aria-hidden="true">&middot;</span> &nbsp;
        {school.studyType}
      </h2>
      <h3>
        {school.url ? (
          <a
            className="link-primary link"
            href={school.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {school.institution}
          </a>
        ) : (
          <span>{school.institution}</span>
        )}
      </h3>
    </>
  );
}
