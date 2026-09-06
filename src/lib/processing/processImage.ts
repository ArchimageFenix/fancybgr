import type { ImageItem } from "@/types/image";
import {
  removeBackground,
  type ProcessingProgressHandler,
} from "@/lib/inference/removeBackground";

export async function processImage(
  image: ImageItem,
  onProgress?: ProcessingProgressHandler,
): Promise<string> {
  const resultBlob =
    await removeBackground(
      image.file,
      onProgress,
    );

  return URL.createObjectURL(resultBlob);
}