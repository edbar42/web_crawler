import { urlToHttpOptions } from 'node:url'

function normalizeURL(rawURL) {
	let myURL = new URL(rawURL)
	let props = urlToHttpOptions(myURL)
	let fullURL = props.hostname + props.pathname
	if (fullURL[fullURL.length - 1] === "/") {
		return fullURL.slice(0, fullURL.length - 1)
	}
	return fullURL
}

export { normalizeURL };
