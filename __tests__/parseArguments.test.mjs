import { parseArguments } from '../bin/functions/parseArguments.mjs';

test('It should have standard options if value is zero/undefined/not given', () => {
	expect(parseArguments()).toEqual({
		exportGraphics: true,
		gfxExportFormat: 'svg',
		jsExportFormat: 'mjs'
	});
});

test('It should return standard options if value array is epty', () => {
	expect(parseArguments([])).toEqual({
		exportGraphics: true,
		gfxExportFormat: 'svg',
		jsExportFormat: 'mjs'
	});
});

test('It should return standard JavaScript export options if only one parameter is given, such as "js" but not "-f" or "-format', () => {
	expect(parseArguments(['js'])).toEqual({
		exportGraphics: true,
		gfxExportFormat: 'svg',
		jsExportFormat: 'mjs'
	});
});

test('It should return standard graphics export options if only one parameter is given, such as "png" but not "-e" or "-export', () => {
	expect(parseArguments(['png'])).toEqual({
		exportGraphics: true,
		gfxExportFormat: 'svg',
		jsExportFormat: 'mjs'
	});
});

test('It should return standard options if value is invalid', () => {
	expect(parseArguments(['lkjwef'])).toEqual({
		exportGraphics: true,
		gfxExportFormat: 'svg',
		jsExportFormat: 'mjs'
	});
});

test('It should return valid only-lowercase values regardless of incoming parameter casing', () => {
	expect(parseArguments(['JS'])).toEqual({
		exportGraphics: true,
		gfxExportFormat: 'svg',
		jsExportFormat: 'mjs'
	});
});
