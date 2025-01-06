import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import GameProps from '../../types/GameTypes';
import FeaturedProps from '../../types/FeaturedTypes';
import UserProps from '../../types/UserTypes';

import getAllFeatured from '../../services/admin/getAllFeatured';
import getAllUsers from '../../services/admin/getAllUsers'

interface FeaturedWithGameProps extends FeaturedProps {
  game?: GameProps;
}

export const Route = createLazyFileRoute('/admin/')({
  component: Admin,
})

function Admin() {
  const [featuredGames, setFeaturedGames] = useState<FeaturedWithGameProps[]>([]);
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <h3>Admin</h3>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          {users.map((user, index) => (
            <p key={index}>{user.email}</p>
          ))}
          {featuredGames.length > 0 ? (
            featuredGames.map((game, index) => (
              <p key={index}>{game.game?.name}</p>
            ))
          ) : (
            <p>No Featured Games</p>
          )}
        </div>
      )}
    </Box>
  )
}