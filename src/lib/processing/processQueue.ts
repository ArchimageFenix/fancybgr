import type { ImageItem } from "@/types/image";

export type ImageProcessor = (image: ImageItem) => Promise<string>;

export type QueueStatusHandler = (
  image: ImageItem,
) => void;

export async function processImageQueue(
  images: ImageItem[],
  processor: ImageProcessor,
  onStatusChange?: QueueStatusHandler,
): Promise<ImageItem[]> {
  const results: ImageItem[] = [];

  for (const image of images) {
    const processingImage: ImageItem = {
      ...image,
      status: "processing",
      error: undefined,
      resultUrl: undefined,
    };

    onStatusChange?.(processingImage);

    try {
      const resultUrl = await processor(processingImage);

      const completedImage: ImageItem = {
        ...processingImage,
        status: "completed",
        resultUrl,
      };

      results.push(completedImage);
      onStatusChange?.(completedImage);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Image processing failed.";

      const failedImage: ImageItem = {
        ...processingImage,
        status: "error",
        error: errorMessage,
      };

      results.push(failedImage);
      onStatusChange?.(failedImage);
    }
  }

  return results;
}