const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/build/pdf.js");

async function run() {
  const filePath = process.argv[2];
  const data = new Uint8Array(fs.readFileSync(filePath));

  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const strings = content.items.map(item => item.str);
    text += strings.join(" ") + " ";
  }

  process.stdout.write(
    text.replace(/\s+/g, " ").trim()
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
