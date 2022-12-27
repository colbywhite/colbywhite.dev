import GrayscaleLink from "~/components/GrayscaleLink";

export default function CreditRow({
  credits,
}: {
  credits: Record<string, { url: string; iconUrl: string }>;
}) {
  const entries = Object.entries(credits);
  if (entries.length <= 0) {
    return <></>;
  }

  return (
    <ul className="disc-none flex flex-row justify-between gap-2 font-bold">
      {entries.map(([name, { url, iconUrl }]) => {
        return (
          <li key={name}>
            <GrayscaleLink href={url} target="_blank">
              <img className="my-1.5 h-4 w-4" src={iconUrl} alt={name} />
            </GrayscaleLink>
          </li>
        );
      })}
    </ul>
  );
}
