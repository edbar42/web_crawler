function printReport(pages) {
	let sortedPages = {}
	const keys = Object.keys(pages)
	keys.sort((a, b) => pages[b] - pages[a])
	keys.forEach(key => {
		sortedPages[key] = pages[key]
	})
	console.log("-----------------------------")
	console.log("Generating crawling report...")
	console.log("-----------------------------")
	for (let key in sortedPages) {
		console.log(`Found ${sortedPages[key]} internal links to ${key} `)
	}
}

export { printReport }
