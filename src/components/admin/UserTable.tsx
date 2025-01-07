import { FC, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';

import UserProps from '../../types/UserTypes';

interface UserTableProps {
  users: UserProps[];
  filterCondition: (user: UserProps) => boolean;
  columns: { label: string; key: keyof UserProps }[];
}

const UserTable: FC<UserTableProps> = ({ users, filterCondition, columns }) => {
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleSearchChange = (key: string, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US').format(date);
  };

  const formatRole = (role: number): string => {
    switch (role) {
      case 2001:
        return 'Player';
      case 5151:
        return 'Blogger';
      default:
        return 'None';
    }
  };

  const filteredUsers = users
    .filter(filterCondition)
    .filter((user) =>
      columns.every((column) => {
        const searchTerm = searchTerms[column.key] || '';
        if (!searchTerm) return true;

        const value =
          column.key === 'role'
            ? formatRole(user[column.key] as number).toLowerCase()
            : user[column.key]?.toString().toLowerCase() || '';

        return value.includes(searchTerm.toLowerCase());
      })
    );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }

    const visiblePages = totalPages <= 5
      ? pages
      : page < 3
        ? [...pages.slice(0, 3), '...', totalPages - 1]
        : page > totalPages - 3
          ? [0, '...', ...pages.slice(totalPages - 3)]
          : [0, '...', page - 1, page, page + 1, '...', totalPages - 1];

    return visiblePages.map((p, index) =>
      typeof p === 'number' ? (
        <Button
          key={index}
          onClick={() => handlePageChange(p)}
          sx={{
            textDecoration: page === p ? 'underline' : 'none',
            color: page === p ? 'white' : 'grey',
          }}
        >
          {p + 1}
        </Button>
      ) : (
        <Typography key={index} sx={{ margin: '0 8px', color: 'grey' }}>
          {p}
        </Typography>
      )
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#2C2C2C',
        padding: 2,
        paddingTop: 0,
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                align='center'
                key={column.key}
                sx={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => setEditingColumn(column.key)}
              >
                {editingColumn === column.key ? (
                  <input
                    type='text'
                    value={searchTerms[column.key] || ''}
                    autoFocus
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      textAlign: 'center',
                      backgroundColor: 'transparent',
                      color: 'white',
                    }}
                    onChange={(e) => handleSearchChange(column.key, e.target.value)}
                    onBlur={() => setEditingColumn(null)}
                  />
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell align='center' key={column.key}>
                  {column.key === 'createdat' && user[column.key]
                    ? formatDate(user[column.key] as string)
                    : column.key === 'role' && user[column.key]
                      ? formatRole(user[column.key] as number)
                      : user[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 2,
        }}
      >
        {page > 0 && (
          <Button
            onClick={() => handlePageChange(page - 1)}
            sx={{ color: 'white', marginRight: 1 }}
          >
            &lt;
          </Button>
        )}
        {renderPageNumbers()}
        {page < totalPages - 1 && (
          <Button
            onClick={() => handlePageChange(page + 1)}
            sx={{ color: 'white', marginLeft: 1 }}
          >
            &gt;
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserTable;