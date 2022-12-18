import type { HTMLAttributes } from "react";
import classNames from "classnames";
import { Link } from "@remix-run/react";

export default function Header({
  className,
  ...headerProps
}: HTMLAttributes<HTMLElementTagNameMap["header"]>) {
  return (
    <header
      className={classNames(
        "mx-auto mb-2 w-full border-b-2 border-gray-700 pb-2",
        className
      )}
      {...headerProps}
    >
      <p className="prose prose-2xl mx-auto text-center font-bold">
        colbywhite.dev
      </p>
      <nav>
        <ul className="mx-auto flex flex-row justify-center gap-2 ">
          <li className="prose">
            <Link to="/">Home</Link>
          </li>
          <li className="prose">
            <Link to="/">Bio</Link>
          </li>
          <li className="prose">
            <Link to="/">Bookmarks</Link>
          </li>
          <li className="prose">
            <Link to="/">Articles</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
