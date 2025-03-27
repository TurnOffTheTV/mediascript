/**
 * Class definitions for visual item effects.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {colorToInt,intToColor} from "../internal-functions";
import {MSRawEffect} from "../raw";
import {MSIntColor, MSVerticalAlignmentEnum} from "../types";
import {MSObject} from "./Object";

/** Base effect class. */
export class MSEffect extends MSObject {}

/** Represents a "common" effect. */
export class MSEffectCommon extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Opacity of item, 0-1. */
		opacity: number
	} = {opacity:1};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+CommonEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.opacity=json.Properties.Opacity;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+CommonEffect",
			Properties: {
				Opacity: this.properties.opacity
			}
		}
	}
}

/** Represents a "flip" effect. */
export class MSEffectFlip extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether to flip item horizontally. */
		horizontal: boolean
		/** Wether to flip item vertically. */
		vertical: boolean
	} = {horizontal:false,vertical:false};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+FlipEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.horizontal=json.Properties.FlipHorizontal;
			this.properties.vertical=json.Properties.FlipVertical;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+FlipEffect",
			Properties: {
				FlipHorizontal: this.properties.horizontal,
				FlipVertical: this.properties.vertical
			}
		}
	}
}

/** Represents an "outline" effect. */
export class MSEffectOutline extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Outline color. */
		color: MSIntColor,
		/** Outline opacity, 0-1. */
		opacity: number,
		/** Outline width. */
		width: number
	} = {color:{r:0,g:0,b:0,a:255},opacity:1,width:0};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+OutlineEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.color=intToColor(json.Properties.Color.$value);
			this.properties.opacity=json.Properties.Opacity;
			this.properties.width=json.Properties.Size;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+OutlineEffect",
			Properties: {
				Color: {
					$type: "System.Int32, mscorlib",
					$value: colorToInt(this.properties.color)
				},
				Opacity: this.properties.opacity,
				Size: this.properties.width
			}
		}
	}
}

/** Represents a "text" effect. */
export class MSEffectText extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Text background color. */
		backgroundColor: MSIntColor,
		/** Text outline color. */
		outlineColor: MSIntColor,
		/** Text shadow color. */
		shadowColor: MSIntColor,
		/** Text background opacity, 0-1. */
		backgroundOpacity: number,
		/** Text outline opacity, 0-1. */
		outlineOpacity: number,
		/** Text shadow opacity, 0-1. */
		shadowOpacity: number,
		/** Text outline width. */
		outlineWidth: number,
		/** Text shadow angle. */
		shadowAngle: number,
		/** Text shadow offset. */
		shadowOffset: number,
		/** Text shadow blur radius. */
		shadowBlurRadius: number,
		/** Vertical alignment of text. */
		verticalAlignment: MSVerticalAlignmentEnum;

	} = {backgroundColor:{r:255,g:0,b:0,a:0},outlineColor:{r:0,g:0,b:0,a:255},shadowColor:{r:0,g:0,b:0,a:255},backgroundOpacity:0,outlineOpacity:1,shadowOpacity:0,outlineWidth:0,shadowAngle:135,shadowOffset:0,shadowBlurRadius:0,verticalAlignment:"center"};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+TextEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.backgroundColor=intToColor(json.Properties.BackgroundColor.$value);
			this.properties.outlineColor=intToColor(json.Properties.OutlineColor.$value);
			this.properties.shadowColor=intToColor(json.Properties.ShadowColor.$value);
			this.properties.backgroundOpacity=json.Properties.BackgroundOpacity;
			this.properties.outlineOpacity=json.Properties.OutlineOpacity;
			this.properties.shadowOpacity=json.Properties.ShadowOpacity;
			this.properties.outlineWidth=json.Properties.OutlineThickness;
			this.properties.shadowAngle=json.Properties.ShadowAngle;
			this.properties.shadowOffset=json.Properties.ShadowOffset;
			this.properties.shadowBlurRadius=json.Properties.ShadowBlurRadius.$value;
			switch(json.Properties.VerticalAlignment.$value){
				case 0:
					this.properties.verticalAlignment="top";
				break;
				case 1:
					this.properties.verticalAlignment="center";
				break;
				case 2:
					this.properties.verticalAlignment="bottom";
				break;
				case 3:
					this.properties.verticalAlignment="stretch";
				break;
			}
		}
	}

	toJSON(){
		let verticalAlignment: number;

		switch(this.properties.verticalAlignment){
			case "top":
				verticalAlignment=0;
			break;
			case "center":
				verticalAlignment=1;
			break;
			case "bottom":
				verticalAlignment=2;
			break;
			case "stretch":
				verticalAlignment=3;
			break;
		}

		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+TextEffect",
			Properties: {
				BackgroundColor: {
					$type: "System.Int32, mscorlib",
					$value: colorToInt(this.properties.backgroundColor)
				},
				OutlineColor: {
					$type: "System.Int32, mscorlib",
					$value: colorToInt(this.properties.outlineColor)
				},
				ShadowColor: {
					$type: "System.Int32, mscorlib",
					$value: colorToInt(this.properties.shadowColor)
				},
				BackgroundOpacity: this.properties.backgroundOpacity,
				OutlineOpacity: this.properties.outlineOpacity,
				ShadowOpacity: this.properties.shadowOpacity,
				OutlineThickness: this.properties.outlineWidth,
				ShadowAngle: this.properties.shadowAngle,
				ShadowOffset: this.properties.shadowOffset,
				ShadowBlurRadius: {
					$type: "System.Int32, mscorlib",
					$value: this.properties.shadowBlurRadius
				},
				VerticalAlignment: {
					$type: "System.Windows.VerticalAlignment, PresentationFramework",
					$value: verticalAlignment
				}
			}
		}
	}
}

/** Represents a "shadow" effect. */
export class MSEffectShadow extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Blur radius of the shadow. */
		blurRadius: number,
		/** Color of the shadow. */
		color: MSIntColor,
		/** Opacity of the shadow, 0-1. */
		opacity: number,
		/** Offset of the shadow. */
		offset: number,
		/** Angle of shadow. */
		angle: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+ShadowEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.blurRadius=json.Properties.BlurRadius.$value;
			this.properties.color=intToColor(json.Properties.Color.$value);
			this.properties.opacity=json.Properties.Opacity;
			this.properties.offset=json.Properties.Offset
			this.properties.angle=json.Properties.Angle;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+ShadowEffect",
			Properties: {
				BlurRadius: {
					$type: "System.Int32, mscorlib",
					$value: this.properties.blurRadius
				},
				Color: {
					$type: "System.Int32, mscorlib",
					$value: colorToInt(this.properties.color)
				},
				Opacity: this.properties.opacity,
				Offset: this.properties.offset,
				Angle: this.properties.angle
			}
		}
	}
}

/** Represents a "sepia" effect. */
export class MSEffectSepia extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+SepiaEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+SepiaEffect",
			Properties: {
				IsEnabled: this.properties.enabled
			}
		}
	}
}

/** Represents a "grayscale" effect. */
export class MSEffectGrayscale extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+GrayscaleEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+GrayscaleEffect",
			Properties: {
				IsEnabled: this.properties.enabled
			}
		}
	}
}

/** Represents a "blur" effect. */
export class MSEffectBlur extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean,
		/** Radius of the blur. */
		radius: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+BlurEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
			this.properties.radius=json.Properties.Radius;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+BlurEffect",
			Properties: {
				IsEnabled: this.properties.enabled,
				Radius: this.properties.radius
			}
		}
	}
}

/** Represents an "invert colors" effect. */
export class MSEffectInvertColors extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+InvertColorsEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+InvertColorsEffect",
			Properties: {
				IsEnabled: this.properties.enabled
			}
		}
	}
}

/** Represents a "hue rotate" effect. */
export class MSEffectHueRotate extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean,
		/** Amount to offset the hue by. (values unknown) */
		hueOffset: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+HueRotateEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
			this.properties.hueOffset=json.Properties.HueOffset;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+HueRotateEffect",
			Properties: {
				IsEnabled: this.properties.enabled,
				HueOffset: this.properties.hueOffset
			}
		}
	}
}

/** Represents a "saturation adjust" effect. */
export class MSEffectSaturationAdjust extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean,
		/** Saturation multiplier. (presumably) */
		saturationAdjust: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+SaturationAdjustEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
			this.properties.saturationAdjust=json.Properties.SaturationAdjust;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+SaturationAdjustEffect",
			Properties: {
				IsEnabled: this.properties.enabled,
				SaturationAdjust: this.properties.saturationAdjust
			}
		}
	}
}

/** Represents a "contrast/brightness adjust" effect. */
export class MSEffectContrastBrightnessAdjust extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Wether or not the effect is enabled. */
		enabled: boolean,
		/** Contrast multiplier. (presumably) */
		contrastAdjust: number,
		/** Brightness multiplier. (presumably) */
		brightnessAdjust: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+ContrastBrighnessAdjustEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.enabled=json.Properties.IsEnabled;
			this.properties.contrastAdjust=json.Properties.ContrastAdjust;
			this.properties.brightnessAdjust=json.Properties.BrightnessAdjust;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+BrighnessAdjustEffect",
			Properties: {
				IsEnabled: this.properties.enabled,
				ContrastAdjust: this.properties.contrastAdjust,
				BrightnessAdjust: this.properties.brightnessAdjust
			}
		}
	}
}

/** Represents a "video crop" effect. */
export class MSEffectVideoCrop extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** Start of the crop. */
		startPosition: number,
		/** End of the crop. */
		endPosition: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+VideoCropEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.startPosition=json.Properties.StartPosition;
			this.properties.endPosition=json.Properties.EndPosition;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+VideoCropEffect",
			Properties: {
				StartPosition: this.properties.startPosition,
				EndPosition: this.properties.endPosition
			}
		}
	}
}

/** Represents a "video play times" effect. */
export class MSEffectVideoPlayTimes extends MSEffect {
	/** Properties of the effect. */
	properties: {
		/** How many times to play the video. 0 represents an infinite loop. */
		playTimes: number
	};

	/**
	 * @param {MSRawEffect} [json] The effect's raw parsed JSON object. 
	 */
	constructor(json?: MSRawEffect){
		super();

		if(json && json.TypeId==="Effect+VideoPlayTimesEffect"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;
			
			//Set properties properties
			this.properties.playTimes=json.Properties.PlayTimes.$value;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Effect+VideoPlayTimesEffect",
			Properties: {
				PlayTimes: {
					$type: "System.Int32, mscorlib",
					$value: this.properties.playTimes
				}
			}
		}
	}
}