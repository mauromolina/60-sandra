"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { COPY } from "@/lib/constants/copy";
import { useCelebrantName } from "@/contexts/CelebrantContext";
import { withName } from "@/lib/utils/copyUtils";

export const PhotoUploadSection = () => {
  const celebrantName = useCelebrantName();
  const [contributorName, setContributorName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { upload, isUploading, isSuccess, error } = usePhotoUpload();
  const { ref, isInView } = useScrollAnimation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !contributorName.trim()) return;
    await upload(selectedFile, contributorName.trim());
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center"
    >
      <SectionLabel>{COPY.photoUpload.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-6" />

      <div className="max-w-md mx-auto">
        <Camera className="h-8 w-8 text-gold mx-auto mb-4" />
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
          {withName(COPY.photoUpload.title, celebrantName)}
        </h3>
        <p className="font-sans text-sm text-charcoal-light mb-8">
          {COPY.photoUpload.subtitle}
        </p>

        {isSuccess ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle className="h-10 w-10 text-sage" />
            <p className="font-serif text-lg text-sage italic">
              {COPY.photoUpload.successMessage}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              placeholder={COPY.photoUpload.nameLabel}
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              className="bg-white/80 border-gold/20 focus:border-gold text-center font-sans"
            />

            <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gold/20 rounded-xl cursor-pointer hover:border-gold/40 transition-colors bg-white/40">
              <Upload className="h-6 w-6 text-gold/60" />
              <span className="font-sans text-sm text-charcoal-light">
                {selectedFile ? selectedFile.name : "Elegí una foto"}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || !contributorName.trim() || isUploading}
              className="bg-gold hover:bg-gold-light text-white font-sans"
            >
              {isUploading ? (
                <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
              ) : (
                COPY.photoUpload.uploadButton
              )}
            </Button>

            {error && (
              <p className="font-sans text-sm text-red-600">{error.message}</p>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};
