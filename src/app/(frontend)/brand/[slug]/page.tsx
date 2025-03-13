
import prisma from "@/lib/prisma";
import BrandDetails from "./BrandDetails";


export default async function BrandPage({ params }: { params: { slug: string } }) {
  // params'ı doğrudan kullanıyoruz
  const { slug } = params;

  // Ürünü veritabanından alıyoruz
  const brand = await prisma.brand.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      slug: true, // Slug'u da seçiyoruz
      name: true,
      description: true,
      products: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // Ürün bulunamazsa hata mesajı döndürüyoruz
  if (!brand) {
    return <div>Product not found</div>;
  }

  // Ürünü ProductDetails bileşenine geçiriyoruz
  return <BrandDetails brand={brand} />;
}
