import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

import GameCard from '../../components/admin/GameCard';
import GameSearch from '../../components/admin/GameSearch';
import FeaturedProps from '../../types/FeaturedTypes';
import UserProps from '../../types/UserTypes';

import getAllFeatured from '../../services/admin/getAllFeatured';
import getAllUsers from '../../services/admin/getAllUsers';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const Route = createLazyFileRoute('/admin/')({
  component: Admin,
});

function Admin() {
  const [featuredGames, setFeaturedGames] = useState<FeaturedProps[]>([]);
  const [searchedGames, setSearchedGames] = useState([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const apiPrivate = useAxiosPrivate();
  const rawg = import.meta.env.VITE_RAWG;

  const fetchData = async () => {
    try {
      const [featuredData, userData] = await Promise.all([
        getAllFeatured(apiPrivate),
        getAllUsers(apiPrivate),
      ]);
      setFeaturedGames(featuredData);
      setUsers(userData);
      console.log(featuredData)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit = async (game: string) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${rawg}&platforms=187&search=${game}&page_size=6`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const { results: games } = await response.json();

      const gameData = games.map((game: any) => ({
        colorDom: game.dominant_color,
        colorSat: game.saturated_color,
        esrb: game.esrb_rating?.name || 'No Rating',
        gameId: game.id,
        image: game.background_image,
        metacritic: game.metacritic || 0,
        name: game.name,
        description: game.description_raw,
        rating: game.rating || 0,
        released: game.released,
        slug: game.slug,
      }));

      setSearchedGames(gameData);
    } catch (err) {
      console.error('Failed to fetch games:', err);
    }
  }

  const handleFeature = (game: FeaturedProps, index: number) => {
    console.log(game);
    // patchFeaturedGames(axiosPrivate, game, `Featured Game ${index + 1}`);
    setFeaturedGames((prev) => {
      const updated = [...prev];
      updated[index] = game;
      return updated;
    });
    console.log(featuredGames)
  }

  const featureConfig = [
    { title: 'Game of the Month', Icon: EmojiEventsIcon },
    { title: 'Featured Game 1', Icon: LooksOneIcon },
    { title: 'Featured Game 2', Icon: LooksTwoIcon },
    { title: 'Featured Game 3', Icon: Looks3Icon },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <h3>Admin</h3>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            {users.map((user, index) => (
              <p key={index}>{user.email}</p>
            ))}
            {featuredGames.length > 0 ? (
              featuredGames.map((game, index) => (
                <p key={index}>{game.name}</p>
              ))
            ) : (
              <p>No Featured Games</p>
            )}
          </div>

          <GameSearch onSearch={(value) => handleFormSubmit(value)} />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            {searchedGames.map((game, index) => (
              <GameCard
                key={index}
                game={game}
                handleFeature={handleFeature}
                featureConfig={featureConfig}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}