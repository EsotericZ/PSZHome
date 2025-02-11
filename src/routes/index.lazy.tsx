import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';

import SideBox from '../components/home/SideBox';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [featured, setFeatured] = useState('Featured');
  const [boxes, setBoxes] = useState(['Box 1', 'Box 2', 'Box 3', 'Box 4']);

  const handleBoxClick = (index: number) => {
    if (isMobile) return;

    const newFeatured = boxes[index];
    const newBoxes = [featured, ...boxes.filter((_, i) => i !== index)];
    setFeatured(newFeatured);
    setBoxes(newBoxes);
  };

  const sideBar = [
    {
      name: 'Top Rated',
      color: 'info.main',
    },
    {
      name: 'Search Games',
      color: 'info.main',
    },
    {
      name: 'Item 3',
      color: 'info.main',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        padding: 2,
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
        }}
      >
        {/* Featured and Smaller Boxes */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Featured Box */}
          <Box
            sx={{
              width: '100%',
              height: 150,
              backgroundColor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' color='white'>
              {featured}
            </Typography>
          </Box>

          {/* Smaller Boxes */}
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            {boxes.map((box, index) => (
              <Box
                key={index}
                sx={{
                  flexBasis: '100%',
                  height: 100,
                  backgroundColor: 'secondary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: isMobile ? 'default' : 'pointer',
                }}
                onClick={() => handleBoxClick(index)}
              >
                <Typography variant='body1' color='white'>
                  {box}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Sidebar for Desktop */}
        {!isMobile && (
          <Stack
            spacing={2}
            sx={{
              flex: 0.25,
            }}
          >
            {sideBar.map((item, index) => (
              <SideBox 
                key={index}
                name={item.name}
                color={item.color} 
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Sidebar for Mobile */}
      {isMobile && (
        <Stack spacing={2}>
          {sideBar.map((item, index) => (
            <Box
              key={index}
              sx={{
                height: 100,
                backgroundColor: 'info.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant='body1' color='white'>
                {item.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};