const fs = require("node:fs")
const {createScript} = require("../dist/index.js");

let script = createScript("test");

fs.writeFileSync("test.scriptModel.json",JSON.stringify(script,null,2));
