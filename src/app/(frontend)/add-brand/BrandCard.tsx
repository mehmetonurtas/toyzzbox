"use client"

import { useRouter } from "next/navigation";

type BrandCardProps = {
  brand: {
    slug: string,
    name: string;
    id?: string | null;
    urls?: string[] | null;

  };
};

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const router = useRouter();

  const handleClick = () => {
    if (brand.id) {
      router.push(`/brand/${brand.id}`);
    }
  };

  // Determine the image URL based on the product's URLs array
  const imageUrl = brand.urls && brand.urls.length > 0 ? brand.urls[0] : null;

  return (
    <div 
      className="border rounded-lg shadow-lg p-4 cursor-pointer" 
      onClick={handleClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={brand.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 rounded-t-lg flex items-center justify-center text-white">
          No Image Available
        </div>
      )}

      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold">{brand.name}</h3>

      </div>
    </div>
  );
};

export default BrandCard;
