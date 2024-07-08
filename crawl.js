import { urlToHttpOptions } from "node:url"
import { JSDOM } from "jsdom"

async function crawlPage(baseURL, currURL = baseURL, pages = {}) {
	let currURLObj = new URL(currURL)
	let baseURLObj = new URL(baseURL)

	if (baseURLObj.origin != currURLObj.origin) {
		return pages
	}

	const normalizedURL = normalizeURL(currURL)

	if (pages[normalizedURL] > 0) {
		pages[normalizedURL]++
		return pages
	}

	pages[normalizedURL] = 1

	console.log(`Now crawling: ${currURL}`)
	let html = ""
	try {
		html = await fetchHTML(currURL)
	} catch (err) {
		console.log(`Error: ${err.message}`)
		return pages
	}

	const nextURLs = getURLsFromHTML(html, baseURL)
	for (const url of nextURLs) {
		pages = await crawlPage(baseURL, url, pages)
	}

	return pages
}

async function fetchHTML(url) {
	let res
	try {
		res = await fetch(url)
	} catch (err) {
		throw new Error(`Got Network error: ${err.message}`)
	}

	if (res.status > 399) {
		throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
	}

	const contentType = res.headers.get("content-type")
	if (!contentType || !contentType.includes("text/html")) {
		throw new Error(`Got non-HTML response: ${contentType}`)
	}

	return res.text()
}

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
	const atags = dom.window.document.querySelectorAll("a")
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

export { normalizeURL, getURLsFromHTML, crawlPage }
