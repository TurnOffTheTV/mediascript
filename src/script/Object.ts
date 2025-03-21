/**
 * @file `MSObject` and related class definitions.
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

import {generateNewId} from "../internal-functions"

/** Base class for script object properties. */
export class MSObjectProperties {}

/** Base class for script objects. */
export class MSObject {
	/** Id of this object. */
	id: string = "";
	/** Version of this object. */
	version: string = "7.0.0.0";
	/** Properties of this object. */
	properties: MSObjectProperties;

	constructor(){
		this.id=generateNewId();
	}
}