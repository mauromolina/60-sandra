import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export const photoUploadSchema = z.object({
  contributorName: z.string().min(1, "El nombre es obligatorio").max(100),
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, "Se requiere un archivo")
    .refine((file) => file.size <= MAX_FILE_SIZE, "El archivo no puede superar 10MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan JPG, PNG, WebP o HEIC"
    ),
});

export type PhotoUploadFormData = z.infer<typeof photoUploadSchema>;

export { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES };
