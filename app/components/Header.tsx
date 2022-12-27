import type { HTMLAttributes } from "react";
import classNames from "classnames";
import { Link, useMatches } from "@remix-run/react";

function NavItem({
  name,
  currentPath,
  target,
}: {
  currentPath: string;
  name: string;
  target: string;
}) {
  return currentPath === target ? (
    <li className="font-semibold tracking-wider text-primary-700">{name}</li>
  ) : (
    <li>
      <Link to={target}>{name}</Link>
    </li>
  );
}

export interface NavItemProps {
  path: string;
  name: string;
}

export default function Header({
  className,
  nav = [],
  ...headerProps
}: HTMLAttributes<HTMLElementTagNameMap["header"]> & { nav?: NavItemProps[] }) {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  return (
    <header
      className={classNames("mb-2 border-b-2 pb-2", className)}
      {...headerProps}
    >
      <p className="mx-auto mb-1 text-center font-bold tracking-wider text-primary-700">
        colbywhite.dev
      </p>
      {nav && nav.length > 0 && (
        <nav>
          <ul className="mx-auto flex flex-row justify-center gap-2">
            {nav.map(({ path, name }) => (
              <NavItem
                currentPath={currentRoute.pathname}
                name={name}
                target={path}
              />
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
