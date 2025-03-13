"use server";

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// S3 Client'ı başlatıyoruz
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

// Dosya yükleme fonksiyonu
export async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: file,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully", response);
    return fileName;
  } catch (error) {
    console.error("Error uploading file", error);
    throw new Error("Failed to upload file to S3");
  }
}

// Upload işlemini gerçekleştiren fonksiyon
export async function uploadFile(prevState: any, formData: FormData): Promise<{ status: string; message: string }> {
  try {
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return {
        status: "error",
        message: "Failed to upload: File is empty",
      };
    }

    // Dosyayı Buffer'a çeviriyoruz
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);

    // Path yeniden doğrulanıyor
    revalidatePath("/");

    return { status: "success", message: "File has been uploaded" };
  } catch (error) {
    console.error("Error in uploadFile", error);
    return { status: "error", message: "Failed to upload file" };
  }
}
