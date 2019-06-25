import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

/**
 *
 *
 * @export
 * @param {*} tokens
 * @param {*} format
 */
export function writeTokens(tokens, format) {
	if (tokens && tokens !== undefined) {
		if (tokens.length > 0) {
			tokens.forEach(token => {
				let tokenName = camelize(token.name);
				tokenName = formatName(tokenName);

				const processedToken = processTokens(token, tokenName);

				writeFile(processedToken, 'tokens', tokenName, true, format);
			});
		} else {
			throw new Error('Less than one token provided to writeTokens()!');
		}
	} else {
		throw new Error('Tokens in writeTokens() are either non-existing or undefined!');
	}
}
