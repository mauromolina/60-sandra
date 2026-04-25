"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import type { Photo, PhotoStatus } from "@/lib/types/Photo";

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const didFetch = useRef(false);

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/photos");
      const data = await response.json();
      setPhotos(data.data ?? []);
    } catch {
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    const fetchData = async () => {
      try {
        const response = await fetch("/api/photos");
        const data = await response.json();
        setPhotos(data.data ?? []);
      } catch {
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: PhotoStatus) => {
    await fetch(`/api/photos`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchPhotos();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white rounded-xl border border-gold/10 overflow-hidden"
        >
          <img
            src={photo.publicUrl}
            alt={`Foto de ${photo.contributorName}`}
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <p className="font-sans text-xs text-charcoal">
              {photo.contributorName}
            </p>
            <span
              className={`inline-block mt-1 font-sans text-[10px] px-2 py-0.5 rounded-full ${
                photo.status === "approved"
                  ? "bg-sage/10 text-sage-dark"
                  : photo.status === "rejected"
                    ? "bg-red-50 text-red-600"
                    : "bg-gold/10 text-gold"
              }`}
            >
              {photo.status === "approved"
                ? COPY.admin.approved
                : photo.status === "rejected"
                  ? COPY.admin.rejected
                  : COPY.admin.pending}
            </span>
            {photo.status === "pending" && (
              <div className="flex gap-1 mt-2">
                <Button
                  size="sm"
                  onClick={() => updateStatus(photo.id, "approved")}
                  className="bg-sage hover:bg-sage-dark text-white text-xs h-7 px-2 flex-1"
                >
                  {COPY.admin.approve}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(photo.id, "rejected")}
                  className="text-xs h-7 px-2 border-red-200 text-red-600 hover:bg-red-50 flex-1"
                >
                  {COPY.admin.reject}
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      {photos.length === 0 && (
        <p className="col-span-full text-center font-sans text-sm text-warm-gray py-8">
          No hay fotos todavia.
        </p>
      )}
    </div>
  );
}
