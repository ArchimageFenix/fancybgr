import type {
  ProcessingProgressHandler,
} from "@/lib/inference/removeBackground";

let workerRequestCounter = 0;

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

export function runBackgroundRemovalWorker(
  image: Blob,
  onProgress?: ProcessingProgressHandler,
): Promise<Blob> {
  return new Promise(
    (resolve, reject) => {
      const worker = new Worker(
        new URL(
          "./backgroundRemoval.worker.ts",
          import.meta.url,
        ),
        {
          type: "module",
        },
      );

      const id =
  `background-removal-${++workerRequestCounter}`;
      const cleanup = () => {
        worker.terminate();
      };

      worker.onmessage = (
        event: MessageEvent<WorkerResponse>,
      ) => {
        const message =
          event.data;

        if (
          message.id !== id
        ) {
          return;
        }

        if (
          message.type ===
          "progress"
        ) {
          onProgress?.(
            message.progress,
            message.stage,
          );

          return;
        }

        if (
          message.type ===
          "complete"
        ) {
          cleanup();
          resolve(message.result);
          return;
        }

        if (
          message.type ===
          "error"
        ) {
          cleanup();

          reject(
            new Error(
              message.error,
            ),
          );
        }
      };

      worker.onerror = (
        event,
      ) => {
        cleanup();

        reject(
          new Error(
            event.message ||
              "Background removal worker failed.",
          ),
        );
      };

      worker.postMessage({
        type: "process",
        id,
        image,
      });
    },
  );
}