import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from './graphql/queries';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import NavBar from './components/NavBar';

export default function App() {
  const { loading, error, data } = useQuery(GET_CHARACTER);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (character) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === character.id);
      return isFavorite
        ? prevFavorites.filter((fav) => fav.id !== character.id) 
        : [...prevFavorites, character]; 
    });
  };

  const sortCharacters = (characters) => {
    const charactersCopy = [...characters]; 
    return charactersCopy.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name); 
      } else {
        return b.name.localeCompare(a.name); 
      }
    });
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

 
  const sortedCharacters = sortCharacters(data?.characters?.results || []);

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <NavBar favoritesCount={favorites.length} handleSortChange={handleSortChange} />
      
      <CharacterList 
        characters={sortedCharacters} 
        handleCharacterClick={handleCharacterClick}
        toggleFavorite={toggleFavorite}  
        favorites={favorites}
      />
      
      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          isOpen={!!selectedCharacter}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
