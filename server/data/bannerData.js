const { log } = require("node:console");
const { readFile, readFileSync } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");

const getBanner = async () => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/banner.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  const storedItems = data ?? [];
  return storedItems;
};

exports.getBanner = getBanner;
