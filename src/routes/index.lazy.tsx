import { useEffect, useRef, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Box, useMediaQuery } from '@mui/material';
// import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { useUserContext } from '../context/UserContext';

import FeaturedCard from '../components/home/FeaturedCard';
import FeaturedProps from '../types/FeaturedTypes';
import LoadSymbol from '../components/shared/LoadSymbol';
import LinkBox from '../components/home/LinkBox';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import getAllFeatured from '../services/home/getAllFeatured';
import updateBacklog from '../services/backlog/updateBacklog';
import updateWishlist from '../services/wishlist/updateWishlist';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const isMobile = useMediaQuery('(max-width: 950px)');
  const [loading, setLoading] = useState<boolean>(true);
  const [featured, setFeatured] = useState<FeaturedProps[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { state } = useUserContext();
  const apiPrivate = useAxiosPrivate();

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

  const toggleWishlist = async (igdbId: number) => {
    if (!state.id) {
      console.error('User ID is null. Cannot update backlog.');
      return;
    }

    try { 
      await updateWishlist(apiPrivate, igdbId, state.id)

      setFeatured((prevFeatured) => {
        const newState = prevFeatured.map((game) =>
          game.igdbId === igdbId ? { ...game, wishlist: !game.wishlist } : game
        );
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBacklog = async (igdbId: number) => {
    console.log(`Backlog Clicked: ${igdbId}`);

    if (!state.id) {
      console.error('User ID is null. Cannot update backlog.');
      return;
    }

    try { 
      await updateBacklog(apiPrivate, igdbId, state.id)
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    console.log('hit open')
  };

  // const scrollCarousel = (direction: 'left' | 'right') => {
  //   if (!carouselRef.current) return;

  //   const scrollAmount = carouselRef.current.clientWidth * 0.7; 
  //   const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

  //   if (direction === 'left') {
  //     if (carouselRef.current.scrollLeft <= 0) {
  //       carouselRef.current.scrollLeft = maxScrollLeft;
  //     } else {
  //       carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  //     }
  //   } else {
  //     if (carouselRef.current.scrollLeft >= maxScrollLeft) {
  //       carouselRef.current.scrollLeft = 0;
  //     } else {
  //       carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  //     }
  //   }
  // };

  useEffect(() => {
    if (carouselRef.current && featured.length > 0) {
      const firstItem = carouselRef.current.children[Math.floor(featured.length / 3)] as HTMLElement;
      if (firstItem) {
        carouselRef.current.scrollLeft = firstItem.offsetLeft - carouselRef.current.offsetWidth / 2 + firstItem.offsetWidth / 2;
      }
    }
  }, [featured]);

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
<Box sx={{ textAlign: 'center', width: '100%', mt: 5 }}>
  {loading ? (
    <LoadSymbol />
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: 5,
      }}
    >
    {featured.map((game) => (
      <FeaturedCard
        key={game.id}
        game={game}
        toggleWishlist={toggleWishlist}
        toggleBacklog={toggleBacklog}
        openModal={openModal}
      />
    ))}
  </Box>
  )}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      gap: 2,
      mt: 5,
    }}
  >
    {links.map((link, index) => (
      <Link key={index} to={link.link} style={{ textDecoration: 'none', color: 'inherit' }}>
        <LinkBox name={link.name} height={100} variant='body1' />
      </Link>
    ))}
  </Box>
</Box>


  );
}