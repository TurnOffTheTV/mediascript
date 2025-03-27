/**
 * @file Library type definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

/** Enum for cue type. */
export type MSCueTypeEnum = "blank" | "lyric" | "bible" | "text" | "comment";

/** Enum for splitting type. (values unknown) */
export type MSSplittingOptionsTypeEnum = 0;

/** Enum for scheduled playback type. (values unknown) */
export type MSScheduledPlaybackTypeEnum = -1;

/** `TypeId`s for page transitions. */
export type MSPageTransitionId = "PageTransition+None" | "PageTransition+Cut" | "PageTransition+Dissolve" | "PageTransition+FlyIn" | "PageTransition+Ticker" | "PageTransition+Zoom";

/** `TypeId`s for object transitions */
export type MSObjectTransitionId = "ObjectTransition+None";

/** `TypeId`s for visual items. */
export type MSVisualItemId = "VisualItem+Text" | "VisualItem+Image" | "VisualItem+Video" | "VisualItem+Clock" | "VisualItem+Timer" | "VisualItem+StageDataText";

/** `TypeId`s for effects. `ContrastBrighnessAdjustEffect` is not an error. */
export type MSEffectId = "Effect+CommonEffect" | "Effect+FlipEffect" | "Effect+OutlineEffect" | "Effect+TextEffect" | "Effect+ShadowEffect" | "Effect+SepiaEffect" | "Effect+GrayscaleEffect" | "Effect+BlurEffect" | "Effect+InvertColorsEffect" | "Effect+HueRotateEffect" | "Effect+SaturationAdjustEffect" | "Effect+ContrastBrighnessAdjustEffect" | "Effect+VideoCropEffect" | "Effect+VideoPlayTimesEffect";

/** Enum for transition direction. (values unknown) */
export type MSTransitionDirectionEnum = 0;

/** Enum for vertical alignment. [More info...](https://learn.microsoft.com/en-us/dotnet/api/system.windows.verticalalignment#fields) */
export type MSVerticalAlignmentEnum = "top" | "center" | "bottom" | "stretch";

/** Enum for text alignment. [More info...](https://learn.microsoft.com/en-us/dotnet/api/system.windows.textalignment#fields) */
export type MSTextAlignmentEnum = "left" | "right" | "center" | "justify";

/** Enum for text item type. */
export type MSTextItemTypeEnum = "basic" | "lyric" | "bible" | "3" | "4" | "5" | "text cue"

/** Enum for fast positioning state. */
export type MSFastPositioningStateEnum = 2;

/** Enum for time format. */
export type MSTimeFormatEnum = 0;

/** Enum for timer format. */
export type MSTimerFormatEnum = 0;

/** Enum for completed action. */
export type MSCompletedActionEnum = 0;

/** Font style values. [More info...](https://learn.microsoft.com/en-us/dotnet/api/system.windows.fontstyle) */
export type MSFontStyle = "normal" | "italic" | "oblique";

/** Font weight values. [More info...](https://learn.microsoft.com/en-us/dotnet/api/system.windows.fontweight) */
export type MSFontWeight = "thin" | "extralight" | "ultralight" | "light" | "normal" | "regular" | "medium" | "demibold" | "semibold" | "bold" | "extrabold" | "ultrabold" | "black" | "heavy" | "extrablack" | "ultrablack";

/** Color representation that will be turned into an int. */
export interface MSIntColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

/** Color representation that will be turned into a hex string. */
export interface MSHexColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

/** Drawing size representation that will be turned into a [`System.Drawing.Size`](https://learn.microsoft.com/en-us/dotnet/api/system.drawing.size). */
export interface MSDrawingSize {
	width: number;
	height: number;
}

/** Drawing rectangle representation that will be turned into a [`System.Drawing.Rectangle`](https://learn.microsoft.com/en-us/dotnet/api/system.drawing.rectangle) */
export interface MSDrawingRectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}