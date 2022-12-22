import type { ComponentProps, ReactNode } from "react";
import DateRange from "~/components/resume.sections/DateRange";

export default function TimelineSection<T>({
  children,
  items,
  title,
  getDates,
}: {
  items: T[];
  title: string;
  children(item: T): ReactNode;
  getDates: (item: T) => ComponentProps<typeof DateRange>;
}) {
  return (
    <section className="">
      <h1>{title}</h1>
      <ol className="relative flex list-none flex-col pl-0 before:absolute before:top-1.5 before:left-2 before:bottom-0 before:block before:w-[1px] before:bg-sharp-fade before:from-secondary-50 before:to-primary-700 before:content-[''] print:before:content-none">
        {items.map((item, i) => {
          const dateRangeProps = getDates(item);
          return (
            <li
              key={i}
              className="relative mt-0 mb-2 pl-8 font-sans before:absolute before:top-1.5 before:left-0 before:h-4 before:w-4 before:rounded-full before:bg-primary-700 before:content-[''] print:break-inside-avoid-page print:pl-0 print:before:content-none"
            >
              <article className="flex flex-col">
                <p className="prose-sm mb-0.5 mt-0 font-light uppercase tracking-widest text-primary-700 md:mb-1">
                  <DateRange {...dateRangeProps} />
                </p>
                {children(item)}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
