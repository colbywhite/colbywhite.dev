import type { ReactNode } from "react";

export default function DescriptionListSection<T>({
  title,
  items,
  term,
  details,
}: {
  items: T[];
  title: string;
  term: (item: T) => ReactNode;
  details: (item: T) => ReactNode;
}) {
  return (
    <section>
      <h1>{title}</h1>
      <dl>
        {items.map((item, i) => (
          <div className="print:break-inside-avoid-page" key={i}>
            <dt>{term(item)}</dt>
            <dd>{details(item)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
