import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import GameSearch from './GameSearch';
import GameCard from './GameCard';
import FeaturedProps from '../../types/FeaturedTypes';
import RAWGProps from '../../types/RAWGTypes';

interface FeaturedGamesProps {
  featuredGames: FeaturedProps[];
  searchedGames: RAWGProps[];
  handleFormSubmit: (value: string) => void;
  handleFeature: (game: FeaturedProps, index: number) => void;
  featureConfig: { title: string; Icon: React.ElementType }[];
}

const FeaturedGames: FC<FeaturedGamesProps> = ({
  featuredGames,
  searchedGames,
  handleFormSubmit,
  handleFeature,
  featureConfig,
}) => {
  return (
    <Box>
      {featuredGames.length > 0 ? (
        featuredGames.map((game, index) => (
          <Typography
            key={index}
            variant="h6"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 2,
            }}
          >
            {game.description}: {game.name}
          </Typography>
        ))
      ) : (
        <Typography>No Featured Games</Typography>
      )}
      <GameSearch onSearch={(value) => handleFormSubmit(value)} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {searchedGames.map((game, index) => (
          <GameCard
            key={index}
            game={game}
            handleFeature={handleFeature}
            featureConfig={featureConfig}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedGames;