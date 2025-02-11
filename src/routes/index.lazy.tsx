import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';

import Featured from '../components/home/Featured';
import FeaturedProps from '../types/FeaturedTypes';
import LoadSymbol from '../components/shared/LoadSymbol';
import SideBox from '../components/home/SideBox';

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
      setBoxes(newBoxes.map((item: any) => item));
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
              position: 'relative',
              width: '100%', 
              height: '100%',
              overflow: 'hidden',
              boxShadow: '0px 0px 8px 0px #E5E4E2',
              borderRadius: '12px'
            }}
          >

            {loading ? (
              <LoadSymbol />
            ) : (
              <Featured
                featured={featured}
              />
            )}
          </Box>

          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            {boxes.map((box, index) => (
              <Box
                key={index}
                sx={{
                  flexBasis: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: isMobile ? 'default' : 'pointer',
                  position: 'relative',
                }}
                onClick={() => handleBoxClick(index)}
              >
                {loading ? (
                  <LoadSymbol />
                ) : (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover img': {
                        opacity: 0.3,
                      },
                      '&:hover .box-text': {
                        opacity: 1,
                      },
                    }}
                  >
                    <img
                      src={box.image}
                      alt={box.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                    <Typography
                      className='box-text'
                      variant='h6'
                      sx={{
                        position: 'absolute',
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 5px black',
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    >
                      {box.name}
                    </Typography>
                  </Box>
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