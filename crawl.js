import { urlToHttpOptions } from 'node:url'
import { JSDOM } from 'jsdom'

function normalizeURL(rawURL) {
	let myURL = new URL(rawURL)
	let props = urlToHttpOptions(myURL)
	let fullURL = props.hostname + props.pathname
	if (fullURL[fullURL.length - 1] === "/") {
		return fullURL.slice(0, fullURL.length - 1)
	}
	return fullURL
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody)
	const atags = dom.window.document.querySelectorAll('a')
	const hrefs = []
	for (let link of atags) {
		let href = link.getAttribute("href")
		if (href.startsWith("/")) {
			href = baseURL + href
		}
		hrefs.push(href)
	}
	return hrefs
}

export { normalizeURL, getURLsFromHTML };
