// components/frontend/FilterControls.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterControlsProps {
  categoryPath: string; // Kategori yolu
  brands: string[]; // Markalar dizisi
}

export default function FilterControls({ categoryPath, brands }: FilterControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get('filter') || ''; // Varsayılan filtre değeri

  const handleFilterChange = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterValue) {
      params.set('filter', filterValue);
    } else {
      params.delete('filter'); // Filtre boşsa parametreyi kaldır
    }
    router.push(`${categoryPath}?${params.toString()}`); // URL'yi güncelle
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <label className="text-sm font-medium">Filtrele:</label>
      <select 
        value={currentFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="rounded border-gray-300 p-2 text-sm"
      >
        <option value="">Tüm Markalar</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  );
}
