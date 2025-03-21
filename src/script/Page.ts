/**
 * @file `MSPage` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSRawPage, MSRawStagePageModel} from "../raw";
import {MSObject,MSObjectProperties} from "./Object"
import {MSPageStoryboard} from "./Transition"

/** Represents the properties of an `MSPage`. */
class MSPageProperties extends MSObjectProperties {
	/** The page's name. */
	name: string;
	/** The page's custom name. */
	customName: string;
	/** Page comment in sidebar. */
	comment: string;
	/** If page is a title page. */
	titlePage: boolean;
	/** If page is skipped. */
	skipped: boolean;
	/** If page is pinned. (use unknown) */
	pinned: boolean;
	/** `AutoAdvanceTime` (use unknown) */
	autoAdvanceTime: number;
	/** `AutoAdvanceItemId` (use unknown) */
	autoAdvanceItem: any;
	/** `AdditionalInfo` (use unknown) */
	additionalInfo: null | string;

	toJSON(){
		return {
			Name: this.name,
			CustomName: this.customName,
			Comment: this.comment,
			IsTitlePage: this.titlePage,
			IsSkipped: this.skipped,
			IsPinned: this.pinned,
			AutoAdvanceTime: {
				$type: "System.Int32, mscorlib",
				$value: this.autoAdvanceTime
			},
			AutoAdvanceItemId: this.autoAdvanceItem,
			AdditionalInfo: this.additionalInfo
		}
	}
}

/** Represents a MediaShout page. */
export class MSPage extends MSObject {
	/** Properties of the page. */
	properties: MSPageProperties = new MSPageProperties();;
	/** The page's items. */
	items: Array<any>;
	/** `VisualLayers` (use unknown) */
	visualLayers: Array<any>;
	/** `VisualItems` (use unknown) */
	visualItems: Array<any>;
	/** `Storyboard` (use unknown) */
	storyboard: MSPageStoryboard;
	/** `Transition` (values unknown) */
	transition: null;
	/** `StagePage` */
	stagePage: MSStagePage;
	/** `AudioItems` (use unknown) */
	audioItems: Array<any>

	/**
	 * @param {MSRawPage} [json] The page's raw parsed JSON object. 
	 */
	constructor(json?: MSRawPage){
		super();

		if(json && json.TypeId==="Page"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.customName=json.Properties.CustomName;
			this.properties.comment=json.Properties.Comment;
			this.properties.titlePage=json.Properties.IsTitlePage;
			this.properties.skipped=json.Properties.IsSkipped;
			this.properties.pinned=json.Properties.IsPinned;
			this.properties.autoAdvanceTime=json.Properties.AutoAdvanceTime.$value;
			this.properties.autoAdvanceItem=json.Properties.AutoAdvanceItemId;
			this.properties.additionalInfo=json.Properties.AdditionalInfo;

		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Page",
			Properties: this.properties,
			Items: [],
			VisualLayers: [],
			VisualItems: [],
			Storyboard: {},
			Transition: this.transition,
			StagePage: {},
			AudioItems: []
		}
	}
}

/** Represents the page displayed on the stage display. */
export class MSStagePage extends MSObject {
	/** Properties of the page. */
	properties: MSPageProperties;
	/** The page's items. */
	items: Array<any>;
	/** `VisualLayers` (use unknown) */
	visualLayers: Array<any>;
	/** `VisualItems` (use unknown) */
	visualItems: Array<any>;
	/** `Storyboard` (use unknown) */
	storyboard: Object;
	/** `Transition` (values unknown) */
	transition: null;
	/** `AudioItems` (use unknown) */
	audioItems: Array<any>

	/**
	 * @param {MSRawStagePageModel} [json] The stage page's raw parsed JSON object. 
	 */
	constructor(json?: MSRawStagePageModel){
		super();

		if(json && json.TypeId==="StagePageModel"){
			//Set main properties
			this.id=json.Id;
			this.version=json.Version;

			//Set properties properties
			this.properties.name=json.Properties.Name;
			this.properties.customName=json.Properties.CustomName;
			this.properties.comment=json.Properties.Comment;
			this.properties.titlePage=json.Properties.IsTitlePage;
			this.properties.skipped=json.Properties.IsSkipped;
			this.properties.pinned=json.Properties.IsPinned;
			this.properties.autoAdvanceTime=json.Properties.AutoAdvanceTime.$value;
			this.properties.autoAdvanceItem=json.Properties.AutoAdvanceItemId;
			this.properties.additionalInfo=json.Properties.AdditionalInfo;

		}
	}

	toJSON(){
		return {
			Id: this.id,
			Version: this.version,
			TypeId: "StagePageModel",
			Properties: this.properties,
			Items: [],
			VisualLayers: [],
			VisualItems: [],
			Storyboard: {},
			Transition: this.transition,
			AudioItems: []
		}
	}
}