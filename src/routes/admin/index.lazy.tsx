import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

import UserProps from '../../types/UserTypes';

import getAllUsers from '../../services/admin/getAllUsers'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
    <>
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
    </>
  )
}