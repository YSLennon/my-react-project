import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ToolTip from '../components/container/ToolTip';
import { ICON_Path, USER_URL } from '../constants/path';
import { Divider, IconButton, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleOpen } from '../store/slices/popupSlice';
import axios from 'axios';
import { handleDialogOpen } from '../store/slices/dialogSlice';
import { addImageDialog } from '../styles/styleDialog';
import { handleRender } from '../store/slices/renderSlice';

export default function SideMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const icon = ICON_Path;
  const sideMenuStyle = {
    display: 'inline-block',
    width: 'fit-content'
  }
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const logout = async () => {
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const res = await axios.get(USER_URL+id, {
      headers: { token }
    });
    if (res.data.success){
      sessionStorage.clear();
      dispatch(handleOpen(res.data.message));
      setTimeout(() => {
        navigate('/');  
      }, 1000);
      
    }
  }
  // , 'icon_favorite.png' -> 하고싶으면 추가해
  return (
    <>
      <Box sx={{ width: 'fit-content', display:'flex', height:'100%' }}>
        <span style={sideMenuStyle}>
          <Stack sx={{padding:'10px 10px', background:'#eee', height:'100%'}}>
          {['icon_logo.png', 'icon_home.png', 'icon_search.png', 'icon_explore.png','icon_add_circle.png', 'icon_logout.png'].map(item => (
            <ToolTip title={
              item === 'icon_logo.png'? 'Profile'
              : item.replace('icon_', '').replace('.png', '')
              } key={item}>
              <IconButton 
                onClick={() => {
                  if(item === 'icon_logo.png'){
                    navigate('/profile');
                    dispatch(handleRender());
                    return;
                  } else if(item === 'icon_home.png'){
                    navigate('/main');
                    dispatch(handleRender());
                    return;
                  } else if(item === 'icon_explore.png'){
                    navigate('/main?feed=explore');
                    dispatch(handleRender());
                    return;
                  } else if(item === 'icon_logout.png'){
                    logout();
                    return;
                  } else if (item === 'icon_add_circle.png'){
                    dispatch(handleDialogOpen({style: addImageDialog , title: '새 게시물 만들기'}));
                    return;
                  }
                  handleChange()
                }
                
                } 
                sx={{ borderRadius:'15px'}}>
                <img src={icon+item} width='50px'/>
              </IconButton>
            </ToolTip>
          ))}
        </Stack>
        </span>
        {/* sx={{ width: '100%', display: 'inline-block', flex: '1', transition: 'height 0.3s ease' }} */}
      <Collapse orientation="horizontal" in={checked} sx={{ display:'inline-block', flex:'1',}}>
        <Box sx={{ width: '300px',height:'100%', background: '#aaa', display:'block', opacity:'0.5', color:'white', padding: '10px' }}>
            
          {/* <SearchBox ></SearchBox> */}
          <Divider />
        </Box>
      </Collapse>
      </Box>


    </>
  );
}
