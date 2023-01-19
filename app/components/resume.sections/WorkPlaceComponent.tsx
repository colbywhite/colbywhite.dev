import type { ResumeSchema } from "./resume.type";

export default function WorkPlaceComponent({
  workEntry,
}: {
  workEntry: ResumeSchema["work"][number];
}) {
  return (
    <>
      <h2 className="m-0">{workEntry.position}</h2>
      <h3 className="font-normal">
        {workEntry.url ? (
          <a
            className="link-primary link hover:no-underline"
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
      </h3>
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
