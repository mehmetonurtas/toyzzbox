// Seçenek 2: Server Component ile
// Not: Bu durumda 'use client' direktifini kaldırın
import { searchProducts } from '@/actions/search';
import ProductCard from '@/app/(admin)/admin/add-brand/BrandCard';

interface Product {
  id: string;
  name: string;
  categories?: { name: string }[];
  brands?: { name: string }[];
  images?: { url: string }[];
  price?: number;
  oldPrice?: number;
  slug: string;
}

async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || '';
  const products = await searchProducts(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {query ? `"${query}" için Arama Sonuçları` : 'Tüm Ürünler'}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Arama kriterlerinize uygun ürün bulunamadı.
          </p>
          <p className="text-gray-500 mt-2">
            Lütfen farklı anahtar kelimeler kullanarak tekrar deneyin.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;