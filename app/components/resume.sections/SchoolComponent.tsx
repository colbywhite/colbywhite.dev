import type { Resume } from "./resume.type";

export default function SchoolComponent({
  school,
}: {
  school: Resume["education"][number];
}) {
  return (
    <>
      <h2 className="m-0 font-normal">
        {school.area}
        &nbsp; <span aria-hidden="true">&middot;</span> &nbsp;
        {school.studyType}
      </h2>
      <h3 className="font-normal">
        {school.url ? (
          <a
            className="prose-lg font-normal"
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
