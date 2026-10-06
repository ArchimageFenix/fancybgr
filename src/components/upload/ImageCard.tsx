import type { ImageItem } from "@/types/image";

interface ImageCardProps {
  image: ImageItem;
  isProcessing: boolean;
  onRemove: (id: string) => void;
  onDownload: (image: ImageItem) => void;
}

function HourglassIcon({
  animated = false,
}: {
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`
        h-5 w-5
        shrink-0
        ${animated ? "animate-spin [animation-duration:1800ms]" : ""}
      `}
    >
      <path
        d="M7 3h10M7 21h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="
          M8 4
          C8 8 9.5 9.5 12 12
          C9.5 14.5 8 16 8 20

          M16 4
          C16 8 14.5 9.5 12 12
          C14.5 14.5 16 16 16 20
        "
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.5 6.5h5L12 10z"
        fill="currentColor"
        opacity="0.55"
      />

      <path
        d="M9.5 18h5L12 14.5z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export default function ImageCard({
  image,
  isProcessing,
  onRemove,
  onDownload,
}: ImageCardProps) {
  const stage =
    image.status === "processing"
    ? "Processing"
    : "Waiting";

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
          <div
            className="
              mt-3
              flex items-center
              gap-2
              text-neutral-400

              dark:text-neutral-500
              fancy:text-slate-500
            "
          >
            <HourglassIcon />

            <span className="text-xs font-medium">
              Waiting
            </span>
          </div>
        )}

        {image.status === "processing" && (
          <div
            className="
              mt-3
              flex items-center
              gap-2
              text-neutral-700

              dark:text-neutral-300
              fancy:text-cyan-300
            "
          >
            <HourglassIcon animated />

            <span
              className="
                truncate
                text-xs font-medium
              "
            >
              {stage}
            </span>
          </div>
        )}

        {image.status === "completed" &&
          image.resultUrl && (
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