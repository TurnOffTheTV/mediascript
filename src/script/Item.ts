/**
 * @file `MSVisualItem` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSEffect,MSEffectBlur,MSEffectCommon,MSEffectContrastBrightnessAdjust,MSEffectFlip,MSEffectGrayscale,MSEffectHueRotate,MSEffectInvertColors,MSEffectOutline,MSEffectSaturationAdjust,MSEffectSepia,MSEffectShadow,MSEffectText,MSEffectVideoCrop,MSEffectVideoPlayTimes} from "./Effect"
import {MSRawVisualItem} from "../raw";
import {MSCompletedActionEnum, MSDrawingRectangle,MSDrawingSize,MSFastPositioningStateEnum,MSFontStyle,MSFontWeight,MSHexColor,MSTextAlignmentEnum,MSTextItemTypeEnum,MSThickness,MSTimeFormatEnum,MSTimerFormatEnum} from "../types";
import {MSObject,MSObjectProperties} from "./Object"
import {MSVisualItemStoryboard} from "./Transition";
import {colorToString,drawingRectToString,drawingSizeToString,stringToColor,stringToDrawingRect,stringToDrawingSize,stringToThickness,thicknessToString} from "../internal-functions";

/** Base visual item properties class. */
class MSVisualItemProperties extends MSObjectProperties {
	/** The visual item's name. */
	name: string = "";
	/** The visual item's x-position. */
	x: number = 0;
	/** The visual item's y-position. */
	y: number = 0;
	/** The visual item's width. */
	width: number = 1920;
	/** The visual item's height. */
	height: number = 1080;
	/** The visual item's angle. */
	angle: number = 0;
	/** Wether or not the visual item is locked. */
	locked: boolean = false;
	/** Wether or not the visual item is visible. */
	visible: boolean = false;
}

/** Base visual item class. */
export class MSVisualItem extends MSObject {
	/** Properties of the visual item. */
	properties: MSVisualItemProperties = new MSVisualItemProperties();
	/** `Storyboard` (use unknown) */
	storyboard: MSVisualItemStoryboard = new MSVisualItemStoryboard();
	/** Effects for this visual item. */
	effects: Array<MSEffect> = [];
	
	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super();

		if(json && json.TypeId.startsWith("VisualItem")){
			//Set main properties.
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties.
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;

			//Set up storyboard.
			this.storyboard=new MSVisualItemStoryboard(json.Storyboard);

			//Set up effects.
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
		let type: number;
		switch(this.type){
			case "basic":
				type=0;
			break;
			case "lyric":
				type=1;
			break;
			case "bible":
				type=2;
			break;
			case "text cue":
				type=6;
			break;
		}

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
				$value: type
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

/** Represents a MediaShout textbox object. */
export class MSVisualItemText extends MSVisualItem {
	/** Properties of the textbox. */
	properties: MSVisualItemTextProperties = new MSVisualItemTextProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Text"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.text=json.Properties.Text;
			switch(json.Properties.Type.$value){
				case 0:
					this.properties.type="basic";
				break;
				case 1:
					this.properties.type="lyric";
				break;
				case 2:
					this.properties.type="bible";
				break;
				case 6:
					this.properties.type="text cue";
				break;
			}
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
			TypeId: "VisualItem+Text",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemImage` */
class MSVisualItemImageProperties extends MSVisualItemProperties {
	/** `Identifier` (use unknown) */
	identifier: string;
	/** Path to the image's source. */
	source: string;
	/** Path to the image's original source. */
	originalSource: string;
	/** `InitialSize` (use unknown) */
	initialSize: MSDrawingSize;
	/** `FastPositioningState` (use unknown) */
	fastPositioningState: MSFastPositioningStateEnum;
	/** `VisualizeRectangle` (use unknown) */
	visualizeRectangle: MSDrawingRectangle;
	/** Horizontal DPI. */
	dpiX: number;
	/** Vertical DPI. */
	dpiY: number;

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
			VisualizeRectangle: {
				$type: "System.Drawing.Rectangle, System.Drawing",
				$value: drawingRectToString(this.visualizeRectangle)
			},
			DpiX: this.dpiX,
			DpiY: this.dpiY
		}
	}
}

/** Represents a MediaShout image object. */
export class MSVisualItemImage extends MSVisualItem {
	/** Properties of the image. */
	properties: MSVisualItemImageProperties;

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Image"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.identifier=json.Properties.Identifier;
			this.properties.source=json.Properties.Source;
			this.properties.originalSource=json.Properties.OriginalSource;
			this.properties.initialSize=stringToDrawingSize(json.Properties.InitialSize.$value);
			this.properties.fastPositioningState=json.Properties.FastPositioningState.$value;
			this.properties.visualizeRectangle=stringToDrawingRect(json.Properties.VisualizeRectangle.$value);
			this.properties.dpiX=json.Properties.DpiX;
			this.properties.dpiY=json.Properties.DpiY;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+Image",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemVideo`. */
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

/** Represents a MediaShout video object. */
export class MSVisualItemVideo extends MSVisualItem {
	/** Properties of the video. */
	properties: MSVisualItemVideoProperties = new MSVisualItemVideoProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Video"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
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

/** Properties of an `MSVisualItemNDISource`. */
class MSVisualItemNDISourceProperties extends MSVisualItemProperties {
	/** `Identifier` (use unknown) */
	identifier: string | null = null;
	/** Path to the video's source. (unknown how this is used with ndi) */
	source: string | null = null;
	/** Path to the video's original source. (unknown how this is used with ndi) */
	originalSource: string = "";
	/** `InitialSize` (use unknown) */
	initialSize: MSDrawingSize = {width:640,height:360};
	/** `FastPositioningState` (use unknown) */
	fastPositioningState: MSFastPositioningStateEnum = 0;
	/** Source volume, 0-100. */
	volume: number = 100;

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
			Volume: {
				$type: "System.Int32, mscorlib",
				$value: this.volume
			}
		}
	}
}

/** Represents a MediaShout NDI source object. */
export class MSVisualItemNDISource extends MSVisualItem {
	/** Properties of the NDI source. */
	properties: MSVisualItemNDISourceProperties = new MSVisualItemNDISourceProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+NdiVideoSource"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.identifier=json.Properties.Identifier;
			this.properties.source=json.Properties.Source;
			this.properties.originalSource=json.Properties.OriginalSource;
			this.properties.initialSize=stringToDrawingSize(json.Properties.InitialSize.$value);
			this.properties.fastPositioningState=json.Properties.FastPositioningState.$value;
			this.properties.volume=json.Properties.Volume.$value;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+NdiVideoSource",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemStageData`. */
class MSVisualItemStageDataProperties extends MSVisualItemProperties {
	/** `IsMain` (use unknown) */
	main: boolean = false;
	/** Cues that the visual item is visible on. */
	visibleCues: Array<any> = [];
	/** `Text` (use unknown) */
	text: null = null;
	/** Font family used for the visual item. */
	fontFamily: string = "Arial";
	/** Font size used for the visual item. */
	fontSize: number = 48;
	/** Font style used for the visual item. */
	fontStyle: MSFontStyle = "normal";
	/** Font weight used for the visual item. */
	fontWeight: MSFontWeight = "normal";
	/** Text color used for the visual item. */
	foregroundColor: MSHexColor = {r:255,g:255,b:255,a:255};
	/** Highlight color used for the visual item. */
	highlightColor: MSHexColor = {r:0,g:0,b:0,a:0};
	/** Text alignment for visual item. */
	textAlignment: MSTextAlignmentEnum = "center";
	/** If the visual item is underlined. */
	underline: boolean = false;
	/** If the visual item is stricken. */
	strikethrough: boolean = false;
	/** Border thickness of visual item. */
	borderThickness: MSThickness = {top:0,bottom:0,left:0,right:0};

	toJSON(){
		let textAlignment: number;

		switch(this.textAlignment){
			case "left":
				textAlignment=0;
			break;
			case "right":
				textAlignment=1;
			break;
			case "center":
				textAlignment=2;
			break;
			case "justify":
				textAlignment=3;
			break;
		}

		let fontWeight: string;
		switch(this.fontWeight){
			case "thin":
				fontWeight="Thin";
			break;
			case "extralight":
				fontWeight="ExtraLight";
			break;
			case "ultralight":
				fontWeight="UltraLight";
			break;
			case "light":
				fontWeight="Light";
			break;
			case "normal":
				fontWeight="Normal";
			break;
			case "regular":
				fontWeight="Regular";
			break;
			case "medium":
				fontWeight="Medium";
			break;
			case "demibold":
				fontWeight="DemiBold";
			break;
			case "semibold":
				fontWeight="SemiBold";
			break;
			case "bold":
				fontWeight="Bold";
			break;
			case "extrabold":
				fontWeight="ExtraBold";
			break;
			case "ultrabold":
				fontWeight="UltraBold";
			break;
			case "black":
				fontWeight="Black";
			break;
			case "heavy":
				fontWeight="Heavy";
			break;
			case "extrablack":
				fontWeight="ExtraBlack";
			break;
			case "ultrablack":
				fontWeight="UltraBlack";
			break;
		}

		return {
			Name: this.name,
			X: this.x,
			Y: this.y,
			Width: this.width,
			Height: this.height,
			Angle: this.angle,
			IsLocked: this.locked,
			IsVisible: this.visible,
			IsMain: this.main,
			CuesVisibility: {
				$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Boolean, mscorlib]], mscorlib",
				$value: {}
			},
			Text: this.text,
			FontFamily: {
				$type: "System.Windows.Media.FontFamily, PresentationCore",
				$value: this.fontFamily
			},
			FontSize: this.fontSize,
			FontStyle: {
				$type: "System.Windows.FontStyle, PresentationCore",
				$value: this.fontStyle.charAt(0).toUpperCase() + this.fontStyle.slice(1),
			},
			FontWeight: {
				$type: "System.Windows.FontWeight, PresentationCore",
				$value: fontWeight
			},
			Foreground: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.foregroundColor)
			},
			Highlight: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.highlightColor)
			},
			TextAlignment: {
				$type: "System.Windows.TextAlignment, PresentationCore",
				$value: textAlignment
			},
			IsUnderlineEnabled: this.underline,
			IsStrikethroughEnabled: this.strikethrough,
			Indent: {
				$type: "System.Windows.Thickness, PresentationFramework",
				$value: thicknessToString(this.borderThickness)
			}
		}
	}
}

/** Represents a MediaShout stage data text object. */
export class MSVisualItemStageData extends MSVisualItem {
	/** Properties of the clock. */
	properties: MSVisualItemStageDataProperties = new MSVisualItemStageDataProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+StageDataText"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.main=json.Properties.IsMain;
			this.properties.visibleCues=Object.keys(json.Properties.CuesVisibility.$value);
			this.properties.text=<null>json.Properties.Text;
			this.properties.fontFamily=json.Properties.FontFamily.$value;
			this.properties.fontSize=json.Properties.FontSize;
			this.properties.fontStyle=<MSFontStyle>(json.Properties.FontStyle.$value.toLowerCase());
			this.properties.fontWeight=<MSFontWeight>(json.Properties.FontWeight.$value.toLowerCase());
			this.properties.foregroundColor=stringToColor(json.Properties.Foreground.$value);
			this.properties.highlightColor=stringToColor(json.Properties.Highlight.$value);
			switch(json.Properties.TextAlignment.$value){
				case 0:
					this.properties.textAlignment="left";
				break;
				case 1:
					this.properties.textAlignment="right";
				break;
				case 2:
					this.properties.textAlignment="center";
				break;
				case 3:
					this.properties.textAlignment="justify";
				break;
			}
			this.properties.underline=json.Properties.IsUnderlineEnabled;
			this.properties.strikethrough=json.Properties.IsStrikethroughEnabled;
			this.properties.borderThickness=stringToThickness(json.Properties.Indent.$value);
		
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+StageDataText",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemClock`. */
class MSVisualItemClockProperties extends MSVisualItemStageDataProperties {
	/** Time shown on the clock. */
	time: Date = new Date();
	/** Time format used. */
	timeFormat: MSTimeFormatEnum = 0;

	toJSON(){
		let textAlignment: number;

		switch(this.textAlignment){
			case "left":
				textAlignment=0;
			break;
			case "right":
				textAlignment=1;
			break;
			case "center":
				textAlignment=2;
			break;
			case "justify":
				textAlignment=3;
			break;
		}

		let fontWeight: string;
		switch(this.fontWeight){
			case "thin":
				fontWeight="Thin";
			break;
			case "extralight":
				fontWeight="ExtraLight";
			break;
			case "ultralight":
				fontWeight="UltraLight";
			break;
			case "light":
				fontWeight="Light";
			break;
			case "normal":
				fontWeight="Normal";
			break;
			case "regular":
				fontWeight="Regular";
			break;
			case "medium":
				fontWeight="Medium";
			break;
			case "demibold":
				fontWeight="DemiBold";
			break;
			case "semibold":
				fontWeight="SemiBold";
			break;
			case "bold":
				fontWeight="Bold";
			break;
			case "extrabold":
				fontWeight="ExtraBold";
			break;
			case "ultrabold":
				fontWeight="UltraBold";
			break;
			case "black":
				fontWeight="Black";
			break;
			case "heavy":
				fontWeight="Heavy";
			break;
			case "extrablack":
				fontWeight="ExtraBlack";
			break;
			case "ultrablack":
				fontWeight="UltraBlack";
			break;
		}

		return {
			Name: this.name,
			X: this.x,
			Y: this.y,
			Width: this.width,
			Height: this.height,
			Angle: this.angle,
			IsLocked: this.locked,
			IsVisible: this.visible,
			IsMain: this.main,
			CuesVisibility: {
				$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Boolean, mscorlib]], mscorlib",
				$value: {}
			},
			Text: this.text,
			FontFamily: {
				$type: "System.Windows.Media.FontFamily, PresentationCore",
				$value: this.fontFamily
			},
			FontSize: this.fontSize,
			FontStyle: {
				$type: "System.Windows.FontStyle, PresentationCore",
				$value: this.fontStyle.charAt(0).toUpperCase() + this.fontStyle.slice(1),
			},
			FontWeight: {
				$type: "System.Windows.FontWeight, PresentationCore",
				$value: fontWeight
			},
			Foreground: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.foregroundColor)
			},
			Highlight: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.highlightColor)
			},
			TextAlignment: {
				$type: "System.Windows.TextAlignment, PresentationCore",
				$value: textAlignment
			},
			IsUnderlineEnabled: this.underline,
			IsStrikethroughEnabled: this.strikethrough,
			Indent: {
				$type: "System.Windows.Thickness, PresentationFramework",
				$value: thicknessToString(this.borderThickness)
			},
			Time: {
				$type: "System.DateTime, mscorlib",
				$value: this.time.toISOString()
			},
			TimeFormat: {
				$type: "polino.model.Enums.KeyObjects.TimeFormat, polino.model",
				$value: this.timeFormat
			}
		}
	}
}

/** Represents a MediaShout clock object. */
export class MSVisualItemClock extends MSVisualItem {
	/** Properties of the clock. */
	properties: MSVisualItemClockProperties = new MSVisualItemClockProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Clock"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.main=json.Properties.IsMain;
			this.properties.visibleCues=Object.keys(json.Properties.CuesVisibility.$value);
			this.properties.text=<null>json.Properties.Text;
			this.properties.fontFamily=json.Properties.FontFamily.$value;
			this.properties.fontSize=json.Properties.FontSize;
			this.properties.fontStyle=<MSFontStyle>(json.Properties.FontStyle.$value.toLowerCase());
			this.properties.fontWeight=<MSFontWeight>(json.Properties.FontWeight.$value.toLowerCase());
			this.properties.foregroundColor=stringToColor(json.Properties.Foreground.$value);
			this.properties.highlightColor=stringToColor(json.Properties.Highlight.$value);
			switch(json.Properties.TextAlignment.$value){
				case 0:
					this.properties.textAlignment="left";
				break;
				case 1:
					this.properties.textAlignment="right";
				break;
				case 2:
					this.properties.textAlignment="center";
				break;
				case 3:
					this.properties.textAlignment="justify";
				break;
			}
			this.properties.underline=json.Properties.IsUnderlineEnabled;
			this.properties.strikethrough=json.Properties.IsStrikethroughEnabled;
			this.properties.borderThickness=stringToThickness(json.Properties.Indent.$value);
			this.properties.time=new Date(json.Properties.Time.$value);
			this.properties.timeFormat=json.Properties.TimeFormat.$value;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+Clock",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemTimer`. */
class MSVisualItemTimerProperties extends MSVisualItemStageDataProperties {
	/** Timer format used. */
	timerFormat: MSTimerFormatEnum = 0;
	/** Number of hours to countdown. */
	hours: number = 0;
	/** Number of minutes to countdown. */
	minutes: number = 1;
	/** Number of seconds to countdown. */
	seconds: number = 0;
	/** `CompletedAction` (use unknonwn) */
	completedAction: MSCompletedActionEnum = 0;

	toJSON(){
		let textAlignment: number;

		switch(this.textAlignment){
			case "left":
				textAlignment=0;
			break;
			case "right":
				textAlignment=1;
			break;
			case "center":
				textAlignment=2;
			break;
			case "justify":
				textAlignment=3;
			break;
		}
		
		let fontWeight: string;
		switch(this.fontWeight){
			case "thin":
				fontWeight="Thin";
			break;
			case "extralight":
				fontWeight="ExtraLight";
			break;
			case "ultralight":
				fontWeight="UltraLight";
			break;
			case "light":
				fontWeight="Light";
			break;
			case "normal":
				fontWeight="Normal";
			break;
			case "regular":
				fontWeight="Regular";
			break;
			case "medium":
				fontWeight="Medium";
			break;
			case "demibold":
				fontWeight="DemiBold";
			break;
			case "semibold":
				fontWeight="SemiBold";
			break;
			case "bold":
				fontWeight="Bold";
			break;
			case "extrabold":
				fontWeight="ExtraBold";
			break;
			case "ultrabold":
				fontWeight="UltraBold";
			break;
			case "black":
				fontWeight="Black";
			break;
			case "heavy":
				fontWeight="Heavy";
			break;
			case "extrablack":
				fontWeight="ExtraBlack";
			break;
			case "ultrablack":
				fontWeight="UltraBlack";
			break;
		}

		return {
			Name: this.name,
			X: this.x,
			Y: this.y,
			Width: this.width,
			Height: this.height,
			Angle: this.angle,
			IsLocked: this.locked,
			IsVisible: this.visible,
			IsMain: this.main,
			CuesVisibility: {
				$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Boolean, mscorlib]], mscorlib",
				$value: {}
			},
			Text: this.text,
			FontFamily: {
				$type: "System.Windows.Media.FontFamily, PresentationCore",
				$value: this.fontFamily
			},
			FontSize: this.fontSize,
			FontStyle: {
				$type: "System.Windows.FontStyle, PresentationCore",
				$value: this.fontStyle.charAt(0).toUpperCase() + this.fontStyle.slice(1),
			},
			FontWeight: {
				$type: "System.Windows.FontWeight, PresentationCore",
				$value: fontWeight
			},
			Foreground: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.foregroundColor)
			},
			Highlight: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.highlightColor)
			},
			TextAlignment: {
				$type: "System.Windows.TextAlignment, PresentationCore",
				$value: textAlignment
			},
			IsUnderlineEnabled: this.underline,
			IsStrikethroughEnabled: this.strikethrough,
			Indent: {
				$type: "System.Windows.Thickness, PresentationFramework",
				$value: thicknessToString(this.borderThickness)
			},
			TimerFormat: {
				$type: "polino.model.Enums.KeyObjects.TimerFormat, polino.model",
				$value: this.timerFormat
			},
			Hours: {
				$type: "System.Int32, mscorlib",
				$value: this.hours
			},
			Minutes: {
				$type: "System.Int32, mscorlib",
				$value: this.minutes
			},
			Seconds: {
				$type: "System.Int32, mscorlib",
				$value: this.seconds
			},
			CompletedAction: {
				$type: "polino.model.Enums.KeyObjects.CompletedAction, polino.model",
				$value: this.completedAction
			}
		}
	}
}

/** Represents a MediaShout timer object. */
export class MSVisualItemTimer extends MSVisualItem {
	/** Properties of the timer. */
	properties: MSVisualItemTimerProperties = new MSVisualItemTimerProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+Timer"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.main=json.Properties.IsMain;
			this.properties.visibleCues=Object.keys(json.Properties.CuesVisibility.$value);
			this.properties.text=<null>json.Properties.Text;
			this.properties.fontFamily=json.Properties.FontFamily.$value;
			this.properties.fontSize=json.Properties.FontSize;
			this.properties.fontStyle=<MSFontStyle>(json.Properties.FontStyle.$value.toLowerCase());
			this.properties.fontWeight=<MSFontWeight>(json.Properties.FontWeight.$value.toLowerCase());
			this.properties.foregroundColor=stringToColor(json.Properties.Foreground.$value);
			this.properties.highlightColor=stringToColor(json.Properties.Highlight.$value);
			switch(json.Properties.TextAlignment.$value){
				case 0:
					this.properties.textAlignment="left";
				break;
				case 1:
					this.properties.textAlignment="right";
				break;
				case 2:
					this.properties.textAlignment="center";
				break;
				case 3:
					this.properties.textAlignment="justify";
				break;
			}
			this.properties.underline=json.Properties.IsUnderlineEnabled;
			this.properties.strikethrough=json.Properties.IsStrikethroughEnabled;
			this.properties.borderThickness=stringToThickness(json.Properties.Indent.$value);
			this.properties.timerFormat=json.Properties.TimerFormat.$value;
			this.properties.hours=json.Properties.Hours.$value;
			this.properties.minutes=json.Properties.Minutes.$value;
			this.properties.seconds=json.Properties.Seconds.$value;
			this.properties.completedAction=json.Properties.CompletedAction.$value;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+Timer",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}

/** Properties of an `MSVisualItemNewsRibbon`. */
class MSVisualItemNewsRibbonProperties extends MSVisualItemStageDataProperties {
	/** Speed of the news ribbon. */
	speed: number;

	toJSON(){
		let textAlignment: number;

		switch(this.textAlignment){
			case "left":
				textAlignment=0;
			break;
			case "right":
				textAlignment=1;
			break;
			case "center":
				textAlignment=2;
			break;
			case "justify":
				textAlignment=3;
			break;
		}
		
		let fontWeight: string;
		switch(this.fontWeight){
			case "thin":
				fontWeight="Thin";
			break;
			case "extralight":
				fontWeight="ExtraLight";
			break;
			case "ultralight":
				fontWeight="UltraLight";
			break;
			case "light":
				fontWeight="Light";
			break;
			case "normal":
				fontWeight="Normal";
			break;
			case "regular":
				fontWeight="Regular";
			break;
			case "medium":
				fontWeight="Medium";
			break;
			case "demibold":
				fontWeight="DemiBold";
			break;
			case "semibold":
				fontWeight="SemiBold";
			break;
			case "bold":
				fontWeight="Bold";
			break;
			case "extrabold":
				fontWeight="ExtraBold";
			break;
			case "ultrabold":
				fontWeight="UltraBold";
			break;
			case "black":
				fontWeight="Black";
			break;
			case "heavy":
				fontWeight="Heavy";
			break;
			case "extrablack":
				fontWeight="ExtraBlack";
			break;
			case "ultrablack":
				fontWeight="UltraBlack";
			break;
		}

		return {
			Name: this.name,
			X: this.x,
			Y: this.y,
			Width: this.width,
			Height: this.height,
			Angle: this.angle,
			IsLocked: this.locked,
			IsVisible: this.visible,
			IsMain: this.main,
			CuesVisibility: {
				$type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Boolean, mscorlib]], mscorlib",
				$value: {}
			},
			Text: this.text,
			FontFamily: {
				$type: "System.Windows.Media.FontFamily, PresentationCore",
				$value: this.fontFamily
			},
			FontSize: this.fontSize,
			FontStyle: {
				$type: "System.Windows.FontStyle, PresentationCore",
				$value: this.fontStyle.charAt(0).toUpperCase() + this.fontStyle.slice(1),
			},
			FontWeight: {
				$type: "System.Windows.FontWeight, PresentationCore",
				$value: fontWeight
			},
			Foreground: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.foregroundColor)
			},
			Highlight: {
				$type: "System.Windows.Media.Color, PresentationCore",
				$value: colorToString(this.highlightColor)
			},
			TextAlignment: {
				$type: "System.Windows.TextAlignment, PresentationCore",
				$value: textAlignment
			},
			IsUnderlineEnabled: this.underline,
			IsStrikethroughEnabled: this.strikethrough,
			Indent: {
				$type: "System.Windows.Thickness, PresentationFramework",
				$value: thicknessToString(this.borderThickness)
			},
			NewsRibbonSpeed: this.speed
		}
	}
}

/** Represents a MediaShout news ribbon object. */
export class MSVisualItemNewsRibbon extends MSVisualItem {
	/** Properties of the news ribbon. */
	properties: MSVisualItemNewsRibbonProperties = new MSVisualItemNewsRibbonProperties();

	/**
	 * @param {MSRawVisualItem} [json] The visual item's raw parsed JSON object. 
	 */
	constructor(json?: MSRawVisualItem){
		super(json);

		if(json && json.TypeId==="VisualItem+NewsRibbon"){
			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.x=json.Properties.X;
			this.properties.y=json.Properties.Y;
			this.properties.width=json.Properties.Width;
			this.properties.height=json.Properties.Height;
			this.properties.angle=json.Properties.Angle;
			this.properties.locked=json.Properties.IsLocked;
			this.properties.visible=json.Properties.IsVisible;
			this.properties.main=json.Properties.IsMain;
			this.properties.visibleCues=Object.keys(json.Properties.CuesVisibility.$value);
			this.properties.text=<null>json.Properties.Text;
			this.properties.fontFamily=json.Properties.FontFamily.$value;
			this.properties.fontSize=json.Properties.FontSize;
			this.properties.fontStyle=<MSFontStyle>(json.Properties.FontStyle.$value.toLowerCase());
			this.properties.fontWeight=<MSFontWeight>(json.Properties.FontWeight.$value.toLowerCase());
			this.properties.foregroundColor=stringToColor(json.Properties.Foreground.$value);
			this.properties.highlightColor=stringToColor(json.Properties.Highlight.$value);
			switch(json.Properties.TextAlignment.$value){
				case 0:
					this.properties.textAlignment="left";
				break;
				case 1:
					this.properties.textAlignment="right";
				break;
				case 2:
					this.properties.textAlignment="center";
				break;
				case 3:
					this.properties.textAlignment="justify";
				break;
			}
			this.properties.underline=json.Properties.IsUnderlineEnabled;
			this.properties.strikethrough=json.Properties.IsStrikethroughEnabled;
			this.properties.borderThickness=stringToThickness(json.Properties.Indent.$value);
			this.properties.speed=json.Properties.NewsRibbonSpeed;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "VisualItem+NewsRibbon",
			Properties: this.properties,
			Effects: this.effects,
			Storyboard: this.storyboard
		}
	}
}