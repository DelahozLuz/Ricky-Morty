import React, { useEffect } from 'react';

const CharacterDetail = ({ character, isOpen, onClose }) => {
  // Añadir o quitar el efecto de desenfoque cuando el modal se abre o se cierra
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';  // Evitar que se haga scroll detrás del modal
    } else {
      document.body.style.overflow = 'auto';  // Habilitar el scroll cuando se cierra el modal
    }

    return () => {
      document.body.style.overflow = 'auto'; // Restaurar el comportamiento por defecto al desmontar el componente
    };
  }, [isOpen]);

  if (!isOpen || !character) return null; // Evita errores si character es undefined

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo difuso */}
      <div className="absolute inset-0 bg-black bg-opacity-50 blur-sm"></div>

      {/* Modal que no se difumina */}
      <div className="bg-gray-700 p-6 rounded-lg w-96 relative text-white z-10">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-300 hover:text-white"
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
