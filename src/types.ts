/**
 * @file Library type definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

/** Enum for cue type. */
export type MSCueTypeEnum = 0;

/** Enum for splitting type. */
export type MSSplittingOptionsTypeEnum = 0;

/** Enum for scheduled playback type. */
export type MSScheduledPlaybackTypeEnum = -1;

/** `TypeId`s for page transitions. */
export type MSPageTransitionId = "PageTransition+None";

/** `TypeId`s for object transitions */
export type MSObjectTransitionId = "ObjectTransition+None";

/** `TypeId`s for visual items. */
export type MSVisualItemId = "VisualItem+Text";

/** `TypeId`s for effects. */
export type MSEffectId = "Effect+CommonEffect" | "Effect+FlipEffect" | "Effect+OutlineEffect" | "Effect+TextEffect";

/** Enum for transition direction. */
export type MSTransitionDirectionEnum = 0;

/** Enum for vertical alignment. (https://learn.microsoft.com/en-us/dotnet/api/system.windows.verticalalignment#fields) */
export type MSVerticalAlignmentEnum = "top" | "center" | "bottom" | "stretch";

/** Color representation that will be turned into an int. */
export interface MSIntColor {
	r: number;
	g: number;
	b: number;
	a: number;
}