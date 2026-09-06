export interface LoadedImage {
  image: HTMLImageElement;
  width: number;
  height: number;
}

export async function loadImage(file: File): Promise<LoadedImage> {
  const url = URL.createObjectURL(file);

  try {
    const image = new Image();

    image.decoding = "async";

    image.src = url;

    await image.decode();

    if (!image.naturalWidth || !image.naturalHeight) {
      throw new Error("Unable to determine image dimensions.");
    }

    return {
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}