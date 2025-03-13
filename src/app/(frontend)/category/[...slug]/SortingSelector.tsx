// app/[slug]/SortingSelector.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { SortOption } from './action';

interface SortingSelectorProps {
  currentSort: SortOption;
}

export default function SortingSelector({ currentSort }: SortingSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleSortChange = (newSort: SortOption) => {
    const params = new URLSearchParams();
    params.set('sort', newSort);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="flex items-center">
      <label htmlFor="sortby" className="mr-2 text-gray-700">Sırala:</label>
      <select
        id="sortby"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
        className="border rounded-md py-1 px-3 bg-white"
      >
        <option value="newest">En Yeni</option>
        <option value="oldest">En Eski</option>
        <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
        <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
        <option value="name_asc">İsim: A-Z</option>
        <option value="name_desc">İsim: Z-A</option>
      </select>
    </div>
  );
}