const { DateTime } = require('luxon')
const fs = require('fs')
const path = require('path')
const mime = require('mime/lite')

const dateToFormat = (date, format) => {
	const dateObj = typeof date === 'string' ? new Date(date) : date
	return DateTime.fromJSDate(dateObj, { zone: 'US/Central' }).toFormat(format)
}
module.exports = {
	htmlDateString: (dateObj) => dateToFormat(dateObj, 'LLL d, y'),
	dateToFormat: (dateObj, format) => dateToFormat(dateObj, format),
	dateStringToFormat: (dateStr, format) => dateToFormat(dateStr, format),
	monthString: (dateStr) => dateToFormat(dateStr, 'LLL y'),
	yearString: (dateStr) => dateToFormat(dateStr, 'y'),
	join: (array, joiner) => array.join(joiner),
	stripProtocol: str => str.replace(/(^\w+:|^)\/\//, ''),
	base64asset: asset => {
		const filepath = path.join(__dirname, `../src/_assets/${asset}`)
		const mimeType = mime.getType(asset)
		const buffer = Buffer.from(fs.readFileSync(filepath))
		return `data:${mimeType};base64,${buffer.toString('base64')}`
	},
	lowercase: string => string.toLowerCase()
}
