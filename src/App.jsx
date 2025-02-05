// App.jsx
import { useState, useEffect } from "react"; 
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "./graphql/queries";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import NavBar from "./components/NavBar";

export default function App() {
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [sortOrder, setSortOrder] = useState("asc");  // Estado para ordenar A-Z/Z-A
  const [showFavorites, setShowFavorites] = useState(false);

  // Estados para los filtros
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { page },
  });

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  // Ordenar personajes basado en el sortOrder
  const sortedCharacters = (characters) => {
    const charactersCopy = [...characters];  
    return charactersCopy.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);  
      } else {
        return b.name.localeCompare(a.name);  
      }
    });
  };

  // Filtrar personajes según los filtros aplicados
  const filterCharacters = (characters) => {
    return characters.filter((character) => {
      const matchesStatus = statusFilter ? character.status.toLowerCase().includes(statusFilter.toLowerCase()) : true;
      const matchesSpecies = speciesFilter ? character.species.toLowerCase().includes(speciesFilter.toLowerCase()) : true;
      const matchesGender = genderFilter ? character.gender.toLowerCase().includes(genderFilter.toLowerCase()) : true;
      
      return matchesStatus && matchesSpecies && matchesGender;
    });
  };

  const toggleFavorite = (character) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === character.id);
      return isFavorite
        ? prevFavorites.filter((fav) => fav.id !== character.id)
        : [...prevFavorites, character];
    });
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const charactersToDisplay = showFavorites
    ? sortedCharacters(favorites)
    : sortedCharacters(data?.characters?.results || []);
  
  // Aplicamos los filtros antes de pasar los personajes a la lista
  const filteredCharacters = filterCharacters(charactersToDisplay);

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <NavBar 
        favoritesCount={favorites.length} 
        handleSortChange={setSortOrder} 
        setShowFavorites={setShowFavorites} 
        showFavorites={showFavorites}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
      />

      <CharacterList
        characters={filteredCharacters}  // Usamos los personajes filtrados
        handleCharacterClick={handleCharacterClick}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />

      {!showFavorites && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 disabled:bg-gray-700"
          >
            Anterior
          </button>
          <span className="text-lg">Página {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!data?.characters?.info?.next}
            className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 disabled:bg-gray-700"
          >
            Siguiente
          </button>
        </div>
      )}

      {selectedCharacter && (
        <CharacterDetail character={selectedCharacter} isOpen={!!selectedCharacter} onClose={closeModal} />
      )}
    </div>
  );
}
