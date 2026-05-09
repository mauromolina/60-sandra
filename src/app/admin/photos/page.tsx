"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { CheckCircle, XCircle, Image } from "lucide-react";
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
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif italic text-lg text-charcoal">Fotos</h2>
        <span className="font-sans text-xs text-warm-gray bg-white px-3 py-1.5 rounded-lg border border-gold/10">
          {photos.length} {photos.length === 1 ? "foto" : "fotos"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl border border-gold/10 shadow-sm shadow-gold/5 overflow-hidden group"
          >
            <div className="relative">
              <img
                src={photo.publicUrl}
                alt={`Foto de ${photo.contributorName}`}
                className="w-full h-44 object-cover"
              />
              <span
                className={`absolute top-2.5 right-2.5 font-sans text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${
                  photo.status === "approved"
                    ? "bg-sage/80 text-white"
                    : photo.status === "rejected"
                      ? "bg-red-500/80 text-white"
                      : "bg-white/80 text-gold"
                }`}
              >
                {photo.status === "approved"
                  ? COPY.admin.approved
                  : photo.status === "rejected"
                    ? COPY.admin.rejected
                    : COPY.admin.pending}
              </span>
            </div>
            <div className="p-3.5">
              <p className="font-sans text-xs font-medium text-charcoal">
                {photo.contributorName}
              </p>
              {photo.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => updateStatus(photo.id, "approved")}
                    className="bg-sage hover:bg-sage-dark text-white text-xs h-8 rounded-lg flex-1 transition-all"
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    {COPY.admin.approve}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(photo.id, "rejected")}
                    className="text-xs h-8 rounded-lg border-red-200/60 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex-1 transition-all"
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1.5" />
                    {COPY.admin.reject}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <Image className="h-8 w-8 text-warm-gray/30 mx-auto mb-3" />
            <p className="font-sans text-sm text-warm-gray">
              No hay fotos todavía.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
