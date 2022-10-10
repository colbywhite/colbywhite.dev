const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('http://localhost:8080/', { waitUntil: ['domcontentloaded', 'load', 'networkidle0', 'networkidle2'] })
	await page.pdf({
		path: 'src/resume.pdf',
		landscape: false,
		displayHeaderFooter: false,
		format: 'a4'
	})

	await browser.close()
})()
