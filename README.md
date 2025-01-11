# IIIF Tiler

Creates level 0 [IIIF Image API](https://iiif.io/api/image/3.0/) tiles of images in the `input` folder. Uses [Sharp](https://sharp.pixelplumbing.com/).

Output files are written in the `output` directory, in a directory with the same name (without extension) as the input file.

Flags:

- `--file` Filename of a file in the `input` folder. If not provided, the script will provide an input menu listing available files.
- `--id` Base URI of the `info.json` file, used for the `id` or `@id` property. Default: `https://example.com/iiif`, which results in `https://example.com/iiif/input-filename`.
- `--layout` Tile layout used, `iiif` or `iiif3`. Default `iiif3`.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

See also: [iiif-tiler](https://github.com/glenrobson/iiif-tiler)

This project was created using `bun init` in bun v1.1.39. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
