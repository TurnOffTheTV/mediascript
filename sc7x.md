# sc7x File Format

sc7x files contain PNG data for a thumbnail, and ZIP data containing all of the assets and the all-important `scriptModel.json`. The PNG and ZIP sections are seperated by a single null byte.

## Header

The header takes up the first 20 bytes of the sc7x file

| Byte length | Type   | Description                  |
| ----------- | ------ | ---------------------------- |
| 4 bytes     | string | File magic, should be `sc7x` |
| 4 bytes     | uint   | Offset of PNG data           |
| 4 bytes     | uint   | Length of PNG data           |
| 4 bytes     | uint   | Offset of ZIP data           |
| 4 bytes     | uint   | Length of ZIP data           |

## Thumbnail

This thumbnail is just a PNG. MediaShout outputs a resolution of 512 x 288. TODO: test a higher resolution.

## Assets

The assets are copied straight from the hard drive, and they will have the same filename as the original file. Each asset will also have a preview/thumbnail image, named with a random identifier.

## `scriptModel.json`

`scriptModel.json` contains the structure of the script. Read the code (particularly interfaces.ts and classes.ts) for an in-depth look at how everything is put together, but most of it makes sense.

Text on slides is stored in a rich text format. TODO: figure this out

Colors are stored as little-endian 32-bit signed integers. Each byte of the integer represents one color channel, for R,G,B, and A.

## Interesting Notes

TODO: What happens if you flip the order of the zip and the thumbnail?
TODO: What happens if you remove the padding byte.
