import { uploadFileToS3 } from "@/app/(admin)/admin/form/action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // Cache yeniden doğrulama
import { v4 as uuidv4 } from "uuid"; // UUID oluşturma

export async function deneBrand(formData: FormData): Promise<{ status: string; message: string }> {
  try {
    // FormData'dan gelen verileri alıyoruz
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    // Marka adı ve açıklaması boş olmamalı
    if (!name || !description) {
      return { status: "error", message: "Name and description are required." };
    }

    // Dosya varsa ve geçerli bir dosyaysa
    let fileUrl = "";
    if (file && file instanceof File) {
      // Dosyayı buffer'a çeviriyoruz
      const buffer = Buffer.from(await file.arrayBuffer());

      // Dosyayı S3'e yükleyip URL'yi alıyoruz
      fileUrl = await uploadFileToS3(buffer, file.name); // Burada dosya URL'sini alıyoruz
    }

    // Slug oluşturma: Eğer "name" varsa, slug'ı oluşturuyoruz
    const slug = name
      ? name.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")
      : uuidv4(); // Eğer "name" yoksa, uuid kullanıyoruz

    // Prisma'dan yeni marka oluşturuluyor
    const brand = await prisma.brand.create({
      data: {
        name: name as string, // Marka adı
        description: description as string, // Açıklama
        file: fileUrl, // S3'ten dönen dosya URL'sini ekliyoruz
        slug: slug, // Slug
      },
    });

    // Cache güncellemesi
    revalidatePath("/admin/brand");

    return { status: "success", message: "Brand has been created successfully" };
  } catch (error) {
    console.error("Error in deneBrand:", error);
    return { status: "error", message: "Failed to create brand" };
  }
};
