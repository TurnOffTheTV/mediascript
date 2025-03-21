/**
 * @file Raw script interfaces.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSEffectId,MSObjectTransitionId,MSPageTransitionId,MSVisualItemId} from "./types"

/** Raw script. */
export interface MSRawScript {
	Id: string,
	Version: string,
	readonly TypeId: "Script",
	Properties: {
		Name: string,
		WorkingAreaWidth: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		WorkingAreaHeight: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		StageAreaWidth: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		StageAreaHeight: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		}
	},
	Cues: Array<MSRawCue>
	KeyObjectsPage: MSRawKeyObjectsPage,
	AudioPlayer: MSRawAudioPlayerModel,
	VersionCreated: string,
	VersionUpdated: string
}

/** Raw key objects page. */
export interface MSRawKeyObjectsPage {
	Id: string,
	Version: string,
	readonly TypeId: "KeyObjectsPage",
	Properties: {},
	Items: Array<MSRawVisualItem>
	VisualLayers: Array<any>
	VisualItems: Array<{$ref: string}>
}

/** Raw audio player. */
export interface MSRawAudioPlayerModel {
	Id: string,
	Version: string,
	readonly TypeId: "AudioPlayerModel",
	Properties: {},
	AudioPlayLists: []
}

/** Raw cue. */
export interface MSRawCue {
	Id: string,
	Version: string,
	readonly TypeId: "Cue"
	Properties: {
		Name: string,
		MainBackgroundColor: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		StageBackgroundColor: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		Comment: string,
		IsExpanded: boolean,
		LastUpdateTime: {
			readonly $type: "System.DateTime, mscorlib",
			$value: string
		},
		Type: {
			readonly $type: "polino.model.Enums.CueType, polino.model",
			$value: 0
		},
		NextCueId: null | string,
		IsSkipped: boolean,
		IsMirrorMainOnStage: boolean,
		SplittingOptionsType: {
			readonly $type: "polino.model.Enums.SplittingOptionsType, polino.model",
			$value: 0
		},
		Source: string,
		Content: {
			readonly $type: "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.String, mscorlib]], mscorlib",
			$value: Object
		},
		ScheduledPlaybackType: {
			readonly $type: "polino.model.Enums.ScheduledPlaybackType, polino.model",
			$value: -1
		},
		ScheduledPlaybackTime: {
			readonly $type: "System.DateTime, mscorlib",
			$value: string
		},
		AdditionalInfo: null | string,
		WasWrapped: boolean
	},
	Pages: Array<MSRawPage>,
	MainAppliedTemplate: null,
	StageAppliedTemplate: null,
	MainBackgroundItem: null,
	StageBackgroundItem: null,
	BackgroundAudioItem: null,
	KeyDataObjectsPage: Object
}

/** Raw page. */
export interface MSRawPage {
	Id: string,
	Version: string,
	readonly TypeId: "Page",
	Properties: {
		Name: string,
		CustomName: string,
		Comment: string,
		IsTitlePage: boolean,
		IsSkipped: boolean,
		IsPinned: boolean,
		AutoAdvanceTime: {
			$type: "System.Int32, mscorlib",
			$value: number
		},
		AutoAdvanceItemId: null | string,
		AdditionalInfo: null | string
	},
	Items: Array<MSRawVisualItem>,
	VisualLayers: Array<any>,
	VisualItems: Array<{$ref: string}>,
	Storyboard: MSRawPageTransitionStoryboard,
	Transition: null,
	StagePage: MSRawStagePageModel,
	AudioItems: Array<any>
}

/** Raw page storyboard. */
export interface MSRawPageTransitionStoryboard {
	Id: string,
	Version: string,
	readonly TypeId: "PageTransitionStoryboard";
	Properties: {
		Duration: {
			readonly $type: "System.TimeSpan, mscorlib",
			$value: string
		},
		Direction: {
			readonly $type: "polino.enums.TransitionDirection, polino.enums",
			$value: 0
		}
	},
	Duration: string,
	Transition: MSRawPageTransition,
}

/** Raw page transition. */
export interface MSRawPageTransition {
	Id: string,
	Version: string,
	TypeId: MSPageTransitionId,
	Properties: {
		Duration: {
			$type: "System.TimeSpan, mscorlib",
			$value: string
		}
	}
}

/** Raw stage page model. */
export interface MSRawStagePageModel {
	Id: string,
	Version: string,
	readonly TypeId: "StagePageModel",
	Properties: {
		Name: string,
		CustomName: string,
		Comment: string,
		IsTitlePage: boolean,
		IsSkipped: boolean,
		IsPinned: boolean,
		AutoAdvanceTime: {
			$type: "System.Int32, mscorlib",
			$value: number
		},
		AutoAdvanceItemId: null | string,
		AdditionalInfo: null | string
	},
	Items: Array<MSRawVisualItem>,
	VisualLayers: Array<any>,
	VisualItems: Array<{$ref: string}>,
	Storyboard: MSRawPageTransitionStoryboard,
	Transition: null,
	AudioItems: Array<any>
}

/** Raw visual item. */
export interface MSRawVisualItem {
	$id: string,
	readonly $type: "polino.persistence.Models.VisualItem, polino.persistence",
	Id: string,
	Version: string,
	TypeId: MSVisualItemId,
	Properties: {
		Name: string,
		X: number,
		Y: number,
		Width: number,
		Height: number,
		Angle: number,
		IsLocked: boolean,
		IsVisible: boolean,
		Text: string,
		Type: {
			readonly $type: "polino.model.Enums.TextItemType, polino.model",
			$value: 0
		}
		Description: string,
		LinkedId: string,
		LinkedPosition: {
			$type: "System.Int32, mscorlib",
			$value: number
		},
		SeparatedPosition: {
			$type: "System.Int32, mscorlib",
			$value: number
		},
		Snapshot: string,
		HasPageBreak: boolean,
		HasParagraph: boolean
	},
	Effects: Array<MSRawEffect>
	Storyboard: MSRawObjectTransitionStoryboard
}

/** Raw effect. */
export interface MSRawEffect {
	Id: string,
	Version: string,
	TypeId: MSEffectId,
	Properties: {
		Opacity?: number,
		FlipHorizontal?: boolean,
		FlipVertical?: boolean,
		Color?: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		Size?: number,
		BackgroundColor?: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		OutlineColor?: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		ShadowColor?: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		BackgroundOpacity?: number,
		OutlineOpacity?: number,
		ShadowOpacity?: number,
		OutlineThickness?: number,
		ShadowAngle?: number,
		ShadowOffset?: number,
		ShadowBlurRadius: {
			readonly $type: "System.Int32, mscorlib",
			$value: number
		},
		VerticalAlignment: {
			readonly $type: "System.Windows.VerticalAlignment, PresentationFramework",
			$value: 0 | 1 | 2 | 3
		}
	}
}

/** Raw item storyboard. */
export interface MSRawObjectTransitionStoryboard {
	Id: string,
	Version: string,
	readonly TypeId: "ObjectTransitionStoryboard",
	Properties: {
		Duration: {
			readonly $type: "System.TimeSpan, mscorlib",
			$value: string
		},
		Direction: {
			readonly $type: "polino.enums.TransitionDirection, polino.enums",
			$value: 0
		},
		Delay: {
			readonly $type: "System.TimeSpan, mscorlib",
			$value: string
		},
		StepsOffset: {
			$type: "System.UInt32, mscorlib",
			$value: number
		}
	},
	Duration: string,
	StepsOffset: number,
	Delay: string,
	Transition: MSRawObjectTransition
}

/** Raw object transition. */
export interface MSRawObjectTransition {
	Id: string,
	Version: string,
	TypeId: MSObjectTransitionId,
	Properties: {}
}