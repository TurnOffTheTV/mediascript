/**
 * @file Main functions exported from library.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSScript} from "./script/MSScript"
//import JSZip from "jszip";

/**
 * Turns an sc7x file into an `MSScript`.
 * @param {Blob} scriptBlob sc7x `Blob` to be turned into an `MSScript`.
 * @returns {Promise<MSScript>} Promise that resolves with the `MSScript` from the `Blob`.
 */
export async function blobToScript(scriptBlob: Blob): Promise<MSScript>{
	return new MSScript();
}

/**
 * Turns an `MSScript` into an sc7x file.
 * @param {MSScript} script `MSScript` to be turned into an sc7x `Blob`.
 * @returns {Promise<Blob>} Promise that resolves with the `Blob` from the `MSScript`.
 */
export async function scriptToBlob(script: MSScript): Promise<Blob>{
	return new Blob([]);
}

/**
 * Create a new `MSScript` instance`.
 * @param {string} name The new script's name.
 * @returns {MSScript} The new `MSScript` that was created.
 */
export function createScript(name: string=""): MSScript{
	let newScript = new MSScript();
	newScript.properties.name=name;
	return newScript;
}