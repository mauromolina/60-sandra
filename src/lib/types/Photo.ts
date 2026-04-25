export type PhotoStatus = "pending" | "approved" | "rejected";

export interface Photo {
  id: string;
  storagePath: string;
  publicUrl: string;
  contributorName: string;
  status: PhotoStatus;
  createdAt: string;
}
