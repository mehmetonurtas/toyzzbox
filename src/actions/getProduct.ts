
import prisma from "@/lib/prisma";
import  Product  from "@/types/category";

export async function getProducts(): Promise<Product[]> {
  try {
    // Prisma üzerinden veritabanından ürünleri al
    const products = await prisma.product.findMany({
      take: 40, // İsteğe bağlı: İlk 12 ürünü getir
    });
    return products; // Ürünleri döndür
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Hata durumunda boş bir dizi döndür
  }
}