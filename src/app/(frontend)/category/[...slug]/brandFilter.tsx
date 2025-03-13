// src/lib/filters/brandFilter.ts
import { Prisma } from "@prisma/client";

/**
 * Creates a Prisma filter condition for filtering products by brands
 * @param brands Array of brand names to filter by
 * @returns A Prisma where condition for brand filtering
 */
export function createBrandFilter(brands?: string[]): Prisma.ProductWhereInput {
  if (!brands || brands.length === 0) {
    return {};
  }
  
  return {
    brands: {
      some: {
        name: { in: brands }
      }
    }
  };
}

/**
 * Combines multiple filter conditions into a single where input
 * @param filters Array of filter conditions
 * @returns Combined Prisma where input
 */
export function combineFilters(filters: Prisma.ProductWhereInput[]): Prisma.ProductWhereInput {
  // Remove empty filters
  const nonEmptyFilters = filters.filter(filter => Object.keys(filter).length > 0);
  
  if (nonEmptyFilters.length === 0) {
    return {};
  }
  
  if (nonEmptyFilters.length === 1) {
    return nonEmptyFilters[0];
  }
  
  // Combine multiple filters with AND logic
  return {
    AND: nonEmptyFilters
  };
}