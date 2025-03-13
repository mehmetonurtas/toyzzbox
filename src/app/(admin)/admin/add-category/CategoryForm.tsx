

"use client"

import { useActionState } from "react";
import { createCategory } from "./action";

interface Category {
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
  media: Media[];
}






export default function CategoryForm({ categories, media }: CategoryFormProps) {
  const [error, action, isPending] = useActionState(createCategory, null);

  return (
    <main className="mx-auto max-w-lg">
      <h1>Categori Sayfası</h1>
      <form action={action} className="flex flex-col px-2 gap-3">
        <input type="text" name="name" placeholder="deneme" className="py-2 px-3 rounded-sm" />
        <input type="text" name="slug" placeholder="slug" className="py-2 px-3 rounded-sm" />
        <input type="text" name="description" placeholder="acıklama" className="py-2 px-3 rounded-sm" />
        <select name="parentId" className="py-2 px-3 rounded-sm">
          <option value="">Select Parent Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>


        <label>Media:</label>
        <select name="mediaIds[]" multiple>
          {media.map(medium => (
            <option key={medium.id} value={medium.id}>{medium.urls[0]}</option>
          ))}
        </select>


        <button disabled={isPending} className="bg-blue-500 text-white py-2 px-3">
          {isPending ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}