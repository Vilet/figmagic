import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

/**
 *
 *
 * @export
 */
export async function downloadImages(images, format, baseFolder) {
	images.forEach(image => {
		const imageName = image.name;
		const imagePath = `${baseFolder}/${imageName}.${format}`;

		download(image.url, imagePath);
	});
}

/**
 *
 *
 * @param {*} imageUrl
 * @param {*} imagePath
 * @returns
 */
async function download(imageUrl, imagePath) {
	const res = await fetch(imageUrl, {
		method: 'GET',
		'X-Figma-Token': process.env.FIGMA_TOKEN
	});

	return new Promise((resolve, reject) => {
		const fileStream = fs.createWriteStream(imagePath);
		res.body.pipe(fileStream);
		res.body.on('error', err => {
			reject(err);
		});
		fileStream.on('finish', () => {
			resolve('Download finished!');
		});
	});
}
