"use client";

import { useRef, useState } from "react";

import type { ImageItem } from "@/types/image";
import { processImageQueue } from "@/lib/processing/processQueue";
import { processImage } from "@/lib/processing/processImage";
import ImageCard from "@/components/upload/ImageCard";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const SUPPORTED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export default function UploadArea() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addImages = (files: FileList | File[]) => {
    const validImages: ImageItem[] = [];
    const rejectedFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (!SUPPORTED_TYPES.has(file.type)) {
        rejectedFiles.push(`${file.name}: unsupported format`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        rejectedFiles.push(`${file.name}: exceeds 20 MB`);
        return;
      }

      validImages.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: "selected",
        progress: 0,
        progressStage: "Waiting",
      });
    });

    if (rejectedFiles.length > 0) {
      setErrorMessage(
        `Some images could not be added: ${rejectedFiles.join(", ")}`,
      );
    } else {
      setErrorMessage(null);
    }

    if (validImages.length > 0) {
      setImages((current) => [...current, ...validImages]);
    }
  };

  const handleSelectClick = () => {
    if (!isProcessing) {
      inputRef.current?.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isProcessing) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (!isProcessing && event.dataTransfer.files.length > 0) {
      addImages(event.dataTransfer.files);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      addImages(event.target.files);
    }

    event.target.value = "";
  };

  const removeImage = (id: string) => {
    if (isProcessing) {
      return;
    }

    setImages((current) => {
      const image = current.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.previewUrl);

        if (image.resultUrl) {
          URL.revokeObjectURL(image.resultUrl);
        }
      }

      return current.filter((item) => item.id !== id);
    });
  };

  const handleProcessImages = async () => {
    if (images.length === 0 || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      await processImageQueue(
        images,
        processImage,
        (updatedImage) => {
          setImages((current) =>
            current.map((image) =>
              image.id === updatedImage.id ? updatedImage : image,
            ),
          );
        },
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (image: ImageItem) => {
    if (!image.resultUrl) {
      return;
    }

    const link = document.createElement("a");

    link.href = image.resultUrl;
    link.download = `${image.file.name.replace(
      /\.[^/.]+$/,
      "",
    )}-fancybgr.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      className="w-full max-w-4xl"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {images.length === 0 ? (
        <div
          className={`
            rounded-3xl
            border-2 border-dashed
            p-12
            text-center
            transition-all

            ${
              isDragging
                ? `
                  border-neutral-950
                  bg-neutral-100

                  dark:border-neutral-400
                  dark:bg-neutral-800

                  fancy:border-cyan-300/60
                  fancy:bg-cyan-400/[0.06]
                `
                : `
                  border-neutral-300
                  bg-white
                  hover:border-neutral-400

                  dark:border-white/15
                  dark:bg-[#131518]
                  dark:hover:border-white/25

                  fancy:border-cyan-300/20
                  fancy:bg-[#0d1a2b]/80
                  fancy:hover:border-cyan-300/40
                `
            }
          `}
        >
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <div
              className="
                mb-6
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-neutral-100
                text-neutral-800
                transition-all

                dark:bg-white/[0.06]
                dark:text-neutral-200

                fancy:border
                fancy:border-cyan-300/15
                fancy:bg-gradient-to-br
                fancy:from-cyan-400/10
                fancy:to-indigo-500/10
                fancy:text-cyan-300
                fancy:shadow-[0_8px_30px_rgba(34,211,238,0.06)]
              "
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
            </div>

            <h2
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-neutral-950
                transition-colors

                dark:text-white
                fancy:text-slate-50
              "
            >
              Drop your images here
            </h2>

            <p
              className="
                mt-3
                text-neutral-500
                transition-colors

                dark:text-neutral-400
                fancy:text-slate-400
              "
            >
              or select images from your device
            </p>

            <button
              type="button"
              onClick={handleSelectClick}
              className="
                mt-7
                rounded-full
                bg-neutral-950
                px-7 py-3
                text-sm font-medium
                text-white
                transition

                hover:bg-neutral-800

                dark:bg-white
                dark:text-neutral-950
                dark:hover:bg-neutral-200

                fancy:bg-gradient-to-r
                fancy:from-cyan-400
                fancy:via-blue-500
                fancy:to-indigo-500
                fancy:text-white
                fancy:shadow-[0_8px_28px_rgba(37,99,235,0.20)]
                fancy:hover:brightness-110
              "
            >
              Select images
            </button>

            <p
              className="
                mt-5
                text-xs
                text-neutral-400
                transition-colors

                dark:text-neutral-500
                fancy:text-slate-500
              "
            >
              PNG, JPG and WEBP · Up to 20 MB per image
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
            rounded-3xl
            border
            border-neutral-200
            bg-white
            p-6
            shadow-sm
            transition-all

            dark:border-white/10
            dark:bg-[#131518]

            fancy:border-cyan-300/15
            fancy:bg-[#0d1a2b]/85
            fancy:shadow-[0_18px_60px_rgba(0,0,0,0.20)]
          "
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-neutral-950
                  transition-colors

                  dark:text-white
                  fancy:text-slate-50
                "
              >
                Selected images
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-neutral-500
                  transition-colors

                  dark:text-neutral-400
                  fancy:text-slate-400
                "
              >
                {images.length}{" "}
                {images.length === 1 ? "image" : "images"} selected
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSelectClick}
                disabled={isProcessing}
                className="
                  rounded-full
                  border border-neutral-200
                  px-5 py-2.5
                  text-sm font-medium
                  text-neutral-700
                  transition

                  hover:border-neutral-300
                  hover:bg-neutral-50

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:border-white/10
                  dark:text-neutral-300
                  dark:hover:border-white/20
                  dark:hover:bg-white/[0.05]

                  fancy:border-cyan-300/20
                  fancy:text-slate-200
                  fancy:hover:border-cyan-300/40
                  fancy:hover:bg-cyan-300/[0.05]
                  fancy:hover:text-cyan-200
                "
              >
                Add more
              </button>

              <button
                type="button"
                onClick={handleProcessImages}
                disabled={isProcessing}
                className="
                  rounded-full
                  bg-neutral-950
                  px-5 py-2.5
                  text-sm font-medium
                  text-white
                  transition

                  hover:bg-neutral-800

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:bg-white
                  dark:text-neutral-950
                  dark:hover:bg-neutral-200

                  fancy:bg-gradient-to-r
                  fancy:from-cyan-400
                  fancy:via-blue-500
                  fancy:to-indigo-500
                  fancy:text-white
                  fancy:shadow-[0_8px_28px_rgba(37,99,235,0.18)]
                  fancy:hover:brightness-110
                "
              >
                {isProcessing
                  ? "Processing..."
                  : "Remove backgrounds"}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div
              className="
                mb-5
                rounded-2xl
                border border-red-200
                bg-red-50
                px-4 py-3
                text-sm
                text-red-700

                dark:border-red-500/20
                dark:bg-red-500/10
                dark:text-red-300

                fancy:border-red-400/20
                fancy:bg-red-400/[0.08]
                fancy:text-red-300
              "
            >
              {errorMessage}
            </div>
          )}

          <div className="max-h-[520px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  isProcessing={isProcessing}
                  onRemove={removeImage}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}