import { MapIcon, PDFIcon, WebsiteIcon } from "~/components/icons";
import avatarUrl from "./avatar.png";
import { Link } from "@remix-run/react";
import IconDescriptionList from "~/components/resume.sections/IconDescriptionList";
import type { Item } from "~/components/resume.sections/IconDescriptionList";
import type { ResumeSchema } from "~/components/resume.sections/resume.type";

export default function AboutSection({
  info: { summary, name, location, profiles, url },
}: {
  info: ResumeSchema["basics"];
}) {
  const profileItems: Item[] = profiles.map(({ network, username, url }) => ({
    name: `${network} Logo`,
    icon: network,
    description: (
      <a aria-label={network} href={url} className="link-primary link">
        {username}
      </a>
    ),
  }));
  const items: Item[] = [
    {
      name: "location",
      icon: MapIcon,
      description: (
        <>
          {location.city}, {location.region}
        </>
      ),
    },
    {
      name: "website",
      icon: WebsiteIcon,
      className: "hidden print:flex",
      description: (
        <a
          aria-label="Colby White's website"
          className="link-primary link"
          href={url}
        >
          {new URL(url).host}
        </a>
      ),
    },
    {
      name: "pdf",
      icon: PDFIcon,
      className: "print:hidden",
      description: (
        <Link
          to="/resume"
          className="link-primary link"
          aria-label="Colby White's PDF resume"
          reloadDocument
        >
          r&eacute;sum&eacute;
        </Link>
      ),
    },
    ...profileItems,
  ];
  return (
    <section className="prose">
      <img
        className="float-right ml-3 mb-3 h-[124px] w-[100px] rounded-full border-4 border-primary md:h-[186px] md:w-[150px]"
        alt={name}
        src={avatarUrl}
      />
      <h1>{name}</h1>
      <p>{summary}</p>
      <h2>Links</h2>
      <IconDescriptionList items={items} />
    </section>
  );
}
