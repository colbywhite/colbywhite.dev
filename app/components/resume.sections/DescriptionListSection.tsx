import { Fragment, ReactNode } from "react";

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
    <section className="print:break-inside-avoid-page">
      <h1>{title}</h1>
      <dl>
        {items.map((item, i) => (
          <Fragment key={i}>
            <dt>{term(item)}</dt>
            <dd>{details(item)}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
