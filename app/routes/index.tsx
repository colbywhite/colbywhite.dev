import resume from "../resume.json";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import Resume from "~/components/resume.sections/Resume";
import type { Resume as ResumeType } from "~/components/resume.sections/resume.type";

export function loader() {
  // TODO pull resume from gist
  const typedResume = resume as ResumeType;
  return json({ resume: typedResume });
}

export default function Index() {
  const { resume } = useLoaderData<typeof loader>();
  return <Resume resume={resume} />;
}
