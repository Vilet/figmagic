import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import { createIdString } from './createIdString.mjs';

/**
 *
 *
 * @export
 * @param {*} ids
 * @param {string} [format='svg']
 */
export async function getImages(imageData, format) {
	const figmaUrl = process.env.FIGMA_URL;
	const figmaToken = process.env.FIGMA_TOKEN;
	const ids = await createIdString(imageData);

	const url = `https://api.figma.com/v1/images/${figmaUrl}?ids=${ids}&format=${format}&scale=2`;
	const headers = {
		method: 'GET',
		'X-Figma-Token': figmaToken
	};

	return new Promise((resolve, reject) => {
		fetch(url, { headers })
			.then(result => {
				return result.json();
			})
			.then(res => {
				let images = [];
				Object.entries(res.images).forEach(image => {
					const _name = imageData.filter(item => {
						if (item.id === image[0]) {
							return item.name;
						}
					});
					const name = _name[0].name;

					images.push({
						name,
						nodeId: image[0],
						url: image[1]
					});
				});

				resolve(images);
			})
			.catch(error => {
				console.error('error', error);
				reject(error);
			});
	});
}
