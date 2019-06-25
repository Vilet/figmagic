/**
 *
 *
 * @export string
 * @param { Array } items - Array of items, such as graphics
 */
export async function createIdString(items) {
	return new Promise((resolve, reject) => {
		let idString = '';

		items.forEach(item => {
			idString += `${item.id},`;
		});

		let fixedIds = idString.replace(/:/g, '%3A');
		if (fixedIds.endsWith(',')) {
			fixedIds = fixedIds.substring(0, fixedIds.length - 1);
		}

		if (fixedIds.length === 0) {
			reject('fixedIds length is 0!');
		} else resolve(fixedIds);
	});
}
