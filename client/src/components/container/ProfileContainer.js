import React from 'react';
import MyAvatar from '../avatar/Avatar';
import FlexContainer from '../layout/FlexContainer';
import { IconButton, styled } from '@mui/material';
import { ICON_Path } from '../../constants/path';
import FeedIconContainer from './FeedIconContainer';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = (props) => {
    const navigagte = useNavigate();
    const style = {
        fontSize: '17px',
        fontWeight: 'bold',
        padding: '5px 15px',
        textDecoration:'none',
        color: 'black',
    }
    const styleDate = {
        fontSize: '12px',
        fontWeight: 'bold',
        opacity: '0.6',
        padding: '7px 0px',
        textDecoration:'none',
        color: 'black',
    }
    const toProfile = () => {
        navigagte('/profile?id='+props.feed.id)
    }
    return (
        <FlexContainer> 
            <a href='' onClick={toProfile}>
                <MyAvatar alt="profile" src="iu_profile.jpg"  />
            </a>
            
            <a href='#' onClick={toProfile} style={style}>{props.feed.id}</a>
            <a href='#' onClick={toProfile} style={styleDate}>3일 전</a>
            <span style={{flex: 1}}></span>
            <a href='#' onClick={()=>{}}>
                <img src={ICON_Path+'icon_more_menu.png'} width='35px' height='35px'/>
            </a>

        </FlexContainer>
    );
};

export default ProfileContainer;