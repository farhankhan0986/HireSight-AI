const fs = require("fs");
const pdfParse = require("pdf-parse");

async function run() {
  try {
    const filePath = process.argv[2];
    if (!filePath) {
      throw new Error("No file path provided");
    }
    
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    
    // Output extracted text cleanly
    process.stdout.write(data.text.replace(/\s+/g, " ").trim());
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
