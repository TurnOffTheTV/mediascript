const fs = require("node:fs")
const {blobToScript,scriptToBlob} = require("../dist/index.js");

/*let script = createScript("test");

let newCue = script.addCue("comment");

newCue.properties.name = "Fancy Comment Cue";
newCue.properties.comment = "This is a comment cue.";
*/

test();

async function test(){

	let script = await blobToScript(new Blob([fs.readFileSync("blank.sc7")]));

	fs.writeFileSync("blank.scriptModel.json",JSON.stringify(script,null,2));
	fs.writeFileSync("output.blank.sc7",Buffer.from(await (await scriptToBlob(script)).arrayBuffer()));

}