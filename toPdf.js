const puppeteer = require('puppeteer')
const fs = require('fs')

async function createPDF(page, path, output_filepath) {
	await page.goto(`http://localhost:8080/${path}`, { waitUntil: ['domcontentloaded', 'load', 'networkidle0', 'networkidle2'] })
	await page.pdf({
		path: output_filepath,
		landscape: false,
		displayHeaderFooter: false,
		format: 'a4'
	})
	console.log('Saved', path, 'to', output_filepath)
}

(async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await createPDF(page, '/', 'src/resume.pdf')
	const promises = fs.readdirSync('./src/covers')
		.filter(c => c.endsWith('.md'))
		.map(cover => ({
			path: `covers/${cover.replace(/\.md$/, '')}`,
			output: `src/covers/${cover.replace(/\.md$/, '.pdf')}`
		}))
		.map(({path, output}) => createPDF(page, path, output))
	await Promise.all(promises)

	await browser.close()
})()
