import type { ImageItem } from "@/types/image";

export function releaseImageResources(
  image: ImageItem,
): void {
  URL.revokeObjectURL(
    image.previewUrl,
  );

  if (image.resultUrl) {
    URL.revokeObjectURL(
      image.resultUrl,
    );
  }
}