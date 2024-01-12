import { redirect } from "@remix-run/router";

export function loader() {
  return redirect("/about");
}
