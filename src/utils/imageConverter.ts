import heic2any from "heic2any";

/**
 * Detecta si un archivo es HEIC/HEIF basándose en tipo MIME o extensión
 */
const isHeicFile = (file: File): boolean => {
    const heicTypes = ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"];
    const heicExtensions = /\.(heic|heif)$/i;

    return heicTypes.includes(file.type.toLowerCase()) || heicExtensions.test(file.name);
};

/**
 * Convierte una imagen HEIC/HEIF a JPEG
 * Retorna el archivo original si no es HEIC o si la conversión falla
 */
export const convertHeicToJpeg = async (file: File): Promise<File> => {
    if (!isHeicFile(file)) {
        return file;
    }

    try {
        const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9,
        });

        // heic2any puede retornar un Blob o un array de Blobs (para secuencias)
        const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

        // Crear nuevo nombre de archivo con extensión .jpg
        const newFileName = file.name.replace(/\.(heic|heif)$/i, ".jpg");

        return new File([resultBlob], newFileName, { type: "image/jpeg" });
    } catch (error) {
        console.error("Error convirtiendo HEIC a JPEG:", error);
        // Retornar archivo original si la conversión falla
        return file;
    }
};

/**
 * Procesa múltiples archivos, convirtiendo HEIC a JPEG cuando sea necesario
 */
export const processImagesForUpload = async (files: File[]): Promise<File[]> => {
    const processedFiles = await Promise.all(
        files.map(async (file) => {
            return await convertHeicToJpeg(file);
        })
    );
    return processedFiles;
};
