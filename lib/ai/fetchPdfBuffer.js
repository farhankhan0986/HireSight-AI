export async function fetchPdfBuffer(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch resume PDF");
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
