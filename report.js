import fs from "fs"

function makeReport(pages) {
	const sortedPages = sortPages(pages)
	const reportFilePath = "crawled.csv"
	let reportFileContent = ""
	console.log("-----------------------------")
	console.log("Generating crawling report...")
	console.log("-----------------------------")
	for (let key in sortedPages) {
		console.log(`Found ${sortedPages[key]} internal link(s) to ${key}`)
		reportFileContent += `${key},${sortedPages[key]}\n`
	}
	fs.writeFile(reportFilePath, reportFileContent, (err) => {
		if (err) throw err
		console.log("Crawled links were succesfully written to crawled.csv")
	})
}

function sortPages(pages) {
	let sortedPages = {}
	const keys = Object.keys(pages)
	keys.sort((a, b) => pages[b] - pages[a])
	keys.forEach(key => {
		sortedPages[key] = pages[key]
	})
	return sortedPages
}

export { makeReport }
