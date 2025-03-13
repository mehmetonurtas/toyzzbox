"use client"
import React, { useEffect, useState } from "react";
import BrandCard from "./BrandCard"; // BrandCard bileşeni
import { getBrands } from "@/actions/getBrand";

const BrandLists: React.FC = () => {
  const [brands, setBrands] = useState<any[]>([]); // Brands'leri tutan state

  useEffect(() => {
    async function fetchBrands() {
      const fetchedBrands = await getBrands();
      setBrands(fetchedBrands); // Brands'leri state'e set et
    }
    
    fetchBrands(); // Brand'leri çek
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
};

export default BrandLists;
