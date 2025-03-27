/**
 * @file Main functions exported from library.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSScript} from "./script/Script"
import * as fs from "node:fs"
import * as JSZip from "jszip"

/**
 * Turns an sc7x file into an `MSScript`.
 * @param {Blob} scriptBlob sc7x `Blob` to be turned into an `MSScript`.
 * @returns {Promise<MSScript>} Promise that resolves with the `MSScript` from the `Blob`.
 */
export async function blobToScript(scriptBlob: Blob): Promise<MSScript>{
	//Get all the different buffer formats.
	let scriptBuffer = await scriptBlob.arrayBuffer();
	let scriptBytes = new DataView(scriptBuffer);

	//Get asset ZIP file.
	let zipBuffer = scriptBuffer.slice(scriptBytes.getUint32(12,true),scriptBytes.getUint32(12,true)+scriptBytes.getUint32(16,true));
	const zip = new JSZip();
	await zip.loadAsync(zipBuffer);

	//Setup script
	let rawScript = JSON.parse(await zip.file("scriptModel.json").async("string"));
	let script = new MSScript(rawScript);

	//Set thumbnail
	script.thumbnail=scriptBuffer.slice(scriptBytes.getUint32(4,true),scriptBytes.getUint32(4,true)+scriptBytes.getUint32(8,true));

	return script;
}

/**
 * Turns an `MSScript` into an sc7x file.
 * @param {MSScript} script `MSScript` to be turned into an sc7x `Blob`.
 * @returns {Promise<Blob>} Promise that resolves with the `Blob` from the `MSScript`.
 */
export async function scriptToBlob(script: MSScript): Promise<Blob>{
	//Create file header.
	let headerBytes = new DataView(new ArrayBuffer(20));
	headerBytes.setUint8(0,115);//s
	headerBytes.setUint8(1,99); //c
	headerBytes.setUint8(2,55); //7
	headerBytes.setUint8(3,120);//x
	headerBytes.setUint32(4,20,true);
	headerBytes.setUint32(8,script.thumbnail.byteLength,true);
	headerBytes.setUint32(12,script.thumbnail.byteLength+21,true);

	//Create asset zip file.
	const zip = new JSZip();
	zip.file("scriptModel.json",JSON.stringify(script,null,2));
	const zipBuffer = await zip.generateAsync({type:"arraybuffer",compression:"DEFLATE",compressionOptions:{level:9}});
	headerBytes.setUint32(16,zipBuffer.byteLength,true);

	return new Blob([headerBytes,script.thumbnail,new ArrayBuffer(1),zipBuffer]);
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