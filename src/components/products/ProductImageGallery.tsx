// ProductImageGallery.tsx
"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  urls?: string[] | null;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ urls }) => {
  const [mainImageUrl, setMainImageUrl] = useState(urls && urls.length > 0 ? urls[0] : null);

  const handleThumbnailClick = (url: string) => {
    setMainImageUrl(url);
  };

  const restOfUrls = urls ? urls.slice(1) : [];

  return (




    
    <div className="flex flex-col">
      {mainImageUrl ? (
        <img
          src={mainImageUrl}
          alt="Product Image"
          className="w-full h-[500px] object-cover rounded-t-lg mb-2"
        />
      ) : (
        <div className="w-full h-[500px] bg-gray-300 rounded-t-lg flex items-center justify-center text-white">
          No Image Available
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {restOfUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Product Image ${index + 2}`}
            className="w-[150px] h-[150px] object-cover rounded-lg cursor-pointer"
            onClick={() => handleThumbnailClick(url)} // Handle thumbnail click
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
