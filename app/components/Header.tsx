import type { HTMLAttributes } from "react";
import classNames from "classnames";
import { NavLink } from "@remix-run/react";

export interface NavItemProps {
  path: string;
  name: string;
}

export default function Header({
  className,
  nav = [],
  ...headerProps
}: HTMLAttributes<HTMLElementTagNameMap["header"]> & { nav?: NavItemProps[] }) {
  return (
    <header
      className={classNames("border-b-2 pb-1", className)}
      {...headerProps}
    >
      <p className="mb-2 text-center font-bold tracking-wider text-primary">
        colbywhite.dev
      </p>
      {nav && nav.length > 0 && (
        <nav>
          <ul className="menu menu-horizontal w-full justify-center">
            {nav.map(({ path, name }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-primary-focus" : undefined
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
