// app/category/[...slug]/page.tsx
import { getProductsByCategory } from './action';
import SortControls from './SortControl';
import Sidebar from './Sidebar';
import ProductCard from '@/components/products/ProductCard';

interface CategoryPageProps {
  params: {
    slug: string[];
  };
  searchParams: {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    brand?: string; // Filtreleme için marka seçimi
  };
}

async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  // Get the actual slug - it's the first element in the slug array
  const categorySlug = params.slug[0];
  const { sortBy, sortOrder = 'asc', brand } = searchParams;

  // Pass sorting and filtering parameters to your action
  const products = await getProductsByCategory(
    categorySlug, 
    sortBy, 
    sortOrder as 'asc' | 'desc',
    brand
  );

  // Kategoriye ait ürün markalarını çekme
  const allProducts = await getProductsByCategory(categorySlug);
  const brands = [...new Set(allProducts.flatMap((product) => product.brands.map((brand) => brand.name)))];

  return (
    <div className="container mx-auto py-8 flex">
      <div className="w-1/4">
        {/* Sidebar'da marka seçeneklerini göster */}
        <Sidebar brands={brands} categoryPath={`/category/${categorySlug}`} />
      </div>
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">{categorySlug} Ürünleri</h1>
        
        {/* Pass the correct path to sort controls */}
        <SortControls categoryPath={`/category/${categorySlug}`} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
