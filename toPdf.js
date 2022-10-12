const puppeteer = require('puppeteer')
const fs = require('fs')

async function createPDF(path, output_filepath) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(`http://localhost:8080/${path}`, { waitUntil: ['domcontentloaded', 'load', 'networkidle0', 'networkidle2'] })
		.catch(e => console.error(e))
	await page.pdf({
		path: output_filepath,
		landscape: false,
		displayHeaderFooter: false,
		format: 'a4'
	})
	console.log('Saved', path, 'to', output_filepath)
	await browser.close()
}

(async () => {
	await createPDF('/', 'src/resume.pdf')
	const promises = fs.readdirSync('./src/covers')
		.filter(c => c.endsWith('.md'))
		.map(cover => ({
			path: `covers/${cover.replace(/\.md$/, '')}`,
			output: `src/covers/${cover.replace(/\.md$/, '.pdf')}`
		}))
		.map(({path, output}) => createPDF(path, output))
	await Promise.all(promises)
})()
