export type ImageStatus =
  | "selected"
  | "processing"
  | "completed"
  | "error";

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  status: ImageStatus;
  resultUrl?: string;
  error?: string;
  progress?: number;
  progressStage?: string;
}