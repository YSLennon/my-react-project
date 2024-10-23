import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ToolTip from './ToolTip';
import { ICON_Path } from '../../constants/path';
import { IconButton, Stack } from '@mui/material';
import { useEffect } from 'react';

export default function SideMenu() {
  const [checked, setChecked] = React.useState(false);
  const icon = ICON_Path;
  const sideMenuStyle = {
    display: 'inline-block',
    width: 'fit-content'
  }
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  
  // useEffect(() => {
  //   setChecked(prev => !prev);
  // },[])
  return (
    <>
      <Box sx={{ width: 'fit-content', display:'flex' }}>
        <span style={sideMenuStyle}>
          <Stack >
          {['icon_home.png', 'icon_search.png', 'icon_explorer.png', 'icon_favorite.png', 'icon_logout.png'].map(item => (
            <ToolTip title={item.replace('icon_', '').replace('.png', '')} key={item}>
              <IconButton onClick={handleChange} sx={{ borderRadius:'15px'}}>
                <img src={icon+item} width='50px'/>
              </IconButton>
            </ToolTip>
          ))}
        </Stack>
        </span>
        {/* sx={{ width: '100%', display: 'inline-block', flex: '1', transition: 'height 0.3s ease' }} */}
      <Collapse orientation="horizontal" in={checked} sx={{ display:'inline-block', flex:'1'}}>
        <Box sx={{ width: '300px',height:'600px', background: '#222', display:'block', opacity:'0.5' }}>
            dd
        </Box>
      </Collapse>
      </Box>
    </>
  );
}
