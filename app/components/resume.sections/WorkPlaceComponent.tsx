import type { ResumeSchema } from "./resume.type";

export default function WorkPlaceComponent({
  workEntry,
}: {
  workEntry: ResumeSchema["work"][number];
}) {
  return (
    <>
      <h3 className="m-0">{workEntry.position}</h3>
      <h4 className="font-normal">
        {workEntry.url ? (
          <a
            className="link-primary link"
            href={workEntry.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {workEntry.name}
          </a>
        ) : (
          workEntry.name
        )}
        {workEntry.location && (
          <>
            &nbsp;
            <span aria-hidden="true">&middot;</span>
            &nbsp;
            {workEntry.location}
          </>
        )}
      </h4>
      <ul className="">
        {workEntry.highlights.map((highlight, i) => (
          <li key={i} className="m-0">
            {highlight}
          </li>
        ))}
      </ul>
    </>
  );
}
