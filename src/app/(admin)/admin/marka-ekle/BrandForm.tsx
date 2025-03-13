"use client";

import { useActionState } from "react";
import { createBrand } from "./action";



interface Media {
  id: string;
  urls: string[];
  type: string;
  createdAt: Date;
  postId: string | null;
}

interface CategoryFormProps {
  media: Media[];
}

export default function BrandForm({ media }: CategoryFormProps) {
  const [error, action, isPending] = useActionState(createBrand, null);

  return (
    <main className="mx-auto max-w-lg">
      <h1>Ürün Yönetim Sayfası</h1>
      <form action={action} className="flex flex-col px-2 gap-3">
        <input type="text" name="name" placeholder="Ürün Adı" className="py-2 px-3 rounded-sm" />
        <input type="text" name="slug" placeholder="Slug" className="py-2 px-3 rounded-sm" />
        <input type="text" name="description" placeholder="Açıklama" className="py-2 px-3 rounded-sm" />
       

        <label>Media:</label>
        <select name="mediaIds[]" multiple>
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
