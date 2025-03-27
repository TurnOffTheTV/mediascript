/**
 * @file Class definitions for key objects.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {MSObject} from "./Object"
import {MSVisualItem,MSVisualItemClock,MSVisualItemImage,MSVisualItemStageData,MSVisualItemText,MSVisualItemTimer,MSVisualItemVideo} from "./Item"
import {MSRawKeyObjectsPage} from "../raw";

/** Represents a MediaShout key objects page. */
export class MSKeyObjectsPage extends MSObject {
	/** Properties of the key objects page (there are none). */
	properties: {} = {};
	/** The key objects page's items. */
	items: Array<MSVisualItem> = [];

	/**
	 * @param {MSRawKeyObjectsPage} [json] The key objects page's raw parsed JSON object. 
	 */
	constructor(json?: MSRawKeyObjectsPage){
		super();

		if(json && json.TypeId==="KeyObjectsPage"){
			//Set up main properties
			this.id=json.Id;
			this.version=json.Version;

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
					case "VisualItem+Clock":
						this.items.push(new MSVisualItemClock(json.Items[i]));
					break;
					case "VisualItem+Timer":
						this.items.push(new MSVisualItemTimer(json.Items[i]));
					break;
					case "VisualItem+StageDataText":
						this.items.push(new MSVisualItemStageData(json.Items[i]));
					break;
				}
			}
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
			TypeId: "KeyObjectsPage",
			Properties: {},
			Items: items,
			VisualLayers: [],
			VisualItems: visualItems
		}
	}
}