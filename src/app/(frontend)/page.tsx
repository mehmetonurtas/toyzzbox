import { getBrands } from "@/actions/getBrand";
import BrandCard from "./add-brand/BrandCard";
import CategoryCard from "../(admin)/admin/add-category/CategoryCard";
import { getCategories } from "@/actions/getCategories";
import { getProducts } from "@/actions/getProduct";
import ProductCard from "@/components/products/ProductCard";
import AgeCatalogue from "@/components/AgeCatalogue";


export default async function Home() {

  const products = await getProducts();
  const brands = await getBrands();
  const categories = await getCategories()
  return (
    <main className="m-2">
    <h1 className="text-2xl font-bold text-center p-5">En Popüler Ürünler</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
         {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>  
      <h1 className="text-2xl font-bold text-center p-5">En Yeni Ürünler</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
         {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>  
    <h1 className="text-2xl font-bold text-center p-5">Favori Markalar</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
       
    </div>
    <h1 className="text-2xl font-bold text-center p-5">En Popüler Kategoriler</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div> 
      <h1 className="text-2xl font-bold text-center p-5">Yaşa Göre Oyuncaklar</h1>
      <AgeCatalogue/>
 

    </main>
  );
}
