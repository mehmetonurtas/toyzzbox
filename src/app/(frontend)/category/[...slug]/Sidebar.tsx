"use client"
import { useRouter } from 'next/navigation';

interface SidebarProps {
  brands: string[];
  categoryPath: string;
}

export default function Sidebar({ brands, categoryPath }: SidebarProps) {
  const router = useRouter();

  const handleBrandChange = (brand: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('brand', brand);
    router.push(`${categoryPath}?${params.toString()}`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Filtreleme</h1>
      <h2>Markalar</h2>
      {brands.length > 0 ? (
        <ul>
          {brands.map((brand) => (
            <li key={brand}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleBrandChange(brand);
                }}
              >
                {brand}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Marka bulunamadı.</p>
      )}
    </div>
  );
}
