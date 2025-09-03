import { uploadFileViaApi } from "@/lib/server/uploadFile";

export async function uploadProductFiles({
  category,
  images,
  bookFile,
  musicFile,
  digitalFile,
}: {
  category: string;
  images: File[];
  bookFile?: File | null;
  musicFile?: File | null;
  digitalFile?: File | null;
}) {
  const imageUrls = await Promise.all(
    images.map((file) => uploadFileViaApi(file, `products/${category}/images`))
  );

  let pdfUrl: string | null = null;
  let audioUrl: string | null = null;
  let fileUrl: string | null = null;

  if (bookFile) pdfUrl = await uploadFileViaApi(bookFile, "products/Books/pdfs");
  if (musicFile) audioUrl = await uploadFileViaApi(musicFile, "products/Music/audio");
  if (digitalFile) fileUrl = await uploadFileViaApi(digitalFile, "products/Digital/files");

  return { imageUrls, pdfUrl, audioUrl, fileUrl };
}
