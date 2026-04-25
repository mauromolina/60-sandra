"use client";

import { useState, useCallback } from "react";

interface PhotoUploadResult {
  upload: (file: File, contributorName: string) => Promise<void>;
  isUploading: boolean;
  progress: number;
  isSuccess: boolean;
  error: Error | null;
}

export const usePhotoUpload = (): PhotoUploadResult => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(async (file: File, contributorName: string): Promise<void> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("contributorName", contributorName);

      setProgress(30);

      const response = await fetch("/api/photos", {
        method: "POST",
        body: formData,
      });

      setProgress(80);

      if (!response.ok) throw new Error("Upload failed");

      setProgress(100);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Upload failed"));
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, isUploading, progress, isSuccess, error };
};
