import type { PropsWithChildren } from "react";

export default function Details({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <details className="mb-4 mt-8">
      <summary>
        <h2 className="my-0 inline">{title}</h2>
      </summary>
      {children}
    </details>
  );
}
