import { FC } from 'react';
import { Box, Card, CardMedia, Typography, Tooltip, CardContent } from '@mui/material';

interface GameCardProps {
  game: {
    image: string;
    name: string;
  }
  handleFeature: (game: any, index: number) => void;
  featureConfig: {
    title: string;
    Icon: React.ElementType;
  }[];
}

const cardHeight = '150px';

const GameCard: FC<GameCardProps> = ({ game, handleFeature, featureConfig }) => {
  return (
    <Box
    sx={{
      flex: '1 1 calc(33.333% - 16px)',
      maxWidth: 'calc(33.333% - 16px)',
      minWidth: '300px',
    }}
  >
    <Card>
      <Box
        sx={{
          display: 'flex',
          height: cardHeight, 
        }}
      >
        <Box
          sx={{
            flex: '0 0 40%',
            height: '100%',
          }}
        >
          <CardMedia
            component='img'
            loading='lazy'
            height={cardHeight}
            image={game.image}
            alt={game.name}
          />
        </Box>
        <Box
          sx={{
            flex: '1',
            backgroundColor: (theme) => theme.palette.warning.main,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 1,
            height: '100%',
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1, 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Typography
              gutterBottom
              variant='h6'
              color='white'
              sx={{ m: 0, textAlign: 'center' }}
            >
              {game.name}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              alignItems: 'flex-end',
              paddingBottom: 1,
            }}
          >
            {featureConfig.map(({ title, Icon }, index) => (
              <Tooltip key={title} title={title}>
                <Icon
                  sx={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    position: 'relative',
                    bottom: '-5px',
                  }}
                  onClick={() => handleFeature(game, index)}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  </Box>
  );
}

export default GameCard;