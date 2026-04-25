import type { IStorageService } from "./interfaces/IStorageService";
import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "gallery";

export const createStorageService = (): IStorageService => ({
  async uploadPhoto(
    file: File,
    path: string
  ): Promise<{ publicUrl: string; storagePath: string }> {
    const supabase = createClient();
    const storagePath = `${path}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw new Error(error.message);

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    return { publicUrl: urlData.publicUrl, storagePath };
  },
});
