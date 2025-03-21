/**
 * @file `MSCue` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {colorToInt, intToColor} from "../internal-functions";
import {MSRawCue} from "../raw";
import {MSCueTypeEnum,MSIntColor,MSScheduledPlaybackTypeEnum,MSSplittingOptionsTypeEnum} from "../types";
import {MSObject,MSObjectProperties} from "./MSObject";
import {MSPage} from "./MSPage"

/** Represents the properties of an `MSCue`. */
class MSCueProperties extends MSObjectProperties {
	/** The cue's name. */
	name: string;
	/** The main display background color. */
	mainBackground: MSIntColor;
	/** The stage display background color. */
	stageBackground: MSIntColor;
	/** Cue comment in sidebar. */
	comment: string;
	/** If cue is expanded in sidebar. */
	expanded: boolean;
	/** The date this cue was last updated. */
	lastUpdated: Date;
	/** The cue's type. (use unknown) */
	type: MSCueTypeEnum;
	/** The next cue. */
	nextCue: MSCue | false = false;
	/** If cue is skipped. */
	skipped: boolean;
	/** If main display is mirrored on stage display for this cue. */
	mirrorMain: boolean;
	/** `SplittingOptionsType` (use unknown) */
	splittingOptions: MSSplittingOptionsTypeEnum;
	/** `Source` (use unknown) */
	source: string;
	/** `Content` (use unknown) */
	content: Object;
	/** Type of scheduled playback. (values unknown) */
	scheduledPlaybackType: MSScheduledPlaybackTypeEnum;
	/** Date/time to play this cue. */
	scheduledPlaybackTime: Date;
	/** `AdditionalInfo` (use unknown) */
	additionalInfo: null | string;
	/** `WasWrapped` (use unknown) */
	wasWrapped: boolean;

	toJSON(){
		return {
			Name: this.name,
			MainBackgroundColor: {
				$type: "System.Int32, mscorlib",
				$value: colorToInt(this.mainBackground)
			},
			StageBackgroundColor: {
				$type: "System.Int32, mscorlib",
				$value: colorToInt(this.stageBackground)
			},
			Comment: this.comment,
			IsExpanded: this.expanded,
			LastUpdateTime: {
				$type: "System.DateTime, mscorlib",
				$value: this.lastUpdated.toISOString()
			},
			Type: {
				$type: "polino.model.Enums.CueType, polino.model",
				$value: this.type
			},
			NextCueId: this.nextCue?this.nextCue.id:"",
			IsSkipped: this.skipped,
			IsMirrorMainOnStage: this.mirrorMain,
			SplittingOptionsType: {
				$type: "polino.model.Enums.SplittingOptionsType, polino.model",
				$value: this.splittingOptions
			},
			Source: this.source,
			Content: {
				$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",
				$value: this.content
			},
			ScheduledPlaybackType: {
				$type: "polino.model.Enums.ScheduledPlaybackType, polino.model",
				$value: this.scheduledPlaybackType
			},
			ScheduledPlaybackTime: {
				$type: "System.DateTime, mscorlib",
				$value: this.scheduledPlaybackTime.toISOString()
			},
			AdditionalInfo: this.additionalInfo,
			WasWrapped: this.wasWrapped
		}
	}
}

/** Represents a MediaShout cue. */
export class MSCue extends MSObject {
	/** Properties of the cue. */
	properties: MSCueProperties = new MSCueProperties();;
	/** The cue's pages. */
	pages: Array<MSPage> = [];

	/** Template for the main display. */
	mainTemplate: null;
	/** Template for the stage display. */
	stageTemplate: null;
	/** `MainBackgroundItem` (use unknown) */
	mainBackgroundItem: null;
	/** `StageBackgroundItem` (use unknown) */
	stageBackgroundItem: null;
	/** `BackgroundAudioItem` (use unknown) */
	backgroundAudioItem: null;
	/** Data for Key Objects in this cue. */
	keyObjectData: Object = {};

	/**
	 * @param {MSRawCue} [json] The cue's raw parsed JSON object. 
	 */
	constructor(json?: MSRawCue){
		super();

		if(json && json.TypeId==="Cue"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.mainBackground=intToColor(json.Properties.MainBackgroundColor.$value);
			this.properties.stageBackground=intToColor(json.Properties.StageBackgroundColor.$value);
			this.properties.comment=json.Properties.Comment;
			this.properties.expanded=json.Properties.IsExpanded;
			this.properties.lastUpdated=new Date(json.Properties.LastUpdateTime.$value);
			this.properties.type=json.Properties.Type.$value;
			this.properties.skipped=json.Properties.IsSkipped;
			this.properties.mirrorMain=json.Properties.IsMirrorMainOnStage;
			this.properties.splittingOptions=json.Properties.SplittingOptionsType.$value;
			this.properties.source=json.Properties.Source;
			this.properties.content=json.Properties.Content.$value;
			this.properties.scheduledPlaybackType=json.Properties.ScheduledPlaybackType.$value;
			this.properties.scheduledPlaybackTime=new Date(json.Properties.ScheduledPlaybackTime.$value);
			this.properties.additionalInfo=json.Properties.AdditionalInfo;
			this.properties.wasWrapped=json.Properties.WasWrapped;

		}
	}

	/**
	 * Set a cue as the next cue.
	 * @param {MSCue} cue The cue to set as next.
	 */
	setNextCue(cue: MSCue){
		this.properties.nextCue=cue;
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Cue",
			Properties: this.properties,
			Pages: this.pages,
			MainAppliedTemplate: this.mainTemplate,
			StageAppliedTemplate: this.stageTemplate,
			MainBackgroundItem: this.mainBackgroundItem,
			StageBackgroundItem: this.stageBackgroundItem,
			BackgroundAudioItem: this.backgroundAudioItem,
			KeyDataObjectsPage: this.keyObjectData
		}
	}
}