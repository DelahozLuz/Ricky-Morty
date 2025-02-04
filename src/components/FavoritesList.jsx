import React, { useState } from 'react';

const FavoritesList = ({ favorites, toggleFavorite }) => {
  const [showFavorites, setShowFavorites] = useState(true); 

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map((character) => (
            <div key={character.id} className="bg-gray-700 p-4 rounded-lg">
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-48 object-cover rounded-md" 
              />
              <h3 className="text-xl mt-2">{character.name}</h3>
              <button
                onClick={() => toggleFavorite(character)}
                className="mt-2 px-4 py-2 text-white bg-red-500"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>

      {/* Botón para alternar entre mostrar todos o solo favoritos */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => setShowFavorites(!showFavorites)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          {showFavorites ? '' : 'Favoritos'}
        </button>
      </div>
    </div>
  );
};

export default FavoritesList;
