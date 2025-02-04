import React from 'react';

const CharacterDetail = ({ character, isOpen, onClose }) => {
  if (!isOpen || !character) return null; // Evita errores si character es undefined

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-96 relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          ✖ 
        </button>
        <img
          src={character?.image || 'https://via.placeholder.com/150'}
          alt={character?.name || 'Unknown'}
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-xl mt-2 font-bold">{character?.name || 'Unknown'}</h3>
        <p><strong>Status:</strong> {character?.status || 'Unknown'}</p>
        <p><strong>Species:</strong> {character?.species || 'Unknown'}</p>
        <p><strong>Gender:</strong> {character?.gender || 'Unknown'}</p>
        <p><strong>Origin:</strong> {character?.origin?.name || 'Unknown'}</p>
        <p><strong>Location:</strong> {character?.location?.name || 'Unknown'}</p>
      </div>
    </div>
  );
};

export default CharacterDetail;
