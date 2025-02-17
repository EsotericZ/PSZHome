import { useContext, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

import { ThemeContext } from '../../context/ThemeContext';

import Backlog from '../../components/library/Backlog';
import Collection from '../../components/library/Collection';
import Wishlist from '../../components/library/Wishlist';

export const Route = createLazyFileRoute('/library/')({
  component: Library,
})

function Library() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const [tab, setTab] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
      display: 'none', 
    },
  });

  const StyledTab = styled(Tab)({
    borderRadius: isMobile ? '0px' : '16px',
    textTransform: 'none',
    padding: isMobile ? '8px' : '8px 16px',
    margin: isMobile ? '0 8px' : '0 16px',
    width: isMobile ? 'auto' : '150px',
    backgroundColor: isMobile ? 'transparent' : themeContext.theme.iconInactive,
    color: themeContext.theme.text,
    '&.Mui-selected': {
      backgroundColor: isMobile ? 'transparent' : themeContext.theme.primary,
      color: themeContext.theme.text,
      borderBottom: isMobile ? `2px solid ${themeContext.theme.primary}` : 'none',
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <StyledTabs 
          value={tab} 
          onChange={(_, newValue) => setTab(newValue)} 
          centered
          sx={{ maxWidth: 'fit-content' }}
        >
          <StyledTab label={isMobile ? '👤' : 'Library'} />
          <StyledTab label={isMobile ? '👥' : 'Backlog'} />
          <StyledTab label={isMobile ? '🎮' : 'Wishlist'} />
        </StyledTabs>
      </Box>
  
      <Box sx={{ width: '90%', maxWidth: '1200px', mt: 3 }}>
        {tab === 0 && <Collection />}
        {tab === 1 && <Backlog />}
        {tab === 2 && <Wishlist />}
      </Box>
    </Box>
  );
}