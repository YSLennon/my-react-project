import React from 'react';
import MyAvatar from '../avatar/Avatar';
import FlexContainer from '../layout/FlexContainer';
import { IconButton } from '@mui/material';
import { ICON_Path } from '../../constants/path';
import FeedIconContainer from './FeedIconContainer';

const ProfileContainer = (props) => {
    const style = {
        fontSize: '17px',
        fontWeight: 'bold',
        padding: '5px 15px'
    }
    const styleDate = {
        fontSize: '12px',
        fontWeight: 'bold',
        opacity: '0.6',
        padding: '7px 0px'
    }
    return (
        <FlexContainer> 
            <MyAvatar alt="profile" src="iu_profile.jpg" />
            <span style={style}>{props.feed.id}</span>
            <span style={styleDate}>3일 전</span>
            <span style={{flex: 1}}></span>
            <img src={ICON_Path+'icon_more_menu.png'} width='40px'/>

        </FlexContainer>
    );
};

export default ProfileContainer;