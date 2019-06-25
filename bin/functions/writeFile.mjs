import fs from 'fs';
import { createFolder } from './createFolder.mjs';

/**
 *
 *
 * @export
 * @param {*} file
 * @param {*} path
 * @param {*} name
 * @param {boolean} [isToken=false]
 * @param {*} format
 */
export async function writeFile(file, path, name, isToken = false, format) {
	if (file && path && name) {
		createFolder(path);
		await write(file, path, name, isToken, format);
	} else {
		throw new Error('Missing required parameters to correctly run writeFile()!');
	}
}

/**
 *
 *
 * @param {*} file
 * @param {*} path
 * @param {*} name
 * @param {*} isToken
 * @param {*} format
 * @returns
 */
async function write(file, path, name, isToken, format) {
	let fileContent = file;
	let filePath = `${path}/${name}`;

	if (isToken) {
		fileContent = `const ${name} = ${JSON.stringify(file, null, ' ')}\n\nexport default ${name};`;
		filePath += `.${format}`;
	}

	return new Promise(function(resolve, reject) {
		fs.writeFile(filePath, fileContent, 'utf-8', function(error) {
			if (error) {
				reject('Error in write() > writeFile(): ', error);
				throw new Error('Error in write() > writeFile(): ', error);
			} else resolve(fileContent);
		});
	});
}
