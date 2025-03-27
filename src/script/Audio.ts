/**
 * @file Class definitions relating to audio player functionality.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSObject} from "./Object"
import {MSRawAudioPlayerModel} from "../raw"

export class MSAudioPlayer extends MSObject {
	/** Properties of the audio player. */
	properties: {} = {};

	/** `AudioPlayLists` (use unknown) */
	audioPlayLists: Array<any> = [];

	constructor(json?: MSRawAudioPlayerModel){
		super();

		if(json?.TypeId==="AudioPlayerModel"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
		}

	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "AudioPlayerModel",
			Properties: {},
			AudioPlayLists: this.audioPlayLists
		}
	}
}