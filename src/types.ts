/**
 * @file Library type definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

/** Enum for cue type. (values unknown) */
export type MSCueTypeEnum = 0;

/** Enum for splitting type. (values unknown) */
export type MSSplittingOptionsTypeEnum = 0;

/** Enum for scheduled playback type. (values unknown) */
export type MSScheduledPlaybackTypeEnum = -1;

/** `TypeId`s for page transitions. */
export type MSPageTransitionId = "PageTransition+None" | "PageTransition+Cut" | "PageTransition+Dissolve" | "PageTransition+FlyIn" | "PageTransition+Ticker" | "PageTransition+Zoom";

/** `TypeId`s for object transitions */
export type MSObjectTransitionId = "ObjectTransition+None";

/** `TypeId`s for visual items. */
export type MSVisualItemId = "VisualItem+Text" | "VisualItem+Video" | "VisualItem+Clock" | "VisualItem+Timer" | "VisualItem+StageDataText";

/** `TypeId`s for effects. */
export type MSEffectId = "Effect+CommonEffect" | "Effect+FlipEffect" | "Effect+OutlineEffect" | "Effect+TextEffect" | "Effect+ShadowEffect" | "Effect+SepiaEffect" | "Effect+GrayscaleEffect" | "Effect+BlurEffect" | "Effect+InvertColorsEffect" | "Effect+HueRotateEffect" | "Effect+SaturationAdjustEffect" | "Effect+ContrastBrighnessAdjustEffect" | "Effect+VideoCropEffect" | "Effect+VideoPlayTimesEffect";

/** Enum for transition direction. (values unknown) */
export type MSTransitionDirectionEnum = 0;

/** Enum for vertical alignment. [More info...](https://learn.microsoft.com/en-us/dotnet/api/system.windows.verticalalignment#fields) */
export type MSVerticalAlignmentEnum = "top" | "center" | "bottom" | "stretch";

/** Enum for text item type. */
export type MSTextItemTypeEnum = 0;

/** Color representation that will be turned into an int. */
export interface MSIntColor {
	r: number;
	g: number;
	b: number;
	a: number;
}