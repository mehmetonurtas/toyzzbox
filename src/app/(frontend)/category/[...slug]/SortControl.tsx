// components/frontend/SortControls.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortControls({ categoryPath }: { categoryPath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSortBy = searchParams.get('sortBy') || 'name';
  const currentSortOrder = searchParams.get('sortOrder') || 'asc';
  
  const handleSortChange = (sortBy: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    router.push(`${categoryPath}?${params.toString()}`);
  };
  
  const toggleSortOrder = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortOrder', currentSortOrder === 'asc' ? 'desc' : 'asc');
    router.push(`${categoryPath}?${params.toString()}`);
  };
  
  return (
    <div className="flex items-center gap-4 mb-6">
      <label className="text-sm font-medium">Sırala:</label>
      <select 
        value={currentSortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded border-gray-300 p-2 text-sm"
      >
        <option value="name">İsim</option>
        <option value="price">Fiyat</option>
        <option value="createdAt">Eklenme Tarihi</option>
      </select>
      
      <button 
        onClick={toggleSortOrder}
        className="ml-2 p-2 border rounded hover:bg-gray-100"
      >
        {currentSortOrder === 'asc' ? '↑ Artan' : '↓ Azalan'}
      </button>
    </div>
  );
}
