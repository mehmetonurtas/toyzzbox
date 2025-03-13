"use client";

import { useState } from "react";

interface SortingProps {
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onSortChange(newSortBy, sortOrder);
  };

  const handleOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    onSortChange(sortBy, newSortOrder);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Sıralama Alanı Seçimi */}
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="border p-2 rounded"
      >
        <option value="name">İsme Göre</option>
        <option value="price">Fiyata Göre</option>
        <option value="createdAt">En Yeni</option>
      </select>

      {/* Artan / Azalan Sıralama */}
      <button
        onClick={handleOrderChange}
        className="border p-2 rounded bg-gray-200"
      >
        {sortOrder === "asc" ? "⬆️ Artan" : "⬇️ Azalan"}
      </button>
    </div>
  );
};

export default Sorting;
