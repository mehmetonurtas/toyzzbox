import prisma from "@/lib/prisma";
import { Product } from "@/types/product";

export async function getProductsByCategory(
  slug: string,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "asc",
  brands?: string | string[]
): Promise<Product[]> {
  try {
    if (!slug) {
      console.error("Slug is missing or empty.");
      return [];
    }
    
    const productWhere: Prisma.ProductWhereInput = brands 
      ? { 
          brands: {
            some: {
              name: { in: Array.isArray(brands) ? brands : [brands] }  
            }
          }
        } 
      : {};
      
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: productWhere,
          orderBy: sortBy
            ? {
                [sortBy]: sortOrder,
              }
            : undefined,
          include: {
            brands: true  // İlişkili brand'leri dahil et
          }
        }
      },
    });
    
    if (!category) {
      console.error(`Category not found with slug: ${slug}`);
      return [];
    }
    
    return category.products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}
