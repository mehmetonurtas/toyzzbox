// KategoriLayout.tsx
'use client';

import React, { useState } from 'react';

interface HelpLayoutProps {
  children: React.ReactNode;
}

export default function KategoriLayout({ children }: HelpLayoutProps) {
  const [sorting, setSorting] = useState({ sortBy: 'name', sortOrder: 'asc' });

  // Sıralama değiştiğinde çağrılacak fonksiyon
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSorting({ sortBy, sortOrder });
  };


  return (
    <div className="flex">
 
      <main className="flex m-4 p-4 flex-col w-3/4">
        <div className='m-2'>
          {/* Çocuk bileşenlere sorting ve filter bilgilerini geçin */}
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, { sorting });
          })}
        </div>
      </main>
    </div>
  );
}
