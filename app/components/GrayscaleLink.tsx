import classnames from "classnames";
import type { HTMLAttributes } from "react";

// TODO figure out why the HTMLAttributes typing isn't working for anchor
export default function GrayscaleLink({
  className,
  children,
  ...anchorProps
}: HTMLAttributes<HTMLElementTagNameMap["a"]> & {
  href: string;
  target: string;
}) {
  return (
    <a
      className={classnames(
        "grayscale transition hover:grayscale-0 focus:grayscale-0",
        className
      )}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
