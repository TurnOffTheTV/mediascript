/**
 * @file Functions the library uses that are not to be exported.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSDrawingRectangle, MSDrawingSize, MSHexColor, MSIntColor} from "./types";

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
		r:int & 0xFF,
		g:(int >> 8) & 0xFF,
		b:(int >> 16) & 0xFF,
		a:(int >> 24) & 0xFF
	}
}

/**
 * Convert an `MSHexColor` to a string.
 * @param {MSHexColor} color The `MSHexColor` to convert.
 * @returns {string} A string representing the color.
 */

function toHex(number: number) {
	const hex = number.toString(16);
	return (hex.length === 1 ? "0" + hex : hex).toUpperCase();
}

export function colorToString(color: MSHexColor): string{
	return "#"+toHex(color.r)+toHex(color.g)+toHex(color.b)+toHex(color.a);
}

/**
 * Convert a string to an `MSHexColor`.
 * @param {string} string The string to convert.
 * @returns {MSHexColor} An `MSHexColor` representing the color.
 */
export function stringToColor(string: string): MSHexColor{
	return {r:parseInt(string.slice(1,3),16), g:parseInt(string.slice(3,5),16), b:parseInt(string.slice(5,7),16), a:parseInt(string.slice(7),16)};
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

/**
 * Convert an `MSDrawingRectangle` to a string.
 * @param {MSDrawingRectangle} rect The `MSDrawingRectangle` to convert.
 * @returns {string} A string representing the drawing rectangle.
 */
export function drawingRectToString(rect: MSDrawingRectangle): string{
	return rect.x+", "+rect.y+", "+rect.width+", "+rect.height
}

/**
 * Convert a string to an `MSDrawingRectangle`.
 * @param {string} string The string to convert.
 * @returns {MSDrawingRectangle} An `MSDrawingRectangle` representing the drawing size.
 */
export function stringToDrawingRect(string: string): MSDrawingRectangle{
	return {
		x: +string.split(", ")[0],
		y: +string.split(", ")[1],
		width: +string.split(", ")[2],
		height: +string.split(", ")[2]
	}
}