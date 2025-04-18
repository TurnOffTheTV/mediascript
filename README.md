# MediaScript

TypeScript library for interfacing with MediaShout 7 files

This is a work-in-progress, if you find any bugs, post them in the Issues tab. This project can only generate sc7-style files (no packed assets) at the moment.

**This project is not affiliated with MediaShout in any way.**

## Supported Filetypes

* sc7x (Windows)
* sc7 (Windows)

If you get an error from this library or MediaShout while using this library, give as much info as you can in an issue.

For information about the sc7 and sc7x formats, see [sc7x.md](sc7x.md).

## Usage

### Installation

Install using npm:

```console
npm i mediascript
```

You can then import it into a project:

```ts
import {createScript} from "mediascript"

const {createScript} = require("mediascript");
```

### Functions

The `createScript()` function lets you create a new script.

```ts
import {createScript} from "mediascript"

const blankScript = createScript("blank");
```

`blobToScript()` and `scriptToBlob()` let you convert the script to and from an sc7 blob.

```ts
import {blobToScript,scriptToBlob} from "mediascript"
import * as fs from "node:fs"

//Reading a script from file
const blankScript = await blobToScript(new Blob([fs.readFileSync("blank.sc7x")]));

//Writing a script to a file
fs.writeFileSync("blank.sc7",Buffer.from(await (await scriptToBlob(blankScript)).arrayBuffer()));
```
