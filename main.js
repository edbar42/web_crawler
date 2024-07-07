import { argv } from "node:process"
import { crawlPage } from "./crawl.js"

function main() {
	// NOTE: arguments are [/bin/node, main, baseURL]
	if (argv.length != 3) {
		throw new Error("Invalid number of arguments")
	} else {
		crawlPage(argv[2])
	}
}

main()
