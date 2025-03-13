"use client";

import { useRouter } from "next/navigation";

type CategoryCardProps = {
  category: {
    name: string;
    id?: string | null;
    slug?: string | null; 
    urls?: string[] | null;
    price: number;
  };
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter();

  const handleClick = () => {
    if (category.slug) {
      router.push(`/category/${category.slug}`); 
    }
  };

  const imageUrl = category.urls && category.urls.length > 0 ? category.urls[0] : null;

  return (
    <div 
      className="border shadow-lg cursor-pointer w-48 h-48 rounded-full flex flex-col items-center justify-center"
      onClick={handleClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={category.name}
          className="w-32 h-32 object-cover rounded-full"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-white">
          No Image Available
        </div>
      )}
      <div className="text-center mt-2">
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
