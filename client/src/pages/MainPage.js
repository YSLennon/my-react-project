
import SideMenu from './LeftMenu.js';
import FixedContainer from '../components/layout/FixedContainer.js';
import { styleMain } from '../styles/styleMain.js';
import { styleSide } from '../styles/styleSide.js';
import React, { useEffect, useState } from 'react';
import FlexContainer from '../components/layout/FlexContainer.js';
import axiosInstance from '../services/authAxios.js'
import axios from 'axios';
import { FEED_URL } from '../constants/path.js';
import { popupSlice, handleOpen, handleClose } from '../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';
import FeedList from '../components/container/FeedList.js';
import {useSelector, useDispatch} from 'react-redux';

const MainPage = () => {
    const [flg, setFlg] = useState(true);
    const token = sessionStorage.getItem('token')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const [comments, setComments] = useState([]);
    const render = useSelector((state) => state.render.value)

    let isLogin = async () => {
        try{
        const result = await axiosInstance.get(FEED_URL, {
            headers: { token },
            withCredentials: true,
        });
        setImages(result.data.images);
        setFeeds(result.data.feedList);
        setComments(result.data.comments);
        console.log(result)
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

    }, [render])

    return (
        <>
            <FixedContainer style={styleSide}>
                <SideMenu />

            </FixedContainer>
            <FlexContainer style={styleMain}>
                {feeds.map((feed) => {
                    return <FeedList key={feed.feedNo} feed={feed} images={images[feed.feedNo]} comments={comments[feed.feedNo]}/>
                })}

            </FlexContainer>
        </>
    );
};

export default MainPage;


 
