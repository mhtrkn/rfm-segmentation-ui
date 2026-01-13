/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const RECORD_COUNT = 150;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const data = Array.from({ length: RECORD_COUNT }, (_, i) => ({
  id: i + 1,
  recency: randomInt(1, 365),
  frequency: randomInt(1, 50),
  monetary: randomInt(100, 50000),
}));

const outputPath = path.join(
  process.cwd(),
  "src",
  "data",
  "data.json"
);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log("✔ data.json generated");
