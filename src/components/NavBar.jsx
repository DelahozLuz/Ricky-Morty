import React from 'react';


const NavBar = ({ favoritesCount, handleSortChange, setShowFavorites, showFavorites }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      
      {/* Botones para cambiar el orden de los personajes */}
      <div className="flex space-x-4">
        <button
          onClick={() => handleSortChange('asc')}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Sort A-Z
        </button>
        <button
          onClick={() => handleSortChange('desc')}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Sort Z-A
        </button>
      </div>

      {/* Botón para alternar entre mostrar todos o solo favoritos */}
      <div>
        <button 
          onClick={() => setShowFavorites(!showFavorites)} 
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-400 transition duration-200"
        >
          {showFavorites ? 'Show All Characters' : 'Favoritos'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
