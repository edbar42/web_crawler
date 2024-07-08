import { argv } from "node:process"
import { crawlPage } from "./crawl.js"
import { makeReport } from "./report.js"

async function main() {
	// NOTE: arguments are [/bin/node, main, baseURL]
	if (argv.length != 3) {
		throw new Error("Invalid number of arguments")
	}
	const pages = await crawlPage(argv[2])
	makeReport(pages)
}

main()
