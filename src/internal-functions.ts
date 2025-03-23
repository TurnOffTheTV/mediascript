/**
 * @file Functions the library uses that are not to be exported.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSDrawingSize, MSIntColor} from "./types";

/**
 * Generates a new, random, MediaShout-compliant id.
 * Ids are in hex, arranged like this: 
 * `xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx`.
 * @returns {string} The generated id.
 */
export function generateNewId(): string{
	let idString = "";

	//First group of characters
	for(let i=0;i<8;i++){
		idString+=Math.floor(Math.random()*16).toString(16);
	}

	//Second group of characters
	idString+="-";
	for(let i=0;i<4;i++){
		idString+=Math.floor(Math.random()*16).toString(16);
	}

	//Third group of characters
	idString+="-";
	for(let i=0;i<4;i++){
		idString+=Math.floor(Math.random()*16).toString(16);
	}

	//Fourth group of characters
	idString+="-";
	for(let i=0;i<12;i++){
		idString+=Math.floor(Math.random()*16).toString(16);
	}

	return idString;
}

/**
 * Convert an `MSIntColor` to an int (LE).
 * @param {MSIntColor} color The `MSIntColor` to convert.
 * @returns {number} An int representing the color.
 */
export function colorToInt(color: MSIntColor): number{
	return color.r | (color.g << 8) | (color.b << 16) | (color.a << 24);
}

/**
 * Convert an int (LE) to an `MSIntColor`.
 * @param {number} int The int to convert.
 * @returns {MSIntColor} An `MSIntColor` representing the color.
 */
export function intToColor(int: number): MSIntColor{
	return {
		r:0,
		g:0,
		b:0,
		a:1
	}
}

/**
 * Convert an `MSDrawingSize` to a string.
 * @param {MSDrawingSize} size The `MSDrawingSize` to convert.
 * @returns {string} A string representing the drawing size.
 */
export function drawingSizeToString(size: MSDrawingSize): string{
	return size.width+", "+size.height
}

/**
 * Convert a string to an `MSDrawingSize`.
 * @param {string} string The string to convert.
 * @returns {MSDrawingSize} An `MSDrawingSize` representing the drawing size.
 */
export function stringToDrawingSize(string: string): MSDrawingSize{
	return {
		width: +string.split(", ")[0],
		height: +string.split(", ")[1]
	}
}