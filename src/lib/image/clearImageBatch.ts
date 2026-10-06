import type { ImageItem } from "@/types/image";

import {
  releaseImageResources,
} from "@/lib/image/releaseImageResources";

export function clearImageBatch(
  images: ImageItem[],
): void {
  images.forEach((image) => {
    releaseImageResources(image);
  });
}