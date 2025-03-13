
"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;

    // Navigate to the search results page
    router.push(`/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        autoComplete="off"
        type="text"
        placeholder="Aradığınız ürün veya kategoriyi yazın"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-orange-600 hover:opacity-80 text-white p-2 rounded-r-md">
        <FaSearch className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
