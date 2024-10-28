import React, { useEffect } from 'react';
import FlexContainer from '../layout/FlexContainer';
import ProfileContainer from './ProfileContainer';
import ImageViewer from './ImageViewer';
import FeedIconContainer from './FeedIconContainer';
import { Divider } from '@mui/material';

const FeedList = (props) => {
    const style = {
        flexDirection: 'column',
        width: '40vw',
        margin: '100px auto',
    }
    const imgStyle = {
        width: '40vw',
        height: '40vw',
        position: 'relative',
        background: '#eee',
        overflow: 'hidden',
        cursor: 'pointer',
        margin: '10px auto'
    }
    const orgStyle = {
        fontSize: '17px',
        fontWeight: 'bold',
        padding: '5px 15px'
    }
    const txtStyle ={
        fontSize: '17px',
        padding: '2px 15px'
    }
    const inputStyle={
        border: '0px solid black',
        fontSize: '17px',
        padding: '10px 15px',
        outline: 'none'
    }
    useEffect(()=>{
    })
    return (
        <FlexContainer style={style}>
            <ProfileContainer feed={props.feed} />
            <ImageViewer fileImages={props.images} type='feed' style={imgStyle}/>
            <FeedIconContainer />
            <span style={orgStyle}>{props.feed.id}</span>
            <span style={txtStyle}>{props.feed.text}</span>
            <input style={inputStyle} type='text' placeholder='댓글 달기...' />
            <Divider sx={{border: '2px solid #ccc'}} />
        </FlexContainer>
    );
};

export default FeedList;