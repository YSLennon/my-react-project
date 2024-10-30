import React from 'react';
import FlexContainer from '../layout/FlexContainer';
import { Divider, ListItemButton, ListItemText } from '@mui/material';
import axiosInstance from '../../services/authAxios';
import { FEED_URL } from '../../constants/path';
import { useDispatch } from 'react-redux';
import { handleRender } from '../../store/slices/renderSlice';
import { afterClose, handleDialogClose, handleDialogOpen } from '../../store/slices/dialogSlice';
import { handleOpen } from '../../store/slices/popupSlice';
import { findNonSerializableValue } from '@reduxjs/toolkit';
import { feedDetail } from '../../styles/styleDialog';

const token = sessionStorage.getItem('token');

const MenuBox = (props) => {
    const dispatch = useDispatch();
    const deleteFeed = async () => {
        try{
            const result = await axiosInstance.delete(FEED_URL, {
                data: {
                    feedNo: props.feed.feedNo
                },
                headers: {
                    token,
                    withCredentials: true,
                },});            
            dispatch(handleOpen(result.data.message))
        }catch(e){
            console.log(e);
        } finally{
            dispatch(handleDialogClose());
            setTimeout(() => {
                dispatch(afterClose());
            }, 200);
            dispatch(handleRender());
        }
    }
    return (
        <FlexContainer style={style}>
            {/* <ListItemButton onClick={() => {}}>
                <div style={menuStyle}>팔로우</div>
                <div style={menuStyle}>팔로우 취소</div>
            </ListItemButton>
            <Divider/> */}
            <ListItemButton onClick={deleteFeed}>
                <div style={menuStyle}>게시글 삭제</div>
            </ListItemButton>
            <Divider/>
            <ListItemButton onClick={()=>{
                console.log(props)
                dispatch(handleDialogOpen({
                    style: feedDetail,
                    title: 'feedDetail',
                    feed: props.feed,
                    comments: props.comments,
                    images: props.images
                }));

            }}>
                <div style={menuStyle}>댓글 보기</div>
            </ListItemButton>
            <Divider/>
            <ListItemButton onClick={() => {
                dispatch(handleDialogClose());
                setTimeout(() => {
                    dispatch(afterClose());
                }, 200);
            }}>
                <div style={menuStyle}>취소</div>
            </ListItemButton>

        </FlexContainer>
    );
};
const style = {
    flexDirection: 'column',
    padding: '20px 0px',
}
const menuStyle = {
    padding: '5px',
    margin: '0px auto',
    fontWeight: 'bold',
    
}
export default MenuBox;