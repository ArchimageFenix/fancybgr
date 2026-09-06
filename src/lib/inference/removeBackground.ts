import {
  prepareImage,
} from "@/lib/image/prepareImage";

import {
  runBackgroundRemovalWorker,
} from "@/lib/inference/backgroundRemovalWorkerClient";

export type ProcessingProgressHandler = (
  progress: number,
  stage: string,
) => void;

export async function removeBackground(
  file: File,
  onProgress?: ProcessingProgressHandler,
): Promise<Blob> {
  onProgress?.(
    0,
    "Preparing image",
  );

  const preparedImage =
    await prepareImage(file);

  onProgress?.(
    25,
    "Running AI",
  );

  const result =
    await runBackgroundRemovalWorker(
      preparedImage,
      onProgress,
    );

  onProgress?.(
    100,
    "Completed",
  );

  return result;
}