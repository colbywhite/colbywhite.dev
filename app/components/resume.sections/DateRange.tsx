function formatDateString(date: string, format?: Intl.DateTimeFormatOptions) {
  const dateObject = new Date(date);
  if (!isFinite(+dateObject)) {
    return date;
  }
  return new Intl.DateTimeFormat("en-US", format).format(dateObject);
}

const DATE_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

function DateComponent({
  date,
  displayFormat,
}: {
  date: string;
  displayFormat: Intl.DateTimeFormatOptions;
}) {
  return (
    <time dateTime={formatDateString(date, DATE_DISPLAY_FORMAT)}>
      {formatDateString(date, displayFormat)}
    </time>
  );
}

export default function DateRange({
  start,
  end,
  displayFormat,
}: {
  start: string;
  end?: string;
  displayFormat: Intl.DateTimeFormatOptions;
}) {
  return (
    <>
      <DateComponent date={start} displayFormat={displayFormat} />
      &nbsp; &ndash; &nbsp;
      {end ? (
        <DateComponent date={end} displayFormat={displayFormat} />
      ) : (
        "present"
      )}
    </>
  );
}
