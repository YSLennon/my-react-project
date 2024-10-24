import CustomButton from '../components/button/Button.js'
import SearchBox from '../components/input/SearchBox.js';
import MyAvatar from '../components/avatar/Avatar.js';
import { Divider, Input, TextField } from '@mui/material';
import ChessImageList from '../components/container/ImageList.js';
import SideMenu from '../components/container/LeftMenu.js';
import CustomDialog from '../components/container/Dialog.js';
import StudyRedux from '../StudyRedux.js';
import CustomBadge from '../components/container/CustomBadge.js';
import MiniDrawer from '../components/container/Drawer.js';
import FixedContainer from '../components/container/FixedContainer.js';
import { styleMain } from '../styles/styleMain.js';
import { styleSide } from '../styles/styleSide.js';
import React from 'react';
import FlexContainer from '../components/container/FlexContainer.js';

const MainPage = () => {
    return (
        <>
            <FixedContainer style={styleSide}>
            <SideMenu />

            </FixedContainer>
            <FlexContainer style={styleMain}>
            {/* <MiniDrawer /> */}
            <CustomBadge/>
            {/* <StudyRedux/> */}
            <CustomDialog />
            <CustomButton text="Button" onclick={()=>{alert('hi')}}/>
            <SearchBox ></SearchBox>
            <Divider />

            <MyAvatar alt="a" src="iu_profile.jpg" />
            <ChessImageList/>

            </FlexContainer>
        </>
    );
};

export default MainPage;