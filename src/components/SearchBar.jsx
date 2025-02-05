// components/SearchBar.jsx
import React from "react";

const SearchBar = ({ statusFilter, setStatusFilter, speciesFilter, setSpeciesFilter, genderFilter, setGenderFilter }) => {
  return (
    <div className="flex gap-4 mt-6">
      <input
        type="text"
        placeholder="Filtrar por Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg"
      />
      <input
        type="text"
        placeholder="Filtrar por Especie"
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg"
      />
      <input
        type="text"
        placeholder="Filtrar por Género"
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
