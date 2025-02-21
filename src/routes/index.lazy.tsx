import { useEffect, useRef, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Box, IconButton, Stack, useMediaQuery } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { useUserContext } from '../context/UserContext';

import FeaturedCard from '../components/home/FeaturedCard';
import FeaturedProps from '../types/FeaturedTypes';
import LoadSymbol from '../components/shared/LoadSymbol';
import LinkBox from '../components/home/LinkBox';

import getAllFeatured from '../services/home/getAllFeatured';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const isMobile = useMediaQuery('(max-width: 950px)');
  const [loading, setLoading] = useState<boolean>(true);
  const [featured, setFeatured] = useState<FeaturedProps[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { state } = useUserContext();

  const links = [
    {
      name: 'About',
      link: '/topRated',
    },
    {
      name: 'Top Rated',
      link: '/topRated',
    },
    {
      name: 'Games',
      link: '/games',
    },
    {
      name: 'Game Help',
      link: '/',
    },
  ];

  const updateWishlist = () => {
    console.log('hit wish')
  };

  const updateBacklog = () => {
    console.log('hit back')
  };

  const openModal = () => {
    console.log('hit open')
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const fetchData = async () => {
    try {
      const featuredData = await getAllFeatured(state?.id ?? undefined);
      console.log(featuredData)
      setFeatured(featuredData);
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
    {loading ? (
      <LoadSymbol />
    ) : (
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton onClick={() => scrollCarousel('left')} sx={{ color: '#fff' }}>
            <ArrowBackIos />
          </IconButton>

          <Box
            ref={carouselRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              whiteSpace: 'nowrap',
              px: 1,
              pb: 2,
              maxWidth: '85vw',
              overflow: 'visible'
            }}
          >
            {featured.map((game) => (
              <FeaturedCard
                key={game.id}
                game={game}
                updateWishlist={() => {}}
                updateBacklog={() => {}}
                openModal={() => {}}
              />
            ))}
          </Box>

          <IconButton onClick={() => scrollCarousel('right')} sx={{ color: '#fff' }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: 2,
            mt: 3,
          }}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <LinkBox name={link.name} height={100} variant='body1' />
            </Link>
          ))}
        </Box>
      </Box>
    )}
  </Box>
  )
};