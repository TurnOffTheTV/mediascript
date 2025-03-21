/**
 * @file Class definitions for transitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSRawPageTransition, MSRawPageTransitionStoryboard} from "../raw";
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
	transition: MSPageTransitionNone;

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

/** Represents the properties of an `MSPageTransition`. */
class MSPageTransitionProperties extends MSObjectProperties {
	/** Duration of the transition. */
	duration: string;

	toJSON(){
		return {
			Duration: {
				$type: "System.TimeSpan, mscorlib",
				$value: this.duration
			}
		}
	}
}

/** Represents a MediaShout page transition. */
export class MSPageTransitionNone extends MSObject {
	/** Properties of the page transition. */
	properties: MSPageTransitionProperties = new MSPageTransitionProperties();;

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
			Properties: this.properties
		}
	}
}