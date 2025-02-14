import { useContext, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

import { ThemeContext } from '../../context/ThemeContext';
import { useUserContext } from '../../context/UserContext';

import Friends from '../../components/profile/Friends';
import GameHelp from '../../components/profile/GameHelp';
import ProfileInfo from '../../components/profile/ProfileInfo';

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  const { state } = useUserContext();
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme } = themeContext;
  const [tab, setTab] = useState<number>(0);

  const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
      display: 'none', 
    },
  });

  const StyledTab = styled(Tab)({
    borderRadius: '16px',
    textTransform: 'none',
    padding: '8px 16px',
    margin: '0 16px',
    width: '150px',
    backgroundColor: theme.iconInactive, 
    color: theme.text,
    '&.Mui-selected': {
      backgroundColor: theme.primary,
      color: theme.text,
    },
  });

  return (
    state.verified ? (
      <Box sx={{ maxWidth: 600, margin: 'auto', p: 3 }}>
        <StyledTabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
          <StyledTab label='Profile' />
          <StyledTab label='Friends' />
          <StyledTab label='Game Help' />
        </StyledTabs>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <ProfileInfo />}
          {tab === 1 && <Friends />}
          {tab === 2 && <GameHelp />}
        </Box>
      </Box>
    ) : (
      <Box>
        <h3>Verify Your Profile To Use This Feature</h3>
      </Box>
    )
  );
}