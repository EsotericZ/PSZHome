import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';

import SideBox from '../components/home/SideBox';
import FeaturedProps from '../types/FeaturedTypes';
import LoadSymbol from '../components/shared/LoadSymbol';

import getAllFeatured from '../services/home/getAllFeatured';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const isMobile = useMediaQuery('(max-width:800px)');
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<FeaturedProps>();
  const [boxes, setBoxes] = useState<FeaturedProps[]>([]);

  const sideBar = [
    {
      name: 'Item 1',
      color: 'info.main',
    },
    {
      name: 'Item 2',
      color: 'info.main',
    },
    {
      name: 'Item 3',
      color: 'info.main',
    },
  ];

  const fetchData = async () => {
    try {
      const featuredData = await getAllFeatured();
      const newFeatured = featuredData.find((item: any) => item.order === 1);

      const newBoxes = featuredData
        .filter((item: any) => item.order > 1)
        .sort((a: any, b: any) => a.order - b.order);

      if (newFeatured) {
        setFeatured(newFeatured);
      }
      setBoxes(newBoxes.map((item: any) => ({ name: item.name, order: item.order })));        
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleBoxClick = (index: number) => {
    if (!featured) return;
  
    const newFeatured = boxes[index];
    const newBoxes = boxes.map((box, i) =>
      i === index ? featured : box
    );
  
    setFeatured(newFeatured);
    setBoxes(newBoxes.sort((a, b) => a.order - b.order));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
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
            {loading ? (
              <LoadSymbol />
            ) : (
              <Typography variant='h5' color='white'>
                {featured?.name}
              </Typography>
            )}
          </Box>

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
                {loading ? (
                  <LoadSymbol />
                ) : (
                  <Typography variant='body1' color='white'>
                    {box.name}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Box>

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