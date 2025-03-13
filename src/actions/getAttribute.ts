import prisma from "@/lib/prisma";
import { Attribute } from "@/types/attribute";


export async function getAttributes(): Promise<Attribute[]> {
  try {
    const attributes = await prisma.attribute.findMany({
      take: 12,
      orderBy: {
        name: 'asc' // markaları alfabetik sırala
      }
    });
    
    return attributes;
  } catch (error) {
    console.error("attributes getirilirken hata oluştu:", error);
    throw error; // Hatayı yakala ve yukarı fırlat
  }
}