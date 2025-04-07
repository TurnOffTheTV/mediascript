/**
 * @file `MSPage` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSRawPage,MSRawStagePageModel} from "../raw";
import {MSVisualItem,MSVisualItemClock,MSVisualItemImage,MSVisualItemNDISource,MSVisualItemNewsRibbon,MSVisualItemStageData,MSVisualItemText,MSVisualItemTimer,MSVisualItemVideo} from "./Item";
import {MSObject,MSObjectProperties} from "./Object";
import {MSPageStoryboard} from "./Transition";

/** Represents the properties of an `MSPage`. */
class MSPageProperties extends MSObjectProperties {
	/** The page's name. */
	name: string = "New page";
	/** The page's custom name. */
	customName: string = "";
	/** Page comment in sidebar. */
	comment: string = "";
	/** If page is a title page. */
	titlePage: boolean = false;
	/** If page is skipped. */
	skipped: boolean = false;
	/** If page is pinned. (use unknown) */
	pinned: boolean = false;
	/** `AutoAdvanceTime` (use unknown) */
	autoAdvanceTime: number = 0;
	/** `AutoAdvanceItemId` (use unknown) */
	autoAdvanceItem: any = null;
	/** `AdditionalInfo` (use unknown) */
	additionalInfo: null | string = null;

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
	items: Array<MSVisualItem> = [];
	/** `VisualLayers` (use unknown) */
	visualLayers: Array<any> = [];
	/** `Storyboard` (use unknown) */
	storyboard: MSPageStoryboard = new MSPageStoryboard();
	/** `Transition` (values unknown) */
	transition: null = null;
	/** `StagePage` */
	stagePage: MSStagePage = new MSStagePage();
	/** `AudioItems` (use unknown) */
	audioItems: Array<any> = [];

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

			//Set up items
			for(let i=0;i<json.Items.length;i++){
				switch(json.Items[i].TypeId){
					case "VisualItem+Text":
						this.items.push(new MSVisualItemText(json.Items[i]));
					break;
					case "VisualItem+Image":
						this.items.push(new MSVisualItemImage(json.Items[i]))
					break;
					case "VisualItem+Video":
						this.items.push(new MSVisualItemVideo(json.Items[i]));
					break;
					case "VisualItem+NdiVideoSource":
						this.items.push(new MSVisualItemNDISource(json.Items[i]));
					break;
					case "VisualItem+Clock":
						this.items.push(new MSVisualItemClock(json.Items[i]));
					break;
					case "VisualItem+Timer":
						this.items.push(new MSVisualItemTimer(json.Items[i]));
					break;
					case "VisualItem+StageDataText":
						this.items.push(new MSVisualItemStageData(json.Items[i]));
					break;
					case "VisualItem+NewsRibbon":
						this.items.push(new MSVisualItemNewsRibbon(json.Items[i]));
					break;
				}
			}

			//Set other properties
			this.storyboard=new MSPageStoryboard(json.Storyboard);
			this.transition=json.Transition;
			this.stagePage=new MSStagePage(json.StagePage);
		}
	}

	toJSON(){
		let items = [];
		let visualItems = [];

		for(let i=0;i<this.items.length;i++){
			items.push(this.items[i].toJSON());
			items[i].$id=(i+1).toString();
			items[i].$type="polino.persistence.Models.VisualItem, polino.persistence";
			visualItems.push({$ref: (i+1).toString()})
		}

		return {
			Id: this.id,
			Version: this.version,
			TypeId: "Page",
			Properties: this.properties,
			Items: items,
			VisualLayers: [],
			VisualItems: visualItems,
			Storyboard: this.storyboard,
			Transition: this.transition,
			StagePage: this.stagePage,
			AudioItems: this.audioItems
		}
	}
}

/** Represents the page displayed on the stage display. */
export class MSStagePage extends MSObject {
	/** Properties of the page. */
	properties: MSPageProperties = new MSPageProperties();;
	/** The page's items. */
	items: Array<MSVisualItem> = [];
	/** `VisualLayers` (use unknown) */
	visualLayers: Array<any> = [];
	/** `Storyboard` (use unknown) */
	storyboard: MSPageStoryboard = new MSPageStoryboard();
	/** `Transition` (values unknown) */
	transition: null = null;

	/**
	 * @param {MSRawStagePageModel} [json] The page's raw parsed JSON object. 
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

			//Set up items
			for(let i=0;i<json.Items.length;i++){
				switch(json.Items[i].TypeId){
					case "VisualItem+Text":
						this.items.push(new MSVisualItemText(json.Items[i]));
					break;
					case "VisualItem+Video":
						this.items.push(new MSVisualItemVideo(json.Items[i]));
					break;
				}
			}

			//Set other properties
			this.storyboard=new MSPageStoryboard(json.Storyboard);
			this.transition=json.Transition;
		}
	}

	toJSON(){
		let items = [];
		let visualItems = [];

		for(let i=0;i<this.items.length;i++){
			items.push(this.items[i].toJSON());
			items[i].$id=(i+1).toString();
			items[i].$type="polino.persistence.Models.VisualItem, polino.persistence";
			visualItems.push({$ref: (i+1).toString()})
		}

		return {
			Id: this.id,
			Version: this.version,
			TypeId: "StagePageModel",
			Properties: this.properties,
			Items: items,
			VisualLayers: [],
			VisualItems: visualItems,
			Storyboard: this.storyboard,
			Transition: this.transition
		}
	}
}