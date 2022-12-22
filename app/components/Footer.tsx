import type { HTMLAttributes } from "react";
import classNames from "classnames";
import CreditRow from "~/components/CreditRow";

export default function Footer({
  className,
  ...footerProps
}: HTMLAttributes<HTMLElementTagNameMap["footer"]>) {
  return (
    <footer
      className={classNames(
        "mt-2 flex flex-row justify-between gap-2 border-t-2 px-1 pt-2",
        className
      )}
      {...footerProps}
    >
      <div>
        <p className="text-center">Built by</p>
        <p className="font-bold">Colby M. White</p>
      </div>
      <div>
        <p className="text-center">Built with</p>
        <CreditRow
          credits={{
            Remix: {
              iconUrl: "/icons/remix.svg",
              url: "https://remix.run",
            },
            Typescript: {
              iconUrl: "/icons/typescript.svg",
              url: "https://typescriptlang.org",
            },
            Vitest: {
              iconUrl: "/icons/vitest.svg",
              url: "https://vitest.dev",
            },
            ESLint: {
              iconUrl: "/icons/eslint.svg",
              url: "https://eslint.org",
            },
            Prettier: {
              iconUrl: "/icons/prettier.svg",
              url: "https://prettier.io",
            },
          }}
        />
      </div>
    </footer>
  );
}
