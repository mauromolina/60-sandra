import { NextRequest, NextResponse } from "next/server";
import { PhotoRepository } from "@/repositories/PhotoRepository";
import { createStorageService } from "@/services/StorageService";
import type { ApiResponse } from "@/lib/types/ApiResponse";
import type { Photo } from "@/lib/types/Photo";

export async function GET(): Promise<NextResponse<ApiResponse<Photo[]>>> {
  try {
    const photos = await PhotoRepository.getApproved();
    return NextResponse.json({ success: true, data: photos });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const body = await request.json();
    const { id, status } = body as { id: string; status: "approved" | "rejected" };
    await PhotoRepository.updateStatus(id, status);
    return NextResponse.json({ success: true, data: null });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update photo status" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Photo>>> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const contributorName = formData.get("contributorName") as string | null;

    if (!file || !contributorName) {
      return NextResponse.json(
        { success: false, error: "File and contributor name are required" },
        { status: 400 }
      );
    }

    const storageService = createStorageService();
    const { publicUrl, storagePath } = await storageService.uploadPhoto(
      file,
      "uploads"
    );

    const photo = await PhotoRepository.create({
      storagePath,
      publicUrl,
      contributorName,
    });

    return NextResponse.json({ success: true, data: photo }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to upload photo";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
