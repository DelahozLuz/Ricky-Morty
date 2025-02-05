// NavBar.jsx
import React from "react";

const NavBar = ({
  favoritesCount,
  handleSortChange,
  setShowFavorites,
  showFavorites,
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
  genderFilter,
  setGenderFilter
}) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      {/* Botones para cambiar el orden de los personajes */}
      <div className="flex space-x-4">
        <button
          onClick={() => handleSortChange("asc")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Sort A-Z
        </button>
        <button
          onClick={() => handleSortChange("desc")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Sort Z-A
        </button>
      </div>

      {/* Campos de búsqueda para filtrar por status, especie y género */}
      <div className="flex gap-4">
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

      {/* Botón para alternar entre mostrar todos o solo favoritos */}
      <div>
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition duration-200"
        >
          {showFavorites ? `Show All Characters` : `Favoritos (${favoritesCount})`}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
