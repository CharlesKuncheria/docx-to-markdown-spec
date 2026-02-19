const { execSync } = require("child_process");
const path = require("path");

const deps = ["mammoth", "turndown"];
const nodeModules = path.join(__dirname, "node_modules");

// Auto-install missing dependencies
const missing = deps.filter((dep) => {
  try {
    require.resolve(path.join(nodeModules, dep));
    return false;
  } catch {
    return true;
  }
});

if (missing.length > 0) {
  console.error(`Installing ${missing.join(", ")}...`);
  execSync(
    `npm install --prefix ${JSON.stringify(__dirname)} ${missing.join(" ")}`,
    { stdio: "ignore" }
  );
}

const mammoth = require(path.join(nodeModules, "mammoth"));
const TurndownService = require(path.join(nodeModules, "turndown"));

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node extract.js <file.docx>");
  process.exit(1);
}

const resolved = path.resolve(filePath);
console.error(`Extracting text from: ${resolved}`);

// Step 1: docx → HTML (mammoth's actively maintained path)
// Step 2: HTML → Markdown (turndown)
mammoth
  .convertToHtml({ path: resolved })
  .then((result) => {
    if (result.messages.length > 0) {
      console.error(
        "Warnings:",
        result.messages.map((m) => m.message).join(", ")
      );
    }

    const turndown = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
    });

    console.log(turndown.turndown(result.value));
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
