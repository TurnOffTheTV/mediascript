/**
 * @file `MSScript` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSAudioPlayer} from "./Audio"
import {MSRawScript} from "../raw";
import {MSCueTypeEnum} from "../types";
import {MSCue} from "./Cue";
import {MSKeyObjectsPage} from "./KeyObjects";
import {MSObject,MSObjectProperties} from "./Object";
import {base64ToArrayBuffer} from "../internal-functions";

/** Represents the properties of an `MSScript`. */
class MSScriptProperties extends MSObjectProperties {
	/** The script's name. This is also used in the filename. */
	name: string = "";
	/** The width of the main display. */
	mainWidth: number = 1920;
	/** The height of the main display. */
	mainHeight: number = 1080;
	/** The width of the stage display. */
	stageWidth: number = 1920;
	/** The height of the stage display. */
	stageHeight: number = 1080;

	toJSON(){
		if(Math.round(this.mainWidth)!==this.mainWidth) throw new Error("mainWidth is not an integer");
		if(Math.round(this.mainHeight)!==this.mainHeight) throw new Error("mainHeight is not an integer");
		if(Math.round(this.stageWidth)!==this.stageWidth) throw new Error("stageWidth is not an integer");
		if(Math.round(this.stageHeight)!==this.stageHeight) throw new Error("stageHeight is not an integer");

		return {
			Name:this.name,
			WorkingAreaWidth: {
				$type: "System.Int32, mscorlib",
				$value: this.mainWidth
			},
			WorkingAreaHeight:{
				$type: "System.Int32, mscorlib",
				$value: this.mainHeight
			},
			StageAreaWidth:{
				$type: "System.Int32, mscorlib",
				$value: this.stageWidth
			},
			StageAreaHeight:{
				$type: "System.Int32, mscorlib",
				$value: this.stageHeight
			}
		}
	}
}

/** Represents a MediaShout script. */
export class MSScript extends MSObject {
	/** Properties of the script. */
	properties: MSScriptProperties = new MSScriptProperties();
	/** The script's cues. */
	cues: Array<MSCue> = [];

	/** Page for key objects. */
	keyObjectsPage: MSKeyObjectsPage = new MSKeyObjectsPage();
	/** `AudioPlayer` (use unknown) */
	audioPlayer: MSAudioPlayer = new MSAudioPlayer();

	/** The MediaShout version this script was created. */
	versionCreated: string = "7.0.0.0";
	/** The last MediaShout version this script was edited in. */
	versionUpdated: string = "7.0.0.0";

	/** The script's thumbnail image data. */
	thumbnail: ArrayBuffer = base64ToArrayBuffer("iVBORw0KGgoAAAANSUhEUgAAAgAAAAEgCAYAAADCPMtRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATDSURBVHhe7dZBDcAwAAOxdPw5b32MxdlSFAp3tr13AEDI8z8AECIAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAORsH38RAz/EUWvnAAAAAElFTkSuQmCC");

	/**
	 * @param {MSRawScript} [json] The script's raw parsed JSON object.
	 */
	constructor(json?: MSRawScript){
		super();

		if(json && json.TypeId==="Script"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			this.versionCreated=json.VersionCreated;
			this.versionUpdated=json.VersionUpdated;

			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.mainWidth=json.Properties.WorkingAreaWidth.$value;
			this.properties.mainHeight=json.Properties.WorkingAreaHeight.$value;
			this.properties.stageWidth=json.Properties.StageAreaWidth.$value;
			this.properties.stageHeight=json.Properties.StageAreaHeight.$value;
		
			//Set up cues
			for(let i=0;i<json.Cues.length;i++){
				this.cues.push(new MSCue(json.Cues[i]));
			}
			for(let i=0;i<this.cues.length;i++){
				if(i<this.cues.length-1) this.cues[i].setNextCue(this.cues[i+1]);
			}

			//Set other properties
			this.keyObjectsPage=new MSKeyObjectsPage(json.KeyObjectsPage);
			this.audioPlayer=new MSAudioPlayer(json.AudioPlayer);
		}
	}

	addCue(type: MSCueTypeEnum="blank"): MSCue{
		let newCue = new MSCue();

		newCue.properties.type=type;

		this.cues.push(newCue);

		return newCue;
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Script",
			Properties: this.properties,
			Cues: this.cues,
			KeyObjectsPage: this.keyObjectsPage,
			AudioPlayer: this.audioPlayer,
			VersionCreated: this.versionCreated,
			VersionUpdated: this.versionUpdated,
			GeneratedBy: "mediascript"
		}
	}
}