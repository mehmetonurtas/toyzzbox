// src/lib/actions.ts
'use server';

import prisma from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';



export async function searchProducts(query: string) {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            categories: {
              some: {
                name: { contains: query, mode: 'insensitive' },
              },
            },
          },
          {
            brands: {
              some: {
                name: { contains: query, mode: 'insensitive' },
              },
            },
          },
        ],
      },
      include: {
        categories: true,
        brands: true,
      },
    });

    return products;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
