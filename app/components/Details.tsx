import { forwardRef } from "react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type DetailsProps = PropsWithChildren<
  HTMLAttributes<HTMLDetailsElement> & {
    title: string;
    open?: HTMLDetailsElement["open"];
  }
>;

export const Details = forwardRef<HTMLDetailsElement, DetailsProps>(
  function Details({ title, children, className, ...restProps }, ref) {
    return (
      <details
        ref={ref}
        className={twMerge("mb-4 mt-8", className)}
        {...restProps}
      >
        <summary className="cursor-pointer">
          <h2 className="my-0 inline">{title}</h2>
        </summary>
        {children}
      </details>
    );
  }
);

export default Details;
