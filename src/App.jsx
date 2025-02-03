import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GET_CHARACTERS } from './graphql/queries';
import './index.css';

export default function App() {
  // Consulta los datos de los personajes usando Apollo Client
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  
  // Estado para almacenar el personaje seleccionado y la lista de favoritos
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useState([]);

  if (loading) return <p>Loading...</p>; // Muestra un mensaje de carga
  if (error) return <p>Error: {error.message}</p>; // Muestra un mensaje de error

  // Maneja la selección de un personaje
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  // Agrega o quita un personaje de la lista de favoritos
  const toggleFavorite = (character) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === character.id)
        ? prevFavorites.filter((fav) => fav.id !== character.id)
        : [...prevFavorites, character]
    );
  };

  return (
    <Router>
      <div className="p-4 bg-gray-800 min-h-screen text-white">
        {/* Navbar para navegación */}
        <nav className="flex justify-center space-x-4 mb-6">
          <Link to="/" className="text-xl font-bold hover:text-blue-500">
            Characters
          </Link>
          <Link to="/favorites" className="text-xl font-bold hover:text-blue-500">
            Favorites ({favorites.length})
          </Link>
        </nav>

        {/* Rutas de la aplicación */}
        <Routes>
          {/* Página principal con lista de personajes */}
          <Route
            path="/"
            element={
              !selectedCharacter ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.characters.results.map((character) => (
                    <div
                      key={character.id}
                      className="border p-4 rounded shadow-md text-center bg-gray-700 cursor-pointer transition-transform transform hover:scale-105"
                      onClick={() => handleCharacterClick(character)}
                    >
                      <div className="w-full h-40 md:h-44 lg:h-48 flex justify-center items-center overflow-hidden rounded-md mb-2 bg-gray-900">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h2 className="text-xl font-bold">{character.name}</h2>
                      <p>Status: {character.status}</p>
                      <p>Species: {character.species}</p>
                    </div>
                  ))}
                </div>
              ) : (
                // Vista del personaje seleccionado
                <div className="flex flex-col md:flex-row items-center justify-center mt-8">
                  <div className="border p-4 rounded shadow-md bg-gray-700 w-80 md:w-96 text-center">
                    <div className="w-full h-64 md:h-56 lg:h-48 flex justify-center items-center overflow-hidden rounded-md bg-gray-900">
                      <img
                        src={selectedCharacter.image}
                        alt={selectedCharacter.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h2 className="text-2xl font-bold mt-4">{selectedCharacter.name}</h2>
                    <p className="mt-2">Status: {selectedCharacter.status}</p>
                    <p>Species: {selectedCharacter.species}</p>
                    <p>Gender: {selectedCharacter.gender}</p>
                    <button
                      onClick={() => toggleFavorite(selectedCharacter)}
                      className={`mt-4 px-4 py-2 rounded shadow transition-colors duration-300 ${
                        favorites.some((fav) => fav.id === selectedCharacter.id)
                          ? 'bg-red-500 text-white hover:bg-red-700'
                          : 'bg-gray-500 text-white hover:bg-gray-600'
                      }`}
                    >
                      {favorites.some((fav) => fav.id === selectedCharacter.id)
                        ? 'Remove from Favorites'
                        : 'Add to Favorites'}
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedCharacter(null)}
                    className="mt-4 md:mt-0 md:ml-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
                  >
                    Back to List
                  </button>
                </div>
              )
            }
          />
          
          {/* Página de favoritos */}
          <Route
            path="/favorites"
            element={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map((character) => (
                  <div
                    key={character.id}
                    className="border p-4 rounded shadow-md text-center bg-gray-700 cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => handleCharacterClick(character)}
                  >
                    <div className="w-full h-40 md:h-44 lg:h-48 flex justify-center items-center overflow-hidden rounded-md mb-2 bg-gray-900">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h2 className="text-xl font-bold">{character.name}</h2>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                  </div>
                ))}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}