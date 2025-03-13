"use server";


import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

export const addProduct = async (formData: FormData): Promise<void> => { 
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const brandIds = formData.getAll("brandId") as string[];
  const categoryIds = formData.getAll("categoryId") as string[];

  if (!name) {
    throw new Error("Ürün adı gerekli.");
  }

  if (!price || isNaN(Number(price))) {
    throw new Error("Geçerli bir fiyat girin.");
  }

  // Slug oluştur
  const slug = generateSlug(name);

  // Prisma ile ürünü kaydet
  await prisma.product.create({
    data: {
      slug: slug,
      name: name,
      description: description,
      price: Number(price),
      brands: {  // Changed from 'brand' to 'brands'
        connect: brandIds.map((id) => ({ id })), // Make sure brandIds are valid String IDs
      },
      categories: {
        connect: categoryIds.map((id) => ({id})),
      }
    },
  });

  // Path revalidate işlemi
  revalidatePath("/servis");
};
