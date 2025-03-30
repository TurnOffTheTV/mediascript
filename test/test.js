const fs = require("node:fs")
const {blobToScript,scriptToBlob} = require("../dist/index.js");

/*let script = createScript("test");

let newCue = script.addCue("comment");

newCue.properties.name = "Fancy Comment Cue";
newCue.properties.comment = "This is a comment cue.";
*/

test();

async function test(){

	let script = await blobToScript(new Blob([fs.readFileSync("ndi.sc7x")]));

	fs.writeFileSync("ndi.scriptModel.json",JSON.stringify(script,null,2));
	fs.writeFileSync("output.ndi.sc7x",Buffer.from(await (await scriptToBlob(script)).arrayBuffer()));

}