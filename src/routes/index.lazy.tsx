import { useEffect, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Box, Stack, useMediaQuery } from '@mui/material';

import BoxItemFull from '../components/home/BoxItemFull';
import BoxItemSmall from '../components/home/BoxItemSmall';
import Featured from '../components/home/Featured';
import FeaturedProps from '../types/FeaturedTypes';
import LoadSymbol from '../components/shared/LoadSymbol';
import SideBox from '../components/home/SideBox';

import getAllFeatured from '../services/home/getAllFeatured';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const isMobile = useMediaQuery('(max-width:950px)');
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<FeaturedProps>();
  const [boxes, setBoxes] = useState<FeaturedProps[]>([]);

  const sideBar = [
    {
      name: 'Top Rated',
      link: '/topRated',
    },
    {
      name: 'Search Games',
      link: '/games',
    },
    {
      name: 'PSZ Users',
      link: '/',
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

          <Box 
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'} 
            gap={2}
          >
            {boxes.map((box, index) => (
              isMobile ? (
                <Box
                key={index}
                sx={{
                  flexGrow: 1, // ✅ Allows boxes to expand properly
                  // height: isMobile ? '100px' : 'auto',
                  // backgroundColor: 'red', // ✅ Testing visibility
                }}
              >
                <BoxItemSmall
                  key={index}
                  box={box}
                  index={index}
                  handleBoxClick={handleBoxClick}
                />
                </Box>
              ) : (
                <BoxItemFull
                  key={index}
                  box={box} 
                  index={index} 
                  isMobile={isMobile} 
                  loading={loading} 
                  handleBoxClick={handleBoxClick}
                />
              )
            ))}
          </Box>
        </Box>

        {!isMobile && (
          <Stack
            spacing={2}
            sx={{
              flex: 0.15,
            }}
          >
            {sideBar.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <SideBox
                  name={item.name}
                  height={150}
                />
              </Link>
            ))}
          </Stack>
        )}
      </Box>

      {isMobile && (
        <Stack spacing={2}>
          {sideBar.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <SideBox
                name={item.name}
                height={100}
              />
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
};