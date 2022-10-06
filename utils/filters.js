const { DateTime } = require('luxon')

const dateToFormat = (date, format) => {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	return DateTime.fromJSDate(dateObj, { zone: 'US/Central' }).toFormat(format)
}
module.exports = {
	htmlDateString: (dateObj) => dateToFormat(dateObj, 'LLL d, y'),
	dateToFormat: (dateObj, format) => dateToFormat(dateObj, format),
	dateStringToFormat: (dateStr, format) => dateToFormat(dateStr, format),
	monthString: (dateStr) => dateToFormat(dateStr, 'LLL y'),
	yearString: (dateStr) => dateToFormat(dateStr, 'y'),
	join: (array, joiner) => array.join(joiner)
}
