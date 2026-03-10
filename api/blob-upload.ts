import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Node.js runtime (default) — handleUpload requiere crypto, stream, etc.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/avif",
            "image/heic",
            "image/heif",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB por archivo
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Blob upload completado:", blob.url);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}
