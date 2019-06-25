#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import { parseArguments } from './bin/functions/parseArguments.mjs';
import { removeFolder } from './bin/functions/removeFolder.mjs';
import { createFolder } from './bin/functions/createFolder.mjs';
import { getFromApi } from './bin/functions/getFromApi.mjs';
import { createPage } from './bin/functions/createPage.mjs';
import { writeTokens } from './bin/functions/writeTokens.mjs';
import { getImages } from './bin/functions/getImages.mjs';
import { downloadImages } from './bin/functions/downloadImages.mjs';

//import rimraf from 'rimraf';
import dotenv from 'dotenv';
dotenv.config();

// Setup for options
const [, , ...args] = process.argv;
const options = parseArguments(args);

(async () => {
	// Remove old folders
	await removeFolder('./tokens');
	await removeFolder('./figma');

	// Create new folders
	createFolder('tokens');
	createFolder('figma');

	if (options.exportGraphics) {
		// Set up folders
		await removeFolder('./specs');
		createFolder('specs');
		createFolder('specs/graphics/');
	}
})().then(async () => {
	// All of the token-related actions
	const data = await getFromApi();
	const tokens = await createPage(data.document.children, 'designtokens');
	writeTokens(tokens.children, options.jsExportFormat);

	if (options.exportGraphics) {
		// All the stuff needed to get graphics
		const graphics = await createPage(data.document.children, 'graphics');
		await getImages(graphics.children[0].children, options.gfxExportFormat).then(async images => {
			await downloadImages(images, options.gfxExportFormat, 'specs/graphics');
		});
	}
});
