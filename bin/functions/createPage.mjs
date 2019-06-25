// Use these if you want to create tokens from the local file, else we assume that you want tokens from returned data from a Figma API fetch
// import figmaDocument from './figma/figma.json';
// figmaDocument.document.children

/**
 *
 *
 * @export
 * @param {*} figmaPages
 * @param {*} shortenedName
 * @returns
 */
export async function createPage(figmaPages, shortenedName) {
	if (shortenedName && figmaPages && figmaPages.length > 0) {
		return new Promise((resolve, reject) => {
			const PAGE = figmaPages.filter(page => findShortenedNameMatch(page.name, shortenedName));
			if (PAGE === undefined || PAGE === null) {
				reject('Error in createPage!');
			} else resolve(PAGE[0]);
		});
	} else {
		throw new Error('Missing either pages or shortened page name in createPage()!');
	}
}

/**
 *
 *
 * @export
 * @param {*} originalString
 * @param {*} matchString
 * @returns
 */
export function findShortenedNameMatch(originalString, matchString) {
	if (originalString) {
		if (matchString) {
			return originalString.toLowerCase().replace(' ', '') === matchString;
		} else throw new Error('No "matchString" was provided to findShortenedNameMatch()!');
	} else throw new Error('No "originalString" was provided to findShortenedNameMatch()!');
}
