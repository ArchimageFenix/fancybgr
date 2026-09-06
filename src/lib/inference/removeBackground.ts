import {
  removeBackground as removeBackgroundImgly,
} from "@imgly/background-removal";

import {
  prepareImage,
} from "@/lib/image/prepareImage";

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
    await removeBackgroundImgly(
      preparedImage,
      {
        model: "isnet_fp16",
        device: "cpu",

        output: {
          format: "image/png",
          quality: 1,
        },

        progress: (
          key,
          current,
          total,
        ) => {
          if (
            key.includes("compute")
          ) {
            const fraction =
              total > 0
                ? current / total
                : 0;

            const progress =
              25 +
              Math.round(
                fraction * 70,
              );

            onProgress?.(
              Math.min(
                progress,
                95,
              ),
              "Removing background",
            );
          }
        },
      },
    );

  onProgress?.(
    100,
    "Completed",
  );

  return result;
}