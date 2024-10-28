import CustomButton from '../components/button/Button.js'
import SearchBox from '../components/input/SearchBox.js';
import MyAvatar from '../components/avatar/Avatar.js';
import { Divider, Input, TextField } from '@mui/material';
import ChessImageList from '../components/container/ImageList.js';
import SideMenu from './LeftMenu.js';
import CustomDialog from './Dialog.js';
import StudyRedux from '../StudyRedux.js';
import CustomBadge from '../components/container/CustomBadge.js';
import MiniDrawer from '../components/container/Drawer.js';
import FixedContainer from '../components/layout/FixedContainer.js';
import { styleMain } from '../styles/styleMain.js';
import { styleSide } from '../styles/styleSide.js';
import React, { useEffect, useState } from 'react';
import FlexContainer from '../components/layout/FlexContainer.js';
import axiosInstance from '../services/authAxios.js'
import axios from 'axios';
import { FEED_URL } from '../constants/path.js';
import { useDispatch } from 'react-redux';
import { popupSlice, handleOpen, handleClose } from '../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';
import FeedList from '../components/container/FeedList.js';
const MainPage = () => {
    const [flg, setFlg] = useState(true);
    const token = sessionStorage.getItem('token')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [feeds, setFeeds] = useState([]);

    let isLogin = async () => {
        try{
        const result = await axiosInstance.get(FEED_URL, {
            headers: { token },
            withCredentials: true,
        });
        setImages(result.data.images);
        setFeeds(result.data.feedList);
        
    }
    catch(e){
        dispatch(handleOpen(e.response.data.message));
        setTimeout(() => {
            dispatch(handleClose());
            navigate('/')
        },2000)
        
    }};
    useEffect(() => {
    }, [images])
    useEffect(() => {
        isLogin();

    }, [flg])

    return (
        <>
            <FixedContainer style={styleSide}>
                <SideMenu />

            </FixedContainer>
            <FlexContainer style={styleMain}>
                
                {feeds.map((feed) => {
                    return <FeedList key={feed.feedNo} feed={feed} images={images[feed.feedNo]} />
                })}

                {/* {images.map((image, index) => (
                    <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px', margin: '10px' }} />
                ))} */}
                {/* {images.map((image, index) => (
                    <img key={index} src={image[0][2]} alt={`Uploaded ${index}`} style={{ width: '100px', margin: '10px' }} />
                ))} */}
            </FlexContainer>
        </>
    );
};

export default MainPage;

//  {/* <MiniDrawer /> */}
//  <CustomBadge/>
//  {/* <StudyRedux/> */}
//  <CustomButton text="Button" onclick={()=>{alert('hi')}}/>
//  <SearchBox ></SearchBox>
//  <Divider />

//  <ChessImageList/>
 
