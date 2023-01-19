// TODO use json-schema-to-typescript to pull this from https://github.com/jsonresume/resume-schema/blob/master/schema.json
export interface ResumeSchema {
  meta: {
    theme: string;
    updatedAt: string;
  };
  basics: {
    name: string;
    image: string;
    label: string;
    url: string;
    summary: string;
    location: {
      countryCode: string;
      region: string;
      city: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    name: string;
    highlights: string[];
    position: string;
    startDate: string;
    endDate?: string;
    location: string;
    url: string;
  }>;
  volunteer: Array<{
    organization: string;
    position: string;
    url: string;
    startDate: string;
    endDate?: string;
  }>;
  education: Array<{
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    url: string;
    keywords: string[];
  }>;
  awards: [];
  publications: [];
  skills: Array<{
    name: string;
    level: string;
    keywords: string[];
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
  interests: [];
  references: [];
}
