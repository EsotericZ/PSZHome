import { createLazyFileRoute } from '@tanstack/react-router';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

import GameCard from '../../components/admin/GameCard';
import GameSearch from '../../components/admin/GameSearch';
import FeaturedProps from '../../types/FeaturedTypes';
import UserProps from '../../types/UserTypes';
import GameProps from '../../types/GameTypes';
import AdminTable from '../../components/admin/AdminTable';

import getAllFeatured from '../../services/admin/getAllFeatured';
import getAllGames from '../../services/games/getAllGames';
import getAllUsers from '../../services/admin/getAllUsers';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const Route = createLazyFileRoute('/admin/')({
  component: Admin,
});

function Admin() {
  const [featuredGames, setFeaturedGames] = useState<FeaturedProps[]>([]);
  const [gameLibrary, setGameLibrary] = useState<GameProps[]>([]);
  const [searchedGames, setSearchedGames] = useState([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const apiPrivate = useAxiosPrivate();
  const rawg = import.meta.env.VITE_RAWG;

  const fetchData = async () => {
    try {
      const [featuredData, gameData, userData] = await Promise.all([
        getAllFeatured(apiPrivate),
        getAllGames(apiPrivate),
        getAllUsers(apiPrivate),
      ]);
      setFeaturedGames(featuredData);
      setGameLibrary(gameData);
      setUsers(userData);
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

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Box sx={{ width: '100%' }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleChange} 
              centered
              sx={{
                '& .MuiTab-root': {
                  color: 'white',
                  mx: 3,
                },
                '& .Mui-selected': {
                  color: 'inherit',
                },
              }}  
            >
              <Tab label="Featured Games" />
              <Tab label="Game Library" />
              <Tab label="New Users" />
              <Tab label="Verified Users" />
            </Tabs>
          </Box>

          <Box>
            {selectedTab === 0 && (
              <Box sx= {{ pt: 2 }}>
                {featuredGames.length > 0 ? (
                  featuredGames.map((game, index) => (
                    <Typography 
                    key={index}
                    variant='h6'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                        my: 2,
                      }}
                    >
                      {game.description}: {game.name}
                    </Typography>
                  ))
                ) : (
                  <Typography>
                    No Featured Games
                  </Typography>
                )}
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
              </Box>
            )}
          </Box>
          <Box>
            {selectedTab === 1 && (
              <div>
                {gameLibrary.length > 0 ? (
                  gameLibrary.map((game, index) => (
                    <p key={index}>{game.name}</p>
                  ))
                ) : (
                  <p>No Game Library</p>
                )}
              </div>
            )}
          </Box>
          <Box>
            {selectedTab === 2 && (
              <AdminTable
                users={users}
                filterCondition={(user) => !user.verified}
                columns={[
                  { label: 'Email', key: 'email' },
                  { label: 'PSN', key: 'psn' },
                  { label: 'Verify Code', key: 'verifyCode' },
                ]}
              />
            )}
          </Box>
          <Box>
            {selectedTab === 3 && (
              <AdminTable
                users={users}
                filterCondition={(user) => user.verified}
                columns={[
                  { label: 'Email', key: 'email' },
                  { label: 'PSN', key: 'psn' },
                  { label: 'Role', key: 'role' },
                ]}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  )
}