export interface IStorageService {
  uploadPhoto(
    file: File,
    path: string
  ): Promise<{ publicUrl: string; storagePath: string }>;
}
