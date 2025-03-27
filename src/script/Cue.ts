/**
 * @file `MSCue` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {colorToInt, intToColor} from "../internal-functions";
import {MSRawAppliedTemplateModel, MSRawCue} from "../raw";
import {MSCueTypeEnum,MSIntColor,MSScheduledPlaybackTypeEnum,MSSplittingOptionsTypeEnum} from "../types";
import {MSKeyObjectsPage} from "./KeyObjects"
import {MSVisualItem, MSVisualItemClock, MSVisualItemImage, MSVisualItemStageData, MSVisualItemText, MSVisualItemTimer, MSVisualItemVideo} from "./Item";
import {MSObject,MSObjectProperties} from "./Object";
import {MSPage} from "./Page"

/** Represents the properties of an `MSCue`. */
class MSCueProperties extends MSObjectProperties {
	/** The cue's name. */
	name: string = "New cue";
	/** The main display background color. */
	mainBackground: MSIntColor = {r:0,g:0,b:0,a:255};
	/** The stage display background color. */
	stageBackground: MSIntColor = {r:0,g:0,b:0,a:255};
	/** Cue comment in sidebar. */
	comment: string = "";
	/** If cue is expanded in sidebar. */
	expanded: boolean = true;
	/** The date this cue was last updated. */
	lastUpdated: Date = new Date();
	/** The cue's type. */
	type: MSCueTypeEnum = "blank";
	/** The next cue. */
	nextCue: MSCue | false = false;
	/** If cue is skipped. */
	skipped: boolean = false;
	/** If main display is mirrored on stage display for this cue. */
	mirrorMain: boolean = false;
	/** `SplittingOptionsType` (use unknown) */
	splittingOptions: MSSplittingOptionsTypeEnum = 0;
	/** JSON source for lyric and bible cues. */
	source: string = "";
	/** Parsed JSON for lyric and bible cues. */
	content: MSContent = new MSContent();
	/** Type of scheduled playback. */
	scheduledPlaybackType: MSScheduledPlaybackTypeEnum = -1;
	/** Date/time to play this cue. */
	scheduledPlaybackTime: Date = new Date(0);
	/** `AdditionalInfo` (use unknown) (in bible cue this contains the translation) */
	additionalInfo: null | string = "";
	/** `WasWrapped` (use unknown) */
	wasWrapped: boolean = false;

	toJSON(){
		let type: number;
		switch(this.type){
			case "blank":
				type=0;
			break;
			case "lyric":
				type=1;
			break;
			case "bible":
				type=2;
			break;
			case "text":
				type=3;
			break;
			case "comment":
				type=4;
			break;
		}
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
				$value: type
			},
			NextCueId: this.nextCue?this.nextCue.id:"",
			IsSkipped: this.skipped,
			IsMirrorMainOnStage: this.mirrorMain,
			SplittingOptionsType: {
				$type: "polino.model.Enums.SplittingOptionsType, polino.model",
				$value: this.splittingOptions
			},
			Source: this.source,
			Content: this.content,
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

	/** Template used on the main display. */
	mainTemplate: MSTemplate | null = null;
	/** Template used on the stage display. */
	stageTemplate: MSTemplate | null = null;
	/** Visual item used for stage background, usually an image or video. */
	mainBackgroundItem: MSVisualItem | null = null;
	/** Visual item used for stage background, usually an image or video. */
	stageBackgroundItem: MSVisualItem | null = null;
	/** `BackgroundAudioItem` (use unknown) */
	backgroundAudioItem: null;
	/** Data for Key Objects in this cue. */
	keyObjectData: MSKeyObjectsPage = new MSKeyObjectsPage();

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
			switch(json.Properties.Type.$value){
				case 0:
					this.properties.type="blank";
				break;
				case 1:
					this.properties.type="lyric";
				break;
				case 2:
					this.properties.type="bible";
				break;
				case 3:
					this.properties.type="text";
				break;
				case 4:
					this.properties.type="comment";
				break;
			}
			this.properties.skipped=json.Properties.IsSkipped;
			this.properties.mirrorMain=json.Properties.IsMirrorMainOnStage;
			this.properties.splittingOptions=json.Properties.SplittingOptionsType.$value;
			this.properties.source=json.Properties.Source;
			switch(this.properties.type){
				case "lyric":
					this.properties.content=new MSContentLyric(json.Properties.Content);
				break;
				case "bible":
					this.properties.content=new MSContentBible(json.Properties.Content);
				break;
				default:
					this.properties.content=new MSContent();
				break;

			}
			this.properties.scheduledPlaybackType=json.Properties.ScheduledPlaybackType.$value;
			this.properties.scheduledPlaybackTime=new Date(json.Properties.ScheduledPlaybackTime.$value);
			this.properties.additionalInfo=json.Properties.AdditionalInfo;
			this.properties.wasWrapped=json.Properties.WasWrapped;

			//Set up pages
			for(let i=0;i<json.Pages.length;i++){
				this.pages.push(new MSPage(json.Pages[i]));
			}

			//Set other properties
			if(json.MainAppliedTemplate===null){
				this.mainTemplate=null;
			}else{
				this.mainTemplate=new MSTemplate(json.MainAppliedTemplate);
			}
			if(json.StageAppliedTemplate===null){
				this.stageTemplate=null;
			}else{
				this.stageTemplate=new MSTemplate(json.StageAppliedTemplate);
			}

			if(json.MainBackgroundItem){
				switch(json.MainBackgroundItem.TypeId){
					case "VisualItem+Text":
						this.mainBackgroundItem=new MSVisualItemText(json.MainBackgroundItem);
					break;
					case "VisualItem+Image":
						this.mainBackgroundItem=new MSVisualItemImage(json.MainBackgroundItem)
					break;
					case "VisualItem+Video":
						this.mainBackgroundItem=new MSVisualItemVideo(json.MainBackgroundItem);
					break;
					case "VisualItem+Clock":
						this.mainBackgroundItem=new MSVisualItemClock(json.MainBackgroundItem);
					break;
					case "VisualItem+Timer":
						this.mainBackgroundItem=new MSVisualItemTimer(json.MainBackgroundItem);
					break;
					case "VisualItem+StageDataText":
						this.mainBackgroundItem=new MSVisualItemStageData(json.MainBackgroundItem);
					break;
				}
			}else{
				this.mainBackgroundItem=null;
			}

			if(json.StageBackgroundItem){
				switch(json.StageBackgroundItem.TypeId){
					case "VisualItem+Text":
						this.stageBackgroundItem=new MSVisualItemText(json.StageBackgroundItem);
					break;
					case "VisualItem+Image":
						this.stageBackgroundItem=new MSVisualItemImage(json.StageBackgroundItem)
					break;
					case "VisualItem+Video":
						this.stageBackgroundItem=new MSVisualItemVideo(json.StageBackgroundItem);
					break;
					case "VisualItem+Clock":
						this.stageBackgroundItem=new MSVisualItemClock(json.StageBackgroundItem);
					break;
					case "VisualItem+Timer":
						this.stageBackgroundItem=new MSVisualItemTimer(json.StageBackgroundItem);
					break;
					case "VisualItem+StageDataText":
						this.stageBackgroundItem=new MSVisualItemStageData(json.StageBackgroundItem);
					break;
				}
			}else{
				this.stageBackgroundItem=null;
			}

			this.backgroundAudioItem = null;
			this.keyObjectData = new MSKeyObjectsPage(json.KeyDataObjectsPage);
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

/** Represents a MediaShout template. */
export class MSTemplate extends MSObject {
	/** The template's name. */
	name: string = "Template";

	/**
	 * @param {MSRawCue} [json] The template's raw parsed JSON object. 
	 */
	constructor(json: MSRawAppliedTemplateModel){
		super();

		if(json && json.TypeId==="AppliedTemplateModel"){
			this.id=json.Id;
			this.version=json.Version;
			this.name=json.Name;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "AppliedTemplateModel",
			Properties: {},
			Name: this.name
		}
	}
}

/** Base class for `Content` property classes. */
class MSContent {
	toJSON(){
		return {
			$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",
			$value: {}
		}
	}
}

/** Represents the `Content` property for lyric cues. */
class MSContentLyric extends MSContent {
	/** Information about the stanzas in the lyric. */
	stanzas: Array<{
		/** Name of the stanza. (i.e. Verse 1, Chorus 2) */
		name:string,
		/** The text content of the stanza. Since this is Windows, line endings are `\r\n` and page breaks are `\n`. */
		content:string
	}> = [];

	/**
	 * @param {{$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",$value:any}} [json] The content's raw parsed JSON object. 
	 */
	constructor(json?: {$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",$value:any}){
		super();

		if(json && json.$type==="System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib"){
			//Set up stanza information.
			for(let i=0;i<Object.keys(json.$value).length;i++){
				this.stanzas.push({name:Object.keys(json.$value)[i],content:<string>Object.values(json.$value)[i]})
			}
		}
	}

	toJSON(){
		let obj = {};

		for(let i=0;i<this.stanzas.length;i++){
			obj[this.stanzas[i].name]=this.stanzas[i].content;
		}

		return {
			$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",
			$value: obj
		}
	}
}

/** Represents the `Content` property for bible cues. */
class MSContentBible extends MSContent {
	/** Bible reference this cue contains. */
	reference: string;
	/** Bible translation used in this cue. */
	translation: string;
	/** The translation for the dual bible. `null` if unused. */
	dualTranslation: string | null;
	/** Abbreviation of the used bible translation. */
	translationAbbreviation: string;
	/** Wether or not dual bible is enabled. */
	dualBible: boolean;
	/** Wether or not verse referencing is enabled. */
	verseReference: boolean;
	/** Wether or not the orientation is vertical. (use unknown) */
	orientationVertical: boolean;

	/**
	 * @param {{$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",$value:any}} [json] The content's raw parsed JSON object. 
	 */
	constructor(json?: {$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",$value:any}){
		super();

		if(json && json.$type==="System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib"){
			this.reference=json.$value.BibleReference;
			this.translation=json.$value.BibleVersion;
			this.dualTranslation=json.$value.DualBibleVersion;
			this.translationAbbreviation=json.$value.BibleAbbreviation;
			this.dualBible=(json.$value.IsDualBibleEnabled==="True");
			this.verseReference=(json.$value.IsVerseReferenceEnabled==="True");
			this.orientationVertical=(json.$value.IsOrientationVertical==="True");
		}
	}

	toJSON(){
		return {
			$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",
			$value: {
				BibleTextItems: "System.Collections.Generic.List`1[polino.wpf.modules.bibles.Model.VerseDTO]",
				BibleReference: this.reference,
				BibleVersion: this.translation,
				DualBibleVersion: this.dualTranslation?this.dualTranslation:"None",
				BibleAbbreviation: this.translationAbbreviation,
				IsDualBibleEnabled: this.dualBible?"True":"False",
				IsVerseReferenceEnabled: this.verseReference?"True":"False",
				IsOrientationVertical: this.orientationVertical?"True":"False",
			}
		}
	}
}