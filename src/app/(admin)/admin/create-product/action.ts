"use server";

import prisma from "@/lib/prisma";



type CreateProductArgs = {
  name: string;
  slug: string;
  description: string;
  price: number;
  brandIds: string[];
  categoryIds: string[];
  mediaIds?: string[];
  urls?: string[];
  attributeIds: string[];
};


export async function createProduct(previousState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug =  formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const brandIds = formData.getAll("brandIds[]") as string[];
    const attributeIds = formData.getAll("attributeIds[]") as string[];
    const categoryIds = formData.getAll("categoryIds[]") as string[];
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

    const product = await prisma.product.create({
      data: {
        slug,
        name,
        description,
        price,
        attributes: {
          connect: attributeIds.map((id) => ({ id })),
        },
        brands: {
          connect: brandIds.map((id) => ({ id })),
        },
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        media: mediaIds ? {
          connect: mediaIds.map(id => ({ id })),
        } : undefined,
        urls: allUrls, // Save the combined URLs to the product
      },
      
    });

    return "Product created successfully";
  } catch (error: any) {
    console.error("Error creating product:", error.message);
    return "An error occurred: " + error.message;
  }
}
