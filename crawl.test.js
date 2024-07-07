import { JSDOM } from 'jsdom'
import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "./crawl.js"

describe('normalizeURL function', () => {
	const testCases = [
		// Basic cases
		'https://blog.boot.dev/path/',
		'https://blog.boot.dev/path',
		'http://blog.boot.dev/path/',
		'http://blog.boot.dev/path',
	]

	testCases.forEach((url) => {
		test(`Should normalize ${url} to blog.boot.dev/path`, () => {
			expect(normalizeURL(url)).toBe('blog.boot.dev/path')
		})
	})

	// URL with only protocol and domain
	test('Should normalize https://blog.boot.dev/ to blog.boot.dev', () => {
		expect(normalizeURL('https://blog.boot.dev/')).toBe('blog.boot.dev')
	})

	test('Should normalize https://blog.boot.dev to blog.boot.dev', () => {
		expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev')
	})
})

describe('getURLsFromHTML function', () => {

	test('should add baseURL to relative links', () => {
		const htmlBody = `
      <html>
      <body>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="https://example.com">External link</a>
      </body>
      </html>
    `;
		const baseURL = 'http://www.example.com';

		const expectedURLs = [
			'http://www.example.com/about',
			'http://www.example.com/contact',
			'https://example.com'
		];

		const dom = new JSDOM(htmlBody);
		const actualURLs = getURLsFromHTML(dom.serialize(), baseURL);

		expect(actualURLs.length).toBe(3);
		expect(actualURLs).toEqual(expect.arrayContaining(expectedURLs));
	});

	test('should handle absolute links without modification', () => {
		const htmlBody = `
      <html>
      <body>
        <a href="/about">About</a>
        <a href="https://example.com">External link</a>
      </body>
      </html>
    `;
		const baseURL = 'http://www.example.com';

		const expectedURLs = [
			'http://www.example.com/about',
			'https://example.com'
		];

		const dom = new JSDOM(htmlBody);
		const actualURLs = getURLsFromHTML(dom.serialize(), baseURL);

		expect(actualURLs.length).toBe(2);
		expect(actualURLs).toEqual(expect.arrayContaining(expectedURLs));
	});

	test('should return an empty array for no links', () => {
		const htmlBody = `
      <html>
      <body>
        <p>No links in this HTML content</p>
      </body>
      </html>
    `;
		const baseURL = 'http://www.example.com';

		const dom = new JSDOM(htmlBody);
		const actualURLs = getURLsFromHTML(dom.serialize(), baseURL);

		expect(actualURLs.length).toBe(0);
	});

});
