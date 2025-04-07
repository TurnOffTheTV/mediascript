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

`scriptModel.json` contains the structure of the script. If you have a solid understanding of MediaShout's features, reading the file shouldn't be too hard.

Text on slides is stored as rich text format, and so can be edited with any program that supports RTF files.

Colors are stored as little-endian 32-bit signed integers. Each byte of the integer represents one color channel, for R,G,B, and A.

## sc7 File Format

The sc7 file format is exactly the same as the sc7x format, the only difference is that assets are not stored in the file. Asset thumbnails are still stored, though.

## Interesting Notes

MediaShout orders the file with the thumbnail data first and the ZIP afterwards, but it will accept a script file with those two flipped, as long as the values in the header reflect the change.

TODO: test removing the null padding byte
