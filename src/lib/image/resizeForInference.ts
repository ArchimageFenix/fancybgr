const DESKTOP_MAX_PIXELS =
  1920 * 1080;

const MOBILE_MAX_PIXELS =
  1024 * 1024;

export interface InferenceImage {
  originalSource: Blob;
  inferenceSource: Blob;
  originalWidth: number;
  originalHeight: number;
  inferenceWidth: number;
  inferenceHeight: number;
  resized: boolean;
}

interface ImageSize {
  width: number;
  height: number;
}

interface DecodedImage {
  source: CanvasImageSource;
  width: number;
  height: number;
  release: () => void;
}

export async function resizeForInference(
  file: File,
): Promise<InferenceImage> {
  const decoded =
    await decodeImage(file);

  try {
    const originalWidth =
      decoded.width;

    const originalHeight =
      decoded.height;

    const inferenceSize =
      calculateInferenceSize(
        originalWidth,
        originalHeight,
      );

    const resized =
      inferenceSize.width !==
        originalWidth ||
      inferenceSize.height !==
        originalHeight;

    const originalSource =
      await drawToBlob(
        decoded.source,
        originalWidth,
        originalHeight,
      );

    const inferenceSource =
      resized
        ? await drawToBlob(
            decoded.source,
            inferenceSize.width,
            inferenceSize.height,
          )
        : originalSource;

    return {
      originalSource,
      inferenceSource,
      originalWidth,
      originalHeight,
      inferenceWidth:
        inferenceSize.width,
      inferenceHeight:
        inferenceSize.height,
      resized,
    };
  } finally {
    decoded.release();
  }
}

async function decodeImage(
  file: File,
): Promise<DecodedImage> {
  try {
    const bitmap =
      await createImageBitmap(file);

    return {
      source: bitmap,
      width: bitmap.width,
      height: bitmap.height,

      release: () => {
        bitmap.close();
      },
    };
  } catch {
    return decodeWithImageElement(
      file,
    );
  }
}

function decodeWithImageElement(
  file: File,
): Promise<DecodedImage> {
  return new Promise(
    (resolve, reject) => {
      const objectUrl =
        URL.createObjectURL(file);

      const image =
        new Image();

      image.onload = () => {
        const width =
          image.naturalWidth;

        const height =
          image.naturalHeight;

        if (
          width <= 0 ||
          height <= 0
        ) {
          URL.revokeObjectURL(
            objectUrl,
          );

          reject(
            new Error(
              "The source image has invalid dimensions.",
            ),
          );

          return;
        }

        resolve({
          source: image,
          width,
          height,

          release: () => {
            image.src = "";

            URL.revokeObjectURL(
              objectUrl,
            );
          },
        });
      };

      image.onerror = () => {
        URL.revokeObjectURL(
          objectUrl,
        );

        reject(
          new Error(
            "The source image could not be decoded.",
          ),
        );
      };

      image.src = objectUrl;
    },
  );
}

function calculateInferenceSize(
  width: number,
  height: number,
): ImageSize {
  const maxPixels =
    isMobileDevice()
      ? MOBILE_MAX_PIXELS
      : DESKTOP_MAX_PIXELS;

  const totalPixels =
    width * height;

  if (
    totalPixels <= maxPixels
  ) {
    return {
      width,
      height,
    };
  }

  const scale =
    Math.sqrt(
      maxPixels /
        totalPixels,
    );

  return {
    width: Math.max(
      1,
      Math.round(
        width * scale,
      ),
    ),

    height: Math.max(
      1,
      Math.round(
        height * scale,
      ),
    ),
  };
}

function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(
    navigator.userAgent,
  );
}

async function drawToBlob(
  source: CanvasImageSource,
  width: number,
  height: number,
): Promise<Blob> {
  const canvas =
    document.createElement(
      "canvas",
    );

  canvas.width = width;
  canvas.height = height;

  const context =
    canvas.getContext(
      "2d",
      {
        alpha: true,
      },
    );

  if (!context) {
    throw new Error(
      "Canvas could not be initialized.",
    );
  }

  context.drawImage(
    source,
    0,
    0,
    width,
    height,
  );

  return canvasToBlob(
    canvas,
  );
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
): Promise<Blob> {
  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "The image could not be prepared for processing.",
              ),
            );

            return;
          }

          resolve(blob);
        },
        "image/png",
      );
    },
  );
}