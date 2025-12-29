import fs from "fs";
import path from "path";

// Ensure dist folder exists
const distDir = path.resolve("dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Build CSS
const css =
  fs.readFileSync("src/styles/variables.css", "utf8") +
  fs.readFileSync("src/styles/base.css", "utf8");

fs.writeFileSync("dist/pp-ui-core.min.css", css);

// Build JS
const js =
  fs.readFileSync("src/consts/default.js", "utf8") +
  fs.readFileSync("src/components/button.js", "utf8") +
  fs.readFileSync("src/components/input.js", "utf8") +
  fs.readFileSync("src/core/init.js", "utf8");

fs.writeFileSync("dist/pp-ui-core.min.js", js);

console.log("✅ Build completed successfully");
