"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandDetailsProps {
  brand: {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    urls?: string[] | null;
    products: {
      id: string;
      name: string;
    }[];
  };
}

const BrandDetails: React.FC<BrandDetailsProps> = ({ brand }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // useEffect kullanarak product değerini loglayalım
  useEffect(() => {
    console.log("Current Brand:", brand);
  }, [brand]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
        <p className="text-gray-600 mb-4">{brand.description}</p>
        {brand.urls && brand.urls.length > 0 && (
          <div className="mb-6">
            <Image 
              src={brand.urls[0]} 
              alt={brand.name} 
              width={400} 
              height={300} 
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Bu Markaya Ait Ürünler</h2>
      
      {brand.products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brand.products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <Link 
                href={`/products/${product.id}`}
                className="text-blue-600 hover:underline inline-block mt-2"
              >
                Ürün Detayları
              </Link>
              <button
                onClick={() => dispatch(addToCart({ id: product.id, name: product.name, quantity: 1 }))}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Bu markaya ait ürün bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default BrandDetails;