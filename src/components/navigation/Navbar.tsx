import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useTheme } from '@mui/material/styles';

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import GamesIcon from '@mui/icons-material/Games';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import { CircleMenu, CircleMenuItem, TooltipPlacement } from 'react-circular-menu';
import { Box, Backdrop } from '@mui/material';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import LoginComponent from '../portal/LoginComponent';

const Navbar = () => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <>
    <Backdrop
      open={isMenuOpen}
      onClick={handleCloseMenu}
      sx={{
        zIndex: 999, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition: 'opacity 0.3s ease',
      }}
    />

    <StyleSheetManager shouldForwardProp={isPropValid}>
      <Box
        sx={{
          position: 'fixed',
          top: isMenuOpen ? '50%' : '16px',
          left: isMenuOpen ? '50%' : '16px',
          transform: isMenuOpen ? 'translate(-50%, -50%)' : 'none',
          transition: 'all 0.5s ease-in-out',
          zIndex: 1000, 
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: (theme) => theme.palette.primary.main,
          boxShadow: isMenuOpen
            ? `0 0 100px 50px ${theme.palette.primary.main}, 
              0 0 200px 100px rgba(106, 13, 173, 0.5)`
            : 'none',
          animation: isMenuOpen
            ? 'pulse 2.5s infinite ease-in-out'
            : 'none',
          '@keyframes pulse': {
            '0%': {
              boxShadow: `0 0 100px 50px ${theme.palette.primary.main}`,
            },
            '50%': {
              boxShadow: `0 0 200px 100px rgba(106, 13, 173, 0.5)`,
            },
            '100%': {
              boxShadow: `0 0 100px 50px ${theme.palette.primary.main}`,
            },
          },
        }}
        onClick={!isMenuOpen ? toggleMenu : undefined}
      >
        <CircleMenu 
          open={isMenuOpen}
          startAngle={-90} 
          rotationAngle={270} 
          itemSize={2} 
          radius={5}
          onMenuToggle={isMenuOpen ? handleCloseMenu : undefined}
          menuToggleElement={
            isMenuOpen ? (
              <GamesIcon sx={{ fontSize: 34, color: '#000', mt: 1 }} />
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
                padding: '12px',
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
                  handleCloseMenu();
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
                <ChangeHistoryIcon sx={{ fontSize: 34, mt: '-4px' }}/>
              </Box>
            </Box>
          </CircleMenuItem>

          <CircleMenuItem tooltip='Games' tooltipPlacement={TooltipPlacement.Right}>
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
                  handleCloseMenu();
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseMenu();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  textDecoration: 'none',
                  color: '#0091EA',
                  cursor: 'pointer',
                }}
              >
                <LoginComponent />
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
                  handleCloseMenu();
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
    </>
  );
}

export default Navbar;