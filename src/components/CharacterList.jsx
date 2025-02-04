import React, { useState } from 'react';
import CommentSection from './CommentSection'; 

const CharacterList = ({ characters, handleCharacterClick, toggleFavorite, favorites }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCommentClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character) => {
          const isFavorite = favorites.some(fav => fav.id === character.id);

          return (
            <div 
              key={character.id} 
              className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition relative flex flex-col"
              onClick={() => handleCharacterClick(character)}
            >
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl mt-2 flex-1">{character.name}</h3>

            
              <div className="flex space-x-2 mt-2">
                <button
                  className="text-yellow-400 text-2xl"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    toggleFavorite(character);
                  }}
                >
                  {isFavorite ? '⭐' : '☆'}
                </button>
                <button 
                  className="text-blue-400 text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommentClick(character);
                  }}
                >
                  💬
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para agregar comentarios  */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-1/2">
            <CommentSection character={selectedCharacter} goBack={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
