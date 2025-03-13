// app/[slug]/CategoryProducts.tsx
import Link from 'next/link';
import Image from 'next/image';

// Mevcut product tipini kullan
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  urls: string[];
  // İhtiyaç duyduğunuz diğer alanları ekleyin
}

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <Link href={`/product/${product.slug}`}>
            <div className="aspect-square relative bg-gray-100">
              {product.urls && product.urls.length > 0 ? (
                <Image
                  src={product.urls[0] || '/images/placeholder.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Resim Yok
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="font-bold text-lg">
                {product.price.toLocaleString('tr-TR')} TL
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}