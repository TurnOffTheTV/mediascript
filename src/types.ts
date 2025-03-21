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

/** Enum for transition direction. */
export type MSTransitionDirectionEnum = 0;

/** Color representation that will be turned into an int. */
export interface MSIntColor {
	r: number;
	g: number;
	b: number;
	a: number;
}