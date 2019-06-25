import { units } from '../meta/units.mjs';
import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

/**
 *
 *
 * @export
 * @param {*} frame
 * @returns
 */
export function setupFontSizeTokens(frame) {
	if (frame) {
		let fontSizeObject = {};

		frame.children.forEach(type => {
			let name = camelize(type.name);
			name = formatName(name);
			const fontSize = type.style.fontSize / units.globalRemSize + 'rem'; // TODO: Use a converter function?

			fontSizeObject[name] = fontSize;
		});

		return fontSizeObject;
	} else {
		throw new Error('No frame for setupFontSizeTokens()!');
	}
}
