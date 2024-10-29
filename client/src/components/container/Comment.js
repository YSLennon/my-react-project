import { Divider, Hidden, stepClasses } from '@mui/material';
import React, { useRef, useState } from 'react';
import CustomButton from '../button/Button';
import FlexContainer from '../layout/FlexContainer';
import axiosInstance from '../../services/authAxios'
import { FEED_URL } from '../../constants/path';
import { useDispatch } from 'react-redux'
import { handleRender } from '../../store/slices/renderSlice'
import { handleOpen } from '../../store/slices/popupSlice'
import { handleAddComment } from '../../store/slices/dialogSlice'

const Comment = (props) => {
    const [state, setState] = useState('');
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch();
    const addComment = async () => {
        try {
            const res = await axiosInstance.post(FEED_URL+id,{
                content: state,
                boardNo: props.feedNo
            }, {
                headers: {
                    token,
                    withCredentials: true,
                },
            });
            if(res.data.success){
                console.log(res.data)
              dispatch(handleOpen(res.data.message));
              setState('')
              dispatch(handleAddComment(res.data.comments[props.feedNo]));
              dispatch(handleRender());
            }
            
        } catch (error) {
            console.error('Error uploading files:', error);
        }

    }
    return (
        <>
            <FlexContainer>
                <input style={inputStyle} onChange={(e)=>{
                    setState(e.target.value);
                    console.log(props.feedNo)
                }}
                 value={state} type='text' placeholder='댓글 달기...' />
                <a href='#' onClick={addComment} style={{padding: '10px', textDecoration:'none', color:'#444'}}>게시</a>
            </FlexContainer>
            <Divider sx={{border: '1px solid #ccc'}} />
        </>
    );
};
const inputStyle={
    border: '0px solid black',
    fontSize: '17px',
    padding: '10px 15px',
    outline: 'none',
    flex: 1,
}

export default Comment;