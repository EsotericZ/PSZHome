import { useState } from 'react';
import { Link } from '@tanstack/react-router';

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import GamesIcon from '@mui/icons-material/Games';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import { CircleMenu, CircleMenuItem } from 'react-circular-menu';
import { Box } from '@mui/material';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <Box
        sx={{
          position: 'fixed',
          top: isMenuOpen ? '50%' : '10px',
          left: isMenuOpen ? '50%' : '10px',
          transform: isMenuOpen ? 'translate(-50%, -50%)' : 'none',
          transition: 'all 0.5s ease-in-out',
          zIndex: 1000, 
        }}
        onClick={!isMenuOpen ? toggleMenu : undefined}
      >
        <CircleMenu 
          open={isMenuOpen}
          startAngle={-90} 
          rotationAngle={270} 
          itemSize={2} 
          radius={5}
          onMenuToggle={isMenuOpen ? handleMenuItemClick : undefined}
          menuToggleElement={
            isMenuOpen ? (
              <GamesIcon sx={{ fontSize: 34, color: '#000' }} />
            ) : (
              <ChangeHistoryIcon sx={{ fontSize: 34, color: '#0BC904' }} />
            )
          }
        >
          <CircleMenuItem tooltip='Home'>
            <Box
              sx={{
                backgroundColor: '#1C1C1E',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box 
                component={Link} 
                to={'/'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuItemClick();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  textDecoration: 'none',
                  color: '#0BC904',
                }}
              >
                <ChangeHistoryIcon sx={{ fontSize: 34, marginTop: '-4px' }}/>
              </Box>
            </Box>
          </CircleMenuItem>

          <CircleMenuItem tooltip='Games'>
            <Box
              sx={{
                backgroundColor: '#1C1C1E',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box 
                component={Link} 
                to={'/games'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuItemClick();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  textDecoration: 'none',
                  color: '#FF3B30'
                }}
              >
                <PanoramaFishEyeIcon sx={{ fontSize: 34 }} />
              </Box>
            </Box>
          </CircleMenuItem>

          <CircleMenuItem tooltip='Login'>
            <Box
              sx={{
                backgroundColor: '#1C1C1E',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box 
                component={Link} 
                to={'/'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuItemClick();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  textDecoration: 'none',
                  color: '#0091EA'
                }}
              >
                <CloseIcon sx={{ fontSize: 34 }} />
              </Box>
            </Box>
          </CircleMenuItem>

          <CircleMenuItem tooltip='Top Rated'>
            <Box
              sx={{
                backgroundColor: '#1C1C1E',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box 
                component={Link} 
                to={'/topRated'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuItemClick();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  textDecoration: 'none',
                  color: '#FF4081'
                }}
              >
                <CropSquareIcon sx={{ fontSize: 34 }} />
              </Box>
            </Box>
          </CircleMenuItem>
        </CircleMenu>
      </Box>
    </StyleSheetManager>
  );
};

export default Navbar;