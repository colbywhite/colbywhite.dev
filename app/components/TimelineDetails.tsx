import type { ComponentProps, ReactNode } from "react";
import DateRange from "~/components/resume.sections/DateRange";
import Details from "~/components/Details";

export default function TimelineDetails<T>({
  children,
  items,
  title,
  getDates,
  open,
}: {
  items: T[];
  title: string;
  children(item: T): ReactNode;
  getDates: (item: T) => ComponentProps<typeof DateRange>;
  open?: boolean;
}) {
  return (
    <Details title={title} open={open}>
      <ol className="relative flex list-none flex-col pl-0 before:absolute before:bottom-0 before:left-2 before:top-1.5 before:block before:w-[1px] before:bg-sharp-fade before:from-base-100 before:to-accent before:content-[''] print:before:content-none">
        {items.map((item, i) => {
          const dateRangeProps = getDates(item);
          return (
            <li
              key={i}
              className="relative mb-2 mt-0 pl-8 font-sans before:absolute before:left-0 before:top-1.5 before:h-4 before:w-4 before:rounded-full before:bg-accent before:content-[''] print:pl-0 print:before:content-none"
            >
              <article className="mt-0 flex flex-col">
                <p className="prose-sm mb-0.5 mt-0 font-light uppercase tracking-widest text-primary md:mb-1">
                  <DateRange {...dateRangeProps} />
                </p>
                {children(item)}
              </article>
            </li>
          );
        })}
      </ol>
    </Details>
  );
}
