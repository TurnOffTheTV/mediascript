/**
 * @file Class definitions for transitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSRawObjectTransition, MSRawPageTransition, MSRawPageTransitionStoryboard} from "../raw";
import {MSTransitionDirectionEnum} from "../types";
import {MSObject,MSObjectProperties} from "./Object";

/** Represents the properties of an `MSPageStoryboard`. */
class MSPageStoryboardProperties extends MSObjectProperties {
	/** Duration of the transition. */
	duration: string;
	/** Direction of the transition. */
	direction: MSTransitionDirectionEnum;

	toJSON(){
		return {
			Duration: {
				$type: "System.TimeSpan, mscorlib",
				$value: this.duration
			},
			Direction: {
				$type: "polino.enums.TransitionDirection, polino.enums",
				$value: this.direction
			}
		}
	}
}

/** Represents a MediaShout page transition storyboard. */
export class MSPageStoryboard extends MSObject {
	/** Properties of the storyboard. */
	properties: MSPageStoryboardProperties = new MSPageStoryboardProperties();;
	/** Duration of the transition. */
	duration: string;
	/** The storyboard's page transition object. */
	transition: MSPageTransition;

	/**
	 * @param {MSRawPageTransitionStoryboard} [json] The storyboard's raw json object.
	 */
	constructor(json?: MSRawPageTransitionStoryboard){
		super();

		if(json && json.TypeId==="PageTransitionStoryboard"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.duration=json.Properties.Duration.$value;
			this.properties.direction=json.Properties.Direction.$value;
		}
	}
}

/** Base page transition class. */
class MSPageTransition extends MSObject {
	/** Properties of the page transition. */
	properties: {
		/** Duration of the transition. */
		duration: string
	};
}

/** Represents a "none" page transition. */
export class MSPageTransitionNone extends MSPageTransition {
	/**
	 * @param {MSRawPageTransition} [json] The page transition's raw json object.
	 */
	constructor(json?: MSRawPageTransition){
		super();

		if(json && json.TypeId==="PageTransition+None"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.duration=json.Properties.Duration.$value;
		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "PageTransition+None",
			Properties: {
				Duration: {
					$type: "System.TimeSpan, mscorlib",
					$value: this.properties.duration
				}
			}
		}
	}
}

/** Represents the properties of an `MSVisualItemStoryboard`. */
class MSVisualItemStoryboardProperties extends MSObjectProperties {
	/** Duration of the transition. */
	duration: string;
	/** Direction of the transition. */
	direction: MSTransitionDirectionEnum;
	/** Delay of the transition. */
	delay: string;
	/** `StepsOffset` (use unknown) */
	stepsOffset: number;

	toJSON(){
		return {
			Duration: {
				$type: "System.TimeSpan, mscorlib",
				$value: this.duration
			},
			Direction: {
				$type: "polino.enums.TransitionDirection, polino.enums",
				$value: this.direction
			},
			Delay: {
				$type: "System.TimeSpan, mscorlib",
				$value: this.delay
			},
			StepsOffset: {
				$type: "System.UInt32, mscorlib",
				$value: this.stepsOffset
			}
		}
	}
}

/** Represents a MediaShout visual item transition storyboard. */
export class MSVisualItemStoryboard extends MSObject {
	/** Properties of the storyboard. */
	properties: MSVisualItemStoryboardProperties;
	/** Duration of the transition. */
	duration: string;
	/** `StepsOffset` (use unknown) */
	stepsOffset: number;
	/** Delay of the transition. */ 
	delay: string;
	/** The storyboard's visual item transition object. */
	transition: MSVisualItemTransition;
}

/** Base visual item transition class. */
class MSVisualItemTransition extends MSObject {
	/** Properties of the visual item transition. */
	properties: {
		/** Duration of the transition. */
		duration?: string
	};
}

/** Represents a "none" visual item transition. */
export class MSVisualItemTransitionNone extends MSVisualItemTransition {
	/**
	 * @param {MSRawObjectTransition} [json] The page transition's raw json object.
	 */
	constructor(json?: MSRawObjectTransition){
		super();

		if(json && json.TypeId==="ObjectTransition+None"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties={};
		}
	}
}