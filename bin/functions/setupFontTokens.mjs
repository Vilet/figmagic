import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

/**
 *
 *
 * @export
 * @param {*} frame
 * @returns
 */
export function setupFontTokens(frame) {
	if (frame) {
		let fontObject = {};

		frame.children.forEach(type => {
			let name = camelize(type.name);
			name = formatName(name);
			const font = type.style.fontPostScriptName;

			fontObject[name] = font;
		});

		return fontObject;
	} else {
		throw new Error('No frame for setupFontTokens()!');
	}
}
