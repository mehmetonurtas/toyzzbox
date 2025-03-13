"use client";

import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import ProductImageGallery from "./ProductImageGallery";
import React, { useState, useEffect } from "react"; // useEffect'i ekledik
import Link from "next/link";
import  ProductDescription  from "./ProductDescription";

const Horizontal = () => <hr className="w-[30%] my-2" />;

interface ProductDetailsProps {
  product: {
    id: string;
    slug: string; // slug değerini ekledik
    name: string;
    description: string;
    price: number;
    urls?: string[] | null;
    categories: {
      id: string;
      name: string;
    }[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // useEffect kullanarak product değerini loglayalım
  useEffect(() => {
    console.log("Current Product:", product);
  }, [product]);

  const handleAddToCart = () => {
    console.log("Adding to cart:", { ...product, quantity });
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    router.push("/cart");
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="py-2 px-4 rounded-md">
        <Link href="/" className="text-gray-600 hover:text-gray-800">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        {product?.categories && product.categories.length > 0 ? (
          <Link
            href={`/category/${product.categories[0]?.id ?? '#'}`}
            className="text-gray-600 hover:text-gray-800"
          >
            {product.categories[0]?.name ?? 'Kategori Yok'}
          </Link>
        ) : (
          <div>Kategori Yok</div>
        )}
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
        <div>
          <ProductImageGallery urls={product.urls} />
        </div>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
          <div className="flex items-center gap-2">
            <span>Rating</span>
            <div>Değerlendirme</div>
          </div>
          <div className="text-justify">{product.description}</div>
          <Horizontal />

          {/* Quantity Selector */}
           <span className="flex items-center text-lg font-medium rounded-md bg-gray-200 px-4 py-1 mt-2">
            <button onClick={decrementQuantity} className="cursor-pointer mr-4">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={incrementQuantity} className="cursor-pointer ml-4">
              +
            </button>
          </span>

          {/* Price Display */}
          <div className="text-right">
            <h1 className="font-bold text-2xl">{`$${(product.price * quantity).toFixed(2)}`}</h1>
            <p className="text-xs text-gray-500">
              TL: <span className="line-through">indirimli fiyat</span>
            </p>
          </div>
          <Horizontal />

          {/* Cart Buttons */}
          <div className="max-w-[300px]">
            <button onClick={handleAddToCart} className="bg-blue-500 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="bg-green-500 text-white py-2 px-4 rounded ml-2">
              Buy Now
            </button>
          </div>

        </div>
      </div>
      <ProductDescription product={product} />
    </div>
  );
};

export default ProductDetails;
