"use client";

import { useState, useEffect } from "react";
import Sorting from "./Sorting";
import { Product } from "@/types/product";
import { getProductsByCategory } from "./action";
import ProductCard from "@/components/products/ProductCard";

interface SortingWrapperProps {
  categorySlug: string;
  initialProducts: Product[];
}

export default function SortingWrapper({ categorySlug, initialProducts }: SortingWrapperProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProductsByCategory(categorySlug, sortBy, sortOrder);
      setProducts(fetchedProducts);
    }

    fetchProducts();
  }, [categorySlug, sortBy, sortOrder]);

  return (
    <div>
      <Sorting
        onSortChange={(newSortBy, newSortOrder) => {
          setSortBy(newSortBy);
          setSortOrder(newSortOrder);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
