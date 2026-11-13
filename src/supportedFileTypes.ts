/**
 * Catálogo dos tipos suportados pelos renderers embutidos.
 * MS Office / ODT exigem URL pública (iframe do Office Online).
 */
export type SupportedFileType = {
  /** Extensão sem ponto */
  extension: string;
  /** MIME types aceitos pelo renderer */
  mimeTypes: string[];
  /** Nome do renderer responsável */
  renderer: string;
  /** Observações de uso */
  notes?: string;
};

export const SUPPORTED_FILE_TYPES: SupportedFileType[] = [
  {
    extension: "bmp",
    mimeTypes: ["image/bmp"],
    renderer: "BMPRenderer",
  },
  {
    extension: "csv",
    mimeTypes: ["text/csv"],
    renderer: "CSVRenderer",
  },
  {
    extension: "odt",
    mimeTypes: ["application/vnd.oasis.opendocument.text"],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "doc",
    mimeTypes: ["application/msword"],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "docx",
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/octet-stream",
    ],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "gif",
    mimeTypes: ["image/gif"],
    renderer: "GIFRenderer",
  },
  {
    extension: "htm",
    mimeTypes: ["text/htm"],
    renderer: "HTMLRenderer",
  },
  {
    extension: "html",
    mimeTypes: ["text/html"],
    renderer: "HTMLRenderer",
  },
  {
    extension: "jpg",
    mimeTypes: ["image/jpg"],
    renderer: "JPGRenderer",
  },
  {
    extension: "jpeg",
    mimeTypes: ["image/jpeg"],
    renderer: "JPGRenderer",
  },
  {
    extension: "pdf",
    mimeTypes: ["application/pdf"],
    renderer: "PDFRenderer",
  },
  {
    extension: "png",
    mimeTypes: ["image/png"],
    renderer: "PNGRenderer",
  },
  {
    extension: "ppt",
    mimeTypes: ["application/vnd.ms-powerpoint"],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "pptx",
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "tif",
    mimeTypes: ["image/tif"],
    renderer: "TIFFRenderer",
  },
  {
    extension: "tiff",
    mimeTypes: ["image/tiff"],
    renderer: "TIFFRenderer",
  },
  {
    extension: "txt",
    mimeTypes: ["text/plain"],
    renderer: "TXTRenderer",
  },
  {
    extension: "xls",
    mimeTypes: ["application/vnd.ms-excel"],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "xlsx",
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    renderer: "MSDocRenderer",
    notes: "Somente URL pública (Office Online)",
  },
  {
    extension: "mp4",
    mimeTypes: ["video/mp4"],
    renderer: "VideoRenderer",
  },
  {
    extension: "mov",
    mimeTypes: ["video/quicktime"],
    renderer: "VideoRenderer",
  },
  {
    extension: "avi",
    mimeTypes: ["video/x-msvideo"],
    renderer: "VideoRenderer",
  },
  {
    extension: "webm",
    mimeTypes: ["video/webm"],
    renderer: "VideoRenderer",
  },
  {
    extension: "webp",
    mimeTypes: ["image/webp"],
    renderer: "WebPRenderer",
  },
];

/** Mapa extensão → MIME principal (útil para montar `documents`). */
export const FILE_TYPE_MIME_MAP = Object.fromEntries(
  SUPPORTED_FILE_TYPES.map((item) => [item.extension, item.mimeTypes[0]]),
) as Record<string, string>;

export const SUPPORTED_EXTENSIONS = SUPPORTED_FILE_TYPES.map(
  (item) => item.extension,
);
