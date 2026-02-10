import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

export async function extractResumeText(buffer) {
  const tempPath = join(tmpdir(), `resume-${Date.now()}.pdf`);
  const scriptPath = join(process.cwd(), "scripts", "parseResume.js");

  try {
    // Write temp PDF
    await writeFile(tempPath, buffer);

    // Run pure Node script with ABSOLUTE path
    const { stdout } = await exec("node", [
      scriptPath,
      tempPath,
    ]);

    return stdout.replace(/\s+/g, " ").trim();
  } catch (error) {
    console.error("Resume text extraction failed:", error);
    return "";
  } finally {
    // Cleanup temp file
    await unlink(tempPath).catch(() => {});
  }
}
