import type { ImageItem } from "@/types/image";

interface ImageCardProps {
  image: ImageItem;
  isProcessing: boolean;
  onRemove: (id: string) => void;
  onDownload: (image: ImageItem) => void;
}

export default function ImageCard({
  image,
  isProcessing,
  onRemove,
  onDownload,
}: ImageCardProps) {
  const progress = image.progress ?? 0;
  const stage = image.progressStage ?? "Waiting";

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border border-neutral-200
        bg-neutral-50

        dark:border-white/10
        dark:bg-[#181a1e]

        fancy:border-cyan-300/15
        fancy:bg-[#10233a]/70
      "
    >
      <div
        className="relative aspect-square"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `
            linear-gradient(
              45deg,
              #d4d4d4 25%,
              transparent 25%
            ),
            linear-gradient(
              -45deg,
              #d4d4d4 25%,
              transparent 25%
            ),
            linear-gradient(
              45deg,
              transparent 75%,
              #d4d4d4 75%
            ),
            linear-gradient(
              -45deg,
              transparent 75%,
              #d4d4d4 75%
            )
          `,
          backgroundSize: "20px 20px",
          backgroundPosition:
            "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      >
        <img
          src={image.resultUrl ?? image.previewUrl}
          alt={image.file.name}
          className="h-full w-full object-cover"
        />

        {image.status === "completed" && (
          <div
            className="
              absolute left-2 top-2
              rounded-full
              bg-green-600
              px-3 py-1
              text-xs font-medium
              text-white
              shadow-sm

              fancy:border
              fancy:border-cyan-200/20
              fancy:bg-gradient-to-r
              fancy:from-cyan-400
              fancy:via-blue-500
              fancy:to-violet-500
              fancy:shadow-[0_6px_22px_rgba(59,130,246,0.28)]
            "
          >
            Done
          </div>
        )}

        {image.status === "error" && (
          <div className="absolute inset-x-2 bottom-2 rounded-xl bg-red-600/90 px-3 py-2 text-xs text-white">
            {image.error ?? "Processing failed."}
          </div>
        )}

        {image.status !== "processing" && (
          <button
            type="button"
            onClick={() => onRemove(image.id)}
            disabled={isProcessing}
            className="
              absolute right-2 top-2
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-black/70
              text-white
              opacity-0
              transition
              group-hover:opacity-100
              disabled:cursor-not-allowed
            "
            aria-label={`Remove ${image.file.name}`}
          >
            ×
          </button>
        )}
      </div>

      <div className="p-3">
        <p
          className="
            truncate
            text-sm font-medium
            text-neutral-800

            dark:text-neutral-200
            fancy:text-slate-100
          "
          title={image.file.name}
        >
          {image.file.name}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-neutral-400

            dark:text-neutral-500
            fancy:text-slate-500
          "
        >
          {(image.file.size / 1024 / 1024).toFixed(2)} MB
        </p>

        {image.status === "selected" && (
          <p
            className="
              mt-3
              text-xs
              text-neutral-400

              dark:text-neutral-500
              fancy:text-slate-500
            "
          >
            Waiting
          </p>
        )}

        {image.status === "processing" && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span
                className="
                  truncate
                  text-xs font-medium
                  text-neutral-600

                  dark:text-neutral-400
                  fancy:text-slate-400
                "
              >
                {stage}
              </span>

              <span
                className="
                  shrink-0
                  text-xs font-semibold
                  tabular-nums
                  text-neutral-900

                  dark:text-white
                  fancy:text-cyan-300
                "
              >
                {progress}%
              </span>
            </div>

            <div
              className="
                h-1.5
                overflow-hidden
                rounded-full
                bg-neutral-200

                dark:bg-white/10
                fancy:bg-cyan-950/40
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-neutral-900
                  transition-[width]
                  duration-300
                  ease-out

                  dark:bg-white
                  fancy:bg-gradient-to-r
                  fancy:from-cyan-400
                  fancy:via-blue-500
                  fancy:to-violet-500
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {image.status === "completed" && image.resultUrl && (
          <button
            type="button"
            onClick={() => onDownload(image)}
            className="
              mt-3
              w-full
              rounded-full
              bg-blue-600
              px-3 py-2
              text-xs font-medium
              text-white
              transition

              hover:bg-blue-700

              fancy:border
              fancy:border-cyan-200/10
              fancy:bg-gradient-to-r
              fancy:from-cyan-400
              fancy:via-blue-500
              fancy:to-violet-500
              fancy:shadow-[0_8px_24px_rgba(59,130,246,0.20)]
              fancy:hover:brightness-110
            "
          >
            Download Image
          </button>
        )}
      </div>
    </div>
  );
}