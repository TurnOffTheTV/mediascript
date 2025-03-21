/**
 * @file Functions the library uses that are not to be exported.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSIntColor} from "./types";

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
 * @param color The `MSIntColor` to convert.
 * @returns An int representing the color.
 */
export function colorToInt(color: MSIntColor): number{
	return color.r | (color.g << 8) | (color.b << 16) | (color.a << 24);
}

export function intToColor(int: number): MSIntColor{
	return {
		r:0,
		g:0,
		b:0,
		a:1
	}
}