import { FC, ReactNode, SyntheticEvent } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface CustomTabsProps {
  selectedTab: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
  labels: string[];
  tabIcons?: (ReactNode | null)[];
}

const CustomTabs: FC<CustomTabsProps> = ({ selectedTab, onChange, labels, tabIcons = [] }) => {
  return (
    <Box sx={{ width: '100%', pb: 3 }}>
      <Tabs
        value={selectedTab}
        onChange={onChange}
        centered
        sx={{
          '& .MuiTab-root': {
            color: 'white',
            mx: 3,
          },
          '& .Mui-selected': {
            color: 'inherit',
          },
        }}
      >
        {labels.map((label, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {label}
                {tabIcons[index]}
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;