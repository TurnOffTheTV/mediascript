/**
 * @file Raw script interfaces.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSPageTransitionId} from "./types"

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
	Items: Array<any>
	VisualLayers: Array<any>
	VisualItems: Array<any>
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
	Items: Array<any>,
	VisualLayers: Array<any>,
	VisualItems: Array<any>,
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
	Items: Array<any>,
	VisualLayers: Array<any>,
	VisualItems: Array<any>,
	Storyboard: MSRawPageTransitionStoryboard,
	Transition: null,
	AudioItems: Array<any>
}