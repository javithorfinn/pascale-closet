import { del } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Node.js runtime (default) — necesario para @vercel/blob

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { urls } = request.body as { urls: string[] };

  if (!Array.isArray(urls) || urls.length === 0) {
    return response.status(400).json({ error: "urls debe ser un array no vacío" });
  }

  // Filtrar solo URLs de Vercel Blob para no borrar nada externo accidentalmente
  const blobUrls = urls.filter((u) =>
    typeof u === "string" && u.includes("vercel-storage.com")
  );

  if (blobUrls.length === 0) {
    // No hay blobs propios que borrar (eran URLs externas del backend anterior)
    return response.status(200).json({ deleted: 0 });
  }

  await del(blobUrls);

  return response.status(200).json({ deleted: blobUrls.length });
}
