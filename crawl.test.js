import { test, expect } from "@jest/globals"
import { normalizeURL } from "./crawl.js"

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
		expect(normalizeURL('https://blog.boot.dev/')).toBe('blog.boot.dev');
	});

	test('Should normalize https://blog.boot.dev to blog.boot.dev', () => {
		expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev');
	});
});

// TODO: Add tests to anchor tag extractor function
