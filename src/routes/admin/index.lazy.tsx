import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UserProps from '../../types/UserTypes';

import getAllUsers from '../../services/admin/getAllUsers'

export const Route = createLazyFileRoute('/admin/')({
  component: Admin,
})

function Admin() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const apiPrivate = useAxiosPrivate();

  const fetchData = async () => {
    try {
      const allUsers = await getAllUsers(apiPrivate);
      setUsers(allUsers);
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
        </div>
      )}
    </Box>
  )
}