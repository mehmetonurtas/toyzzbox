"use client";

import { useActionState } from "react";
import { createProduct } from "./action";

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Attribute {
  id: string;
  name: string;
}

interface Media {
  id: string;
  urls: string[];
  type: string;
  createdAt: Date;
  postId: string | null;
}

interface CategoryFormProps {
  categories: Category[];
  brands: Brand[];
  media: Media[];
  attributes: Attribute[]; // attributes burada tanımlanmalı
}

export default function CategoryForm({ categories, brands, media, attributes }: CategoryFormProps) {
  const [error, action, isPending] = useActionState(createProduct, null);

  return (
    <main className="mx-auto max-w-lg">
      <h1>Ürün Yönetim Sayfası</h1>
      <form action={action} method="POST" className="flex flex-col px-2 gap-3">
        <input 
          type="text" 
          name="name" 
          placeholder="Ürün Adı" 
          className="py-2 px-3 rounded-sm" 
          required 
        />
        <input 
          type="text" 
          name="slug" 
          placeholder="Slug" 
          className="py-2 px-3 rounded-sm" 
          required 
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Açıklama" 
          className="py-2 px-3 rounded-sm" 
          required 
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Fiyat" 
          className="py-2 px-3 rounded-sm" 
          required 
        />

        {/* Kategori Seçimi */}
        <select name="categoryIds[]" multiple className="py-2 px-3 rounded-sm">
          <option value="">Kategori Seç</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        {/* Birden fazla marka seçimi */}
        <select name="brandIds[]" multiple className="py-2 px-3 rounded-sm">
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>

        {/* Birden fazla attribute seçimi */}
        <select name="attributeIds[]" multiple className="py-2 px-3 rounded-sm">
          {attributes.map((attribute) => (
            <option key={attribute.id} value={attribute.id}>{attribute.name}</option>
          ))}
        </select>

        {/* Media Seçimi */}
        <label>Media:</label>
        <select name="mediaIds[]" multiple className="py-2 px-3 rounded-sm">
          {media.map(medium => (
            <option key={medium.id} value={medium.id}>{medium.urls[0]}</option>
          ))}
        </select>

        <button disabled={isPending} className="bg-blue-500 text-white py-2 px-3">
          {isPending ? "Gönderiliyor..." : "Gönder"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
