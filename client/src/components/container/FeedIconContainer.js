import React from 'react';
import FlexContainer from '../layout/FlexContainer';
import { ICON_Path } from '../../constants/path';
import { Badge } from '@mui/material';
import { useDispatch } from 'react-redux'
import { handleDialogOpen } from '../../store/slices/dialogSlice';
import { feedDetail } from '../../styles/styleDialog';
const FeedIconContainer = (props) => {
    const style={
        cursor: 'pointer',
    }
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
    return (
        <FlexContainer>
            <a style={style} onClick={() => {
                
            }}>
                <img  src={ICON_Path+'icon_favorite.png'} width='40px'/>
            </a>
            
            <a onClick={viewDetail}>
                <Badge badgeContent={props.comments?props.comments.length:0} color="primary">
                    <img style={style} src={ICON_Path+'icon_comment.png'} width='40px'/>
                </Badge>
            </a>
            <span style={{flex: 1}}></span>
            {/* <img style={style} src={ICON_Path+'icon_bookmark.png'} width='40px'/> */}
        </FlexContainer>
    );
};

export default FeedIconContainer;