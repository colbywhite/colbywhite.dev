import { Outlet } from "@remix-run/react";

export default function BlogLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
