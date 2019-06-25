import fs from 'fs-extra';

/**
 *
 *
 * @param {*} folder
 */
export async function removeFolder(folder) {
	try {
		await fs.remove(folder);
	} catch (err) {
		console.error(err);
	}
}
