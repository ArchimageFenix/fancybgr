function canvasToPng(
  source: CanvasImageSource,
  width: number,
  height: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas =
      document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const context =
      canvas.getContext("2d");

    if (!context) {
      reject(
        new Error(
          "Could not create canvas context.",
        ),
      );

      return;
    }

    context.drawImage(
      source,
      0,
      0,
      width,
      height,
    );

    canvas.toBlob(
      (blob) => {
        // Release the large pixel buffer held by
        // this temporary canvas before continuing.
        canvas.width = 1;
        canvas.height = 1;

        if (!blob) {
          reject(
            new Error(
              "Could not prepare image.",
            ),
          );

          return;
        }

        resolve(blob);
      },
      "image/png",
    );
  });
}

async function prepareWithImageBitmap(
  file: File,
): Promise<Blob | null> {
  if (
    typeof createImageBitmap !==
    "function"
  ) {
    return null;
  }

  try {
    const bitmap =
      await createImageBitmap(file);

    try {
      return await canvasToPng(
        bitmap,
        bitmap.width,
        bitmap.height,
      );
    } finally {
      bitmap.close();
    }
  } catch {
    return null;
  }
}

function prepareWithHtmlImage(
  file: File,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const objectUrl =
      URL.createObjectURL(file);

    const image =
      new Image();

    const cleanup = () => {
      URL.revokeObjectURL(
        objectUrl,
      );
    };

    image.onload = async () => {
      try {
        const blob =
          await canvasToPng(
            image,
            image.naturalWidth,
            image.naturalHeight,
          );

        resolve(blob);
      } catch {
        resolve(null);
      } finally {
        cleanup();
      }
    };

    image.onerror = () => {
      cleanup();
      resolve(null);
    };

    image.src = objectUrl;
  });
}

export async function prepareImage(
  file: File,
): Promise<Blob> {
  const bitmapResult =
    await prepareWithImageBitmap(
      file,
    );

  if (bitmapResult) {
    return bitmapResult;
  }

  const imageResult =
    await prepareWithHtmlImage(
      file,
    );

  if (imageResult) {
    return imageResult;
  }

  throw new Error(
    "The image could not be decoded.",
  );
}