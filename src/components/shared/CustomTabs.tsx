import { FC } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface CustomTabsProps {
  selectedTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  labels: string[];
}

const CustomTabs: FC<CustomTabsProps> = ({ selectedTab, onChange, labels }) => {
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
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;