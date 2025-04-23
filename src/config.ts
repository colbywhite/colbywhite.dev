export const SITE = {
  website: "https://colbywhite.dev/", // replace this with your deployed domain
  author: "Colby M. White",
  profile: "https://colbywhite.dev/about",
  desc: "Colby M. White's personal site",
  title: "colbywhite.dev",
  lightAndDarkMode: true,
  paging: 7,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showBackButton: true, // show back button in post detail
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Chicago", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
