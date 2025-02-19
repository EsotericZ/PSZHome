import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

import GameCard from '../../components/admin/GameCard';
import LoadSymbol from '../../components/shared/LoadSymbol';
import SearchBar from '../../components/shared/SearchBar';

import searchGames from '../../services/igdb/searchGames';

interface SearchGameProps {
  id: string;
  gameId: number;
  name: string;
  cover?: string;
  esrb?: string;
  rating?: number;
  released?: string;
  slug?: string;
  genres?: { id: number; name: string }[];
  storyline?: string;
  summary?: string;
  pszRating?: number;
  userRating?: { average: number; count: number };
}

export const Route = createLazyFileRoute('/games/')({
  component: Games,
})

function Games() {
  const [searchedGames, setSearchedGames] = useState<SearchGameProps[]>([]);
  const [game, setGame] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!game.trim()) {
      setSearchedGames([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const gameData = await searchGames(game);
        console.log(gameData)
        setSearchedGames(gameData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [game]);

  return (
    <Box>
      <h3>Games</h3>
      <SearchBar
        value={game}
        onChange={setGame}
        placeholder='Search Games...'
      />
      {loading ? (
        <LoadSymbol />
      ) : (
        <>
          {searchedGames.map((game, index) => (
            <GameCard
              key={index}
              game={game}
            />
          ))}
        </>
      )}
    </Box>
  )
}
