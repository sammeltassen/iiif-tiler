import { Glob } from "bun";
import { parseArgs } from "util";
import path from "node:path";
import { createSelection } from "bun-promptx";
import sharp, { type TileLayout, type TileOptions } from "sharp";

let inputFolder = "input";
let outputFolder = "output";
let filename: string | undefined = undefined;
let layout: TileLayout = "iiif3";
let id: string = "https://example.com/iiif";

async function selectInput() {
  const inputGlob = new Glob(`${inputFolder}/*`);
  let inputFiles = new Array();

  for await (const file of inputGlob.scan(".")) {
    inputFiles.push({ text: file.split("/")[1] });
  }

  if (inputFiles.length === 0) {
    throw new Error("No input files found");
  }

  inputFiles = inputFiles.filter((file) => file.text !== "README.md");

  const { selectedIndex } = createSelection(inputFiles, {
    headerText: "Select input file: ",
    perPage: 10,
  });

  if (selectedIndex === null) {
    throw new Error("Please select an input file");
  }

  filename = inputFiles[selectedIndex].text;
}

async function argsInput() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      file: {
        type: "string",
      },
      layout: {
        type: "string",
      },
      id: {
        type: "string",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  if (!values.file) {
    await selectInput();
  } else {
    filename = values.file;
  }

  if (values.layout) {
    layout = values.layout as TileLayout;
  }

  if (values.id) {
    id = values.id;
  }
}

await argsInput();

if (!filename) {
  throw new Error("Filename  is undefined");
}

const arrayBuffer = await Bun.file(
  path.join(inputFolder, filename)
).arrayBuffer();

// https://sharp.pixelplumbing.com/api-output#tile
const tileOptions: TileOptions = {
  size: 1024,
  layout,
  id,
};

const name = path.parse(filename).name;

sharp(arrayBuffer).tile(tileOptions).toFile(path.join(outputFolder, name));
