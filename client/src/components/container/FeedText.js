import React, { useEffect, useRef, useState } from 'react';
import FlexContainer from '../layout/FlexContainer';
import { feedText } from '../../styles/styleDialog';
import MyAvatar from '../avatar/Avatar';
import { FEED_URL, ICON_Path, PROFILE_PATH } from '../../constants/path';
import { Avatar } from '@mui/material';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../services/authAxios';
import { handleOpen } from '../../store/slices/popupSlice';
import { afterClose, handleAddComment, handleDialogClose } from '../../store/slices/dialogSlice';
import { handleRender } from '../../store/slices/renderSlice';

const FeedText = (props) => {
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch();
    const textRef = props.textRef;
    const id = props.feed? props.feed.id : sessionStorage.getItem('id');
    const myId = sessionStorage.getItem('id');
    useEffect(() => {
        textRef.current = '';
    },[])
    const [txt, setTxt] = useState('');
    const render = useSelector(state => state.render.value);
    const comments = useSelector(state => state.dialog.comments);
    const deleteCommnet = async (commentNo) => {
        try{
            const result = await axiosInstance.delete(FEED_URL+props.feed.feedNo, {
                data: {
                    commentNo
                },
                headers: {
                    token,
                    withCredentials: true,
                },});            
            dispatch(handleAddComment(result.data.comments[props.feed.feedNo]));
            dispatch(handleOpen(result.data.message))
        }catch(e){
            console.log(e);
        } finally{
            dispatch(handleRender());
        }

    }
    useEffect(() => {
    },[render])

    return (
        <FlexContainer style={feedText}>
            
            <div style={{
                fontWeight: 'bold',
                padding:'10px'
            }}>

                <FlexContainer style={{height:'fit-content'}}> 
                    <Avatar sx={{width:'50px', height:'50px'}} alt="profile" src={PROFILE_PATH+"iu_profile.jpg"}  />
                    <a style={style} href={`/profile?id=${id}`}>
                        {id}
                        {props.feed &&
                            <div style={styleContents}>
                                {props.feed.text}
                            </div>
                        }
                    </a>
                    { props.feed && <span style={styleDate}>{ props.feed.createdAt }</span> }

                    {/* {props.feed &&
                        <a>
                         <img src={ICON_Path+'icon_more_menu.png'} width='20px' height='20px'/>
                        </a>
                    } */}
                </FlexContainer>
                {
                    props.comments && 
                    comments.map((item) => {
                        return (
                            <FlexContainer key={item[0]} style={{height:'fitContent', padding:'5px 0px', width:'100%'}}> 
                                <Avatar sx={{width:'50px', height:'50px'}} alt="profile" src={PROFILE_PATH+"iu_profile.jpg"}  />
                                <a style={style} href={`/profile?id=${item[2]}`}>
                                    {item[2]}
                                    <div style={styleContents}>
                                        {item[1]}
                                    </div>
                                </a>
                                { props.feed && <span style={styleDate}>{ item[3] }</span> }
                                <span style={{flex: 1}}></span>
                                {props.feed && myId === item[0] &&
                                    <a
                                        onClick={() => {
                                            deleteCommnet(item[4])
                                        }}
                                        style={{color: 'red',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            opacity:'0.7',
                                            padding: '7px 2px',
                                            textDecoration:'none',
                                            cursor:'pointer'
                                            }}>
                                        삭제
                                    </a>
                                }
                            </FlexContainer>
                        )
                    })
                }
            </div>
            { props.feed && <div style={{flex:1}}></div> }
            {
                props.feed &&
                <div style={{
                    padding:'5px 5px'
                }}>
                    <Comment feedNo={props.feed.feedNo} />
                </div>
            }
            
            {
                !props.feed &&
                <textarea 
                    ref={props.textRef}
                    onChange={(e) => {
                        textRef.current = e.target.value
                        console.log(textRef.current)
                        setTxt(e.target.value);
                    }}
                    value={textRef.current?textRef.current:''}
                    style={{
                    flex: '1',
                    fontSize:'16px',
                    border: 'none', // 테두리 설정
                    padding: '12px', // 안쪽 여백
                    outline: 'none' // 포커스 시 테두리 강조 비활성화
                }}></textarea>
            }
        </FlexContainer>
    );
};

const style = {
    fontSize: '15px',
    fontWeight: 'bold',
    padding: '5px 15px',
    textDecoration:'none',
    color: 'black',
}
const styleDate = {
    fontSize: '10px',
    fontWeight: 'bold',
    opacity: '0.6',
    padding: '7px 0px',
    textDecoration:'none',
    color: 'black',
}
const styleContents = {
    width:'21vw',
    fontWeight: 'normal',
    padding:'2px',
    fontSize:'13px',
    wordWrap: 'break-word',
    whiteSpace: 'normal', 
}
export default FeedText;