"use server";

import prisma from "@/lib/prisma";

// CreateCategoryArgs tipini tanımlama
type CreateCategoryArgs = {
  name: string;
  slug: string;
  description: string;
  parentId: string | null; // parentId null olabilir
  mediaIds?: string[];
  urls?: string[];
};

// createCategory fonksiyonu
export async function createCategory(previousState: any, formData: FormData) {
  try {
    // FormData'dan değerleri al
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string | null; // parentId null olabilir
    const mediaIds = formData.getAll("mediaIds[]") as string[]; // Enforce string type
    const formUrls = formData.getAll("urls[]") as string[]; // URLs directly from the form

    // Fetch URLs from selected media:
    let mediaUrls: string[] = [];
    if (mediaIds && mediaIds.length > 0) {
      const existingMedia = await prisma.media.findMany({
        where: { id: { in: mediaIds } },
        select: { urls: true }, // Only select the URLs field
      });

      if (existingMedia.length !== mediaIds.length) {
        console.error("Invalid Media Ids");
        return "Error: One or more of the selected media IDs are invalid.";
      }

      // Extract URLs from each media record:
      mediaUrls = existingMedia.flatMap(media => media.urls); // Use flatMap to flatten the array
    }

    // Combine URLs from media and the form:
    const allUrls = [...mediaUrls, ...formUrls];

    // Kategori oluşturma
    await prisma.category.create({
      data: {
        slug,
        name,
        description,
        parentId: parentId || null, // If parentId is null, pass null
        media: mediaIds ? {
          connect: mediaIds.map(id => ({ id })),
        } : undefined,
        urls: allUrls, // Save the combined URLs to the category
      },
    });

    return "Kategori başarıyla oluşturuldu.";
  } catch (error) {
    console.error("Error creating category:", error);
    return "Kategori oluşturma sırasında bir hata oluştu.";
  }
}
