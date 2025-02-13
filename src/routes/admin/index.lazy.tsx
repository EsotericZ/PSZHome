import { SyntheticEvent, useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Badge, Box } from '@mui/material';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

import CustomTabs from '../../components/shared/CustomTabs';
import FeaturedGames from '../../components/admin/FeaturedGames';
import FeaturedProps from '../../types/FeaturedTypes';
import GameProps from '../../types/GameTypes';
import GameTable from '../../components/admin/GameTable';
import UserProps from '../../types/UserTypes';
import UserTable from '../../components/admin/UserTable';

import getAllFeatured from '../../services/admin/getAllFeatured';
import getAllGames from '../../services/games/getAllGames';
import getNewUsers from '../../services/admin/getNewUsers';
import getVerifiedUsers from '../../services/admin/getVerifiedUsers';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const Route = createLazyFileRoute('/admin/')({
  component: Admin,
});

function Admin() {
  const [featuredGames, setFeaturedGames] = useState<FeaturedProps[]>([]);
  const [gameLibrary, setGameLibrary] = useState<GameProps[]>([]);
  const [searchedGames, setSearchedGames] = useState([]);
  const [newUsers, setNewUsers] = useState<UserProps[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const apiPrivate = useAxiosPrivate();
  const rawg = import.meta.env.VITE_RAWG;

  const fetchData = async () => {
    try {
      const [featuredData, gameData, newUserData, verifiedUserData] = await Promise.all([
        getAllFeatured(apiPrivate),
        getAllGames(apiPrivate),
        getNewUsers(apiPrivate),
        getVerifiedUsers(apiPrivate),
      ]);
      setFeaturedGames(featuredData);
      setGameLibrary(gameData);
      setNewUsers(newUserData);
      setVerifiedUsers(verifiedUserData);
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
  }

  const featureConfig = [
    { title: 'Game of the Month', Icon: EmojiEventsIcon },
    { title: 'Featured Game 1', Icon: LooksOneIcon },
    { title: 'Featured Game 2', Icon: LooksTwoIcon },
    { title: 'Featured Game 3', Icon: Looks3Icon },
  ];

  const unverifiedUsersWithCodeCount = newUsers.filter(
    (user) => !user.verified && user.verifyCode
  ).length;

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
          <CustomTabs
            selectedTab={selectedTab}
            onChange={handleChange}
            labels={['Featured Games', 'Game Library', 'New Users', 'Verified Users']}
            tabIcons={[
              null,
              null,
              unverifiedUsersWithCodeCount > 0 ? (
                <Badge
                  badgeContent={unverifiedUsersWithCodeCount}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'red',
                      color: 'white',
                      fontSize: '0.75rem',
                      height: '16px',
                      minWidth: '16px',
                      borderRadius: '50%',
                    },
                    ml: 2
                  }}
                />
              ) : null,
              null,
            ]}
          />

          {selectedTab === 0 && (
            <FeaturedGames
              featuredGames={featuredGames}
              searchedGames={searchedGames}
              handleFormSubmit={handleFormSubmit}
              handleFeature={handleFeature}
              featureConfig={featureConfig}
            />
          )}

          {selectedTab === 1 && (
            <GameTable
              games={gameLibrary}
              filterCondition={() => true}
              columns={[
                { label: 'Game', key: 'name' },
                { label: 'Released', key: 'released' },
              ]}
            />
          )}

          {selectedTab === 2 && (
            <UserTable
              users={newUsers}
              columns={[
                { label: 'Email', key: 'email' },
                { label: 'PSN', key: 'psn' },
                { label: 'Verify Code', key: 'verifyCode' },
                { label: 'Created', key: 'createdAt' },
              ]}
            />
          )}

          {selectedTab === 3 && (
            <UserTable
              users={verifiedUsers}
              columns={[
                { label: 'Email', key: 'email' },
                { label: 'PSN', key: 'psn' },
                { label: 'Role', key: 'role' },
                { label: 'Created', key: 'createdAt' },
              ]}
            />
          )}

        </>
      )}
    </Box>
  )
}