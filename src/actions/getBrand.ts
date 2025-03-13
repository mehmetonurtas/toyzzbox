import prisma from "@/lib/prisma";
import  {Brand}  from "../types/brand";


export async function getBrands(): Promise<Brand[]> {
  try {
    const brands = await prisma.brand.findMany({
      take: 12,
      orderBy: {
        name: 'asc' // markaları alfabetik sırala
      }
    });
    
    return brands;
  } catch (error) {
    console.error("Markalar getirilirken hata oluştu:", error);
    throw error; // Hatayı yakala ve yukarı fırlat
  }
}