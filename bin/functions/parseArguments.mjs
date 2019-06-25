/**
 * Parse the third process.env argument (first user-specified argument) to select a token format for the exported files
 *
 * @export
 * @param {string} value - The kind of value that is requested, either "mjs" or "js"
 * @returns
 */
export function parseArguments(_args) {
	// Preset options, to at least somewhat decrease risk of mess-ups below
	const options = {
		jsExportFormat: 'mjs',
		gfxExportFormat: 'svg',
		exportGraphics: true
	};

	if (_args && _args.length > 0) {
		let args = [];
		_args.forEach(arg => args.push(arg.toLowerCase()));

		// JS export format
		options.jsExportFormat = (() => {
			if (args.includes('-e') || args.includes('-export')) {
				if (args.includes('js')) {
					return 'js';
				} else {
					return 'mjs';
				}
			} else {
				return 'mjs';
			}
		})();

		// Graphics export format
		options.gfxExportFormat = (() => {
			if (args.includes('-f') || args.includes('-format')) {
				if (args.includes('png')) {
					return 'png';
				} else if (args.includes('jpg')) {
					return 'jpg';
				} else {
					return 'svg';
				}
			} else {
				return 'svg';
			}
		})();

		// Graphics export format
		options.exportGraphics = (() => {
			if (args.includes('-nogfx') || args.includes('-nographics')) {
				return false;
			} else return true;
		})();

		console.log('OPTIONS', options);
	}

	return options;
}
