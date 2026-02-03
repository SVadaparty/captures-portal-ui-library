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
  fs.readFileSync("src/components/dropdown.js", "utf8") +
  fs.readFileSync("src/components/radio.js", "utf8") +
  fs.readFileSync("src/components/checkbox.js", "utf8") +
  fs.readFileSync("src/components/datepicker", "utf8") +
  fs.readFileSync("src/components/fileUpload.js", "utf8") +
  fs.readFileSync("src/components/view_table.js", "utf8") +
  fs.readFileSync("src/components/model.js", "utf8") +
  fs.readFileSync("src/components/toast.js", "utf8") +
  fs.readFileSync("src/components/addressForm.js", "utf8") +
  fs.readFileSync("src/components/contact.js", "utf8") +
  fs.readFileSync("src/components/href.js", "utf8") +
  fs.readFileSync("src/components/header.js", "utf8") +
  fs.readFileSync("src/components/multiDropdown.js", "utf8") +
  fs.readFileSync("src/components/footer.js", "utf8") +
  fs.readFileSync("src/components/loader.js", "utf8") +
  fs.readFileSync("src/components/alert.js", "utf8") +
  fs.readFileSync("src/components/accordion.js", "utf8") +
  fs.readFileSync("src/components/email.js", "utf8") +
  fs.readFileSync("src/components/htmltopdf.js", "utf8") +
  fs.readFileSync("src/core/init.js", "utf8")+
  fs.readFileSync("src/components/tabs.js", "utf8")+
  fs.readFileSync("src/components/breadcrumbs.js", "utf8")+
  fs.readFileSync("src/components/sidebar.js", "utf8")+
  fs.readFileSync("src/components/card.js", "utf8")+
  fs.readFileSync("src/components/kpiTiles.js", "utf8");


fs.writeFileSync("dist/pp-ui-core.min.js", js);

console.log("✅ Build completed successfully");
