import type { ResumeSchema } from "./resume.type";

export default function WorkPlaceComponent({
  workEntry,
}: {
  workEntry: ResumeSchema["work"][number];
}) {
  return (
    <>
      <h2 className="m-0 font-normal">{workEntry.position}</h2>
      <h3 className="font-normal">
        {workEntry.url ? (
          <a
            className="prose-lg font-normal"
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
      <ul className="flex list-disc flex-col gap-0.5 pl-4">
        {workEntry.highlights.map((highlight, i) => (
          <li key={i} className="m-0">
            {highlight}
          </li>
        ))}
      </ul>
    </>
  );
}
