import { FC, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import UserProps from '../../types/UserTypes';

interface AdminTableProps {
  users: UserProps[];
  filterCondition: (user: UserProps) => boolean;
  columns: { label: string; key: keyof UserProps }[];
}

const AdminTable: FC<AdminTableProps> = ({ users, filterCondition, columns }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users
    .filter(filterCondition)
    .filter((user) =>
      columns.some((column) => {
        const value = user[column.key]?.toString().toLowerCase() || '';
        return value.includes(searchTerm.toLowerCase());
      })
    );

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
              <TableCell align='center' key={column.key}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{user[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminTable;