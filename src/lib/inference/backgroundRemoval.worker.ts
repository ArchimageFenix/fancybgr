import {
  removeBackground as removeBackgroundImgly,
} from "@imgly/background-removal";

interface ProcessImageMessage {
  type: "process";
  id: string;
  image: Blob;
}

interface ProgressMessage {
  type: "progress";
  id: string;
  progress: number;
  stage: string;
}

interface CompleteMessage {
  type: "complete";
  id: string;
  result: Blob;
}

interface ErrorMessage {
  type: "error";
  id: string;
  error: string;
}

type WorkerResponse =
  | ProgressMessage
  | CompleteMessage
  | ErrorMessage;

self.onmessage = async (
  event: MessageEvent<ProcessImageMessage>,
) => {
  const { type, id, image } = event.data;

  if (type !== "process") {
    return;
  }

  try {
    const result =
      await removeBackgroundImgly(
        image,
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
              !key.includes("compute")
            ) {
              return;
            }

            const fraction =
              total > 0
                ? current / total
                : 0;

            const progress =
              25 +
              Math.round(
                fraction * 70,
              );

            const message: WorkerResponse = {
              type: "progress",
              id,
              progress: Math.min(
                progress,
                95,
              ),
              stage:
                "Removing background",
            };

            self.postMessage(
              message,
            );
          },
        },
      );

    const message: WorkerResponse = {
      type: "complete",
      id,
      result,
    };

    self.postMessage(
      message,
    );
  } catch (error) {
    const message: WorkerResponse = {
      type: "error",
      id,
      error:
        error instanceof Error
          ? error.message
          : "Background removal failed.",
    };

    self.postMessage(
      message,
    );
  }
};

export {};