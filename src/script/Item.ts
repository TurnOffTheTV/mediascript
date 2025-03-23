/**
 * @file `MSVisualItem` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSEffect,MSEffectBlur,MSEffectCommon,MSEffectContrastBrightnessAdjust,MSEffectFlip,MSEffectGrayscale,MSEffectHueRotate,MSEffectInvertColors,MSEffectOutline,MSEffectSaturationAdjust,MSEffectSepia,MSEffectShadow,MSEffectText,MSEffectVideoCrop,MSEffectVideoPlayTimes} from "./Effect"
import {MSRawVisualItem} from "../raw";
import {MSDrawingSize,MSFastPositioningStateEnum,MSTextItemTypeEnum} from "../types";
import {MSObject,MSObjectProperties} from "./Object"
import {MSVisualItemStoryboard} from "./Transition";
import {drawingSizeToString,stringToDrawingSize} from "../internal-functions";

/** Base visual item properties class. */
class MSVisualItemProperties extends MSObjectProperties {
	/** The video's name. */
	name: string;
	/** The video's x-position. */
	x: number;
	/** The video's y-position. */
	y: number;
	/** The video's width. */
	width: number;
	/** The video's height. */
	height: number;
	/** The video's angle. */
	angle: number;
	/** Wether or not the video is locked. */
	locked: boolean;
	/** Wether or not the video is visible. */
	visible: boolean;
}

/** Base visual item class. */
export class MSVisualItem extends MSObject {
	/** Properties of the visual item. */
	properties: MSVisualItemProperties;
	/** `Storyboard` (use unknown) */
	storyboard: MSVisualItemStoryboard;
	/** Effects for this visual item. */
	effects: Array<MSEffect>
	
	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super();

		if(json && json.TypeId.startsWith("VisualItem")){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;

			//Set up effects
			for(let i=0;i<json.Effects.length;i++){
				switch(json.Effects[i].TypeId){
					case "Effect+CommonEffect":
						this.effects.push(new MSEffectCommon(json.Effects[i]));
					break;
					case "Effect+FlipEffect":
						this.effects.push(new MSEffectFlip(json.Effects[i]));
					break;
					case "Effect+OutlineEffect":
						this.effects.push(new MSEffectOutline(json.Effects[i]));
					break;
					case "Effect+TextEffect":
						this.effects.push(new MSEffectText(json.Effects[i]));
					break;
					case "Effect+ShadowEffect":
						this.effects.push(new MSEffectShadow(json.Effects[i]));
					break;
					case "Effect+SepiaEffect":
						this.effects.push(new MSEffectSepia(json.Effects[i]));
					break;
					case "Effect+GrayscaleEffect":
						this.effects.push(new MSEffectGrayscale(json.Effects[i]));
					break;
					case "Effect+BlurEffect":
						this.effects.push(new MSEffectBlur(json.Effects[i]));
					break;
					case "Effect+InvertColorsEffect":
						this.effects.push(new MSEffectInvertColors(json.Effects[i]));
					break;
					case "Effect+HueRotateEffect":
						this.effects.push(new MSEffectHueRotate(json.Effects[i]));
					break;
					case "Effect+SaturationAdjustEffect":
						this.effects.push(new MSEffectSaturationAdjust(json.Effects[i]));
					break;
					case "Effect+ContrastBrighnessAdjustEffect":
						this.effects.push(new MSEffectContrastBrightnessAdjust(json.Effects[i]));
					break;
					case "Effect+VideoCropEffect":
						this.effects.push(new MSEffectVideoCrop(json.Effects[i]));
					break;
					case "Effect+VideoPlayTimesEffect":
						this.effects.push(new MSEffectVideoPlayTimes(json.Effects[i]));
					break;
				}
			}
		}
	}

	toJSON(){}
}

/** Properties of an `MSVisualItemText` */
class MSVisualItemTextProperties extends MSVisualItemProperties {
	/** The text in the textbox. This is in [rtf format](https://en.wikipedia.org/wiki/Rich_Text_Format). */
	text: string;
	/** The textbox's type. */
	type: MSTextItemTypeEnum;
	/** The textbox's description. */
	description: string;
	/** `LinkedId` (use unknown) */
	linkedId: string;
	/** `LinkedPosition` (use unknown) */
	linkedPosition: number;
	/** `SeparatedPosition` (use unknown) */
	separatedPosition: number;
	/** `Snapshot` (use unknown) */
	snapshot: string;
	/** Wether or not the textbox has a page break. */
	hasPageBreak: boolean;
	/** `HasParagraph` (use unknown) */
	hasParagraph: boolean;
	
	toJSON(){
		return {
			Name: this.name,
			X: this.x,
			Y: this.y,
			Width: this.width,
			Height: this.height,
			Angle: this.angle,
			IsLocked: this.locked,
			IsVisible: this.visible,
			Text: this.text,
			Type: {
				$type: "polino.model.Enums.TextItemType, polino.model",
				$value: this.type
			},
			Description: this.description,
			LinkedId: "t3tfPDVDHka0CXSYc2vsYw==",
			LinkedPosition: {
				$type: "System.Int32, mscorlib",
				$value: this.linkedPosition
			},
			SeparatedPosition: {
				$type: "System.Int32, mscorlib",
				$value: this.separatedPosition
			},
			Snapshot: this.snapshot,
			HasPageBreak: this.hasPageBreak,
			HasParagraph: this.hasParagraph
		}
	}
}

/** Represents a MediaShout textbox. */
export class MSVisualItemText extends MSVisualItem {
	/** Properties of the textbox. */
	properties: MSVisualItemTextProperties;

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Text"){
			//Set properties properties
			this.properties.text=json.Properties.Text;
			this.properties.type=json.Properties.Type.$value;
			this.properties.description=json.Properties.Description;
			this.properties.linkedId=json.Properties.LinkedId;
			this.properties.linkedPosition=json.Properties.LinkedPosition.$value;
			this.properties.separatedPosition=json.Properties.SeparatedPosition.$value;
			this.properties.snapshot=json.Properties.Snapshot;
			this.properties.hasPageBreak=json.Properties.HasPageBreak;
			this.properties.hasParagraph=json.Properties.HasParagraph;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+Video",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemVideo` */
class MSVisualItemVideoProperties extends MSVisualItemProperties {
	/** `Identifier` (use unknown) */
	identifier: string;
	/** Path to the video's source. */
	source: string;
	/** Path to the video's original source. */
	originalSource: string;
	/** `InitialSize` (use unknown) */
	initialSize: MSDrawingSize;
	/** `FastPositioningState` (use unknown) */
	fastPositioningState: MSFastPositioningStateEnum;
	/** Video playback rate multiplier. */
	rate: number;
	/** Video thumbnail source path. */
	thumbnailSource: string;
	/** Video volume, 0-100. */
	volume: number;

	toJSON(){
		return {
			Name: this.name,
			X: this.x,
			Y: this.y,
			Width: this.width,
			Height: this.height,
			Angle: this.angle,
			IsLocked: this.locked,
			IsVisible: this.visible,
			Identifier: this.identifier,
			Source: this.source,
			OriginalSource: this.originalSource,
			InitialSize: {
				$type: "System.Drawing.Size, System.Drawing",
				$value: drawingSizeToString(this.initialSize)
			},
			FastPositioningState: {
				$type: "polino.model.Enums.FastPositioningState, polino.model",
				$value: this.fastPositioningState
			},
			Rate: {
				$type: "System.Single, mscorlib",
				$value: this.rate
			},
			ThumbnailSource: this.thumbnailSource,
			Volume: {
				$type: "System.Int32, mscorlib",
				$value: this.volume
			}
		}
	}
}

/** Represents a MediaShout video. */
export class MSVisualItemVideo extends MSVisualItem {
	/** Properties of the video. */
	properties: MSVisualItemVideoProperties;

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Video"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.identifier=json.Properties.Identifier;
			this.properties.source=json.Properties.Source;
			this.properties.originalSource=json.Properties.OriginalSource;
			this.properties.initialSize=stringToDrawingSize(json.Properties.InitialSize.$value);
			this.properties.fastPositioningState=json.Properties.FastPositioningState.$value;
			this.properties.rate=json.Properties.Rate.$value;
			this.properties.thumbnailSource=json.Properties.ThumbnailSource;
			this.properties.volume=json.Properties.Volume.$value;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+Video",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}