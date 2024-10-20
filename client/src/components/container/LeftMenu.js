import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
export default function SideMenu() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 300 }}>
      <img src="./assets/icon/icon_search.png" onClick={handleChange}/>
    <div>
    <Collapse orientation="horizontal" in={checked} sx={{ width: '100%'}}>
    <Box sx={{ width: '300px',height:'600px', background: '#222', display:'block' }}>
        dd
    </Box>
    </Collapse>

    </div>
    </Box>
  );
}
