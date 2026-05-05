import pdf from "pdf-parse";

export async function extractResumeText(buffer) {
  try {
    const data = await pdf(buffer);

    const cleanedText = data.text
      .replace(/\s+/g, " ")
      .trim();

    return cleanedText;

  } catch (error) {
    console.error("Resume text extraction failed:", error);
    return "";
  }
}
