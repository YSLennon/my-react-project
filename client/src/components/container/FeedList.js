import React, { useEffect } from 'react';
import FlexContainer from '../layout/FlexContainer';
import ProfileContainer from './ProfileContainer';
import ImageViewer from './ImageViewer';
import FeedIconContainer from './FeedIconContainer';
import { useDispatch } from 'react-redux'
import { handleDialogOpen } from '../../store/slices/dialogSlice';
import { feedDetail } from '../../styles/styleDialog';
import Comment from './Comment';

const FeedList = (props) => {
    const dispatch = useDispatch();
    const viewDetail = () => {
        dispatch(handleDialogOpen({
            style: feedDetail,
            title: 'feedDialog',
            feed: props.feed,
            comments: props.comments,
            images: props.images
        }));
    }
    useEffect(()=>{
    })
    return (
        <FlexContainer style={style}>
            <ProfileContainer feed={props.feed} comments={props.comments} images={props.images} viewDetail={viewDetail} />
            <a onClick={viewDetail}>
                <ImageViewer fileImages={props.images} type='feed' style={imgStyle} feed={props.feed} comments={props.comments} />
            </a>
            <FeedIconContainer images={props.images} type='feed' style={imgStyle} feed={props.feed} comments={props.comments} />
            <span style={orgStyle}>{props.feed.name}</span>
            <span style={txtStyle}>{props.feed.text}</span>
            <Comment feedNo={props.feed.feedNo}/>
        </FlexContainer>
    );
};

const style = {
    flexDirection: 'column',
    width: '35vw',
    minWidth:'500px',
    minHeight:'500px',
    margin: '100px auto',
}
const imgStyle = {
    width: '35vw',
    height: '35vw',
    minWidth:'500px',
    minHeight:'500px',
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

export default FeedList;