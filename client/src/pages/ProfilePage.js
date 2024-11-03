
import { Avatar, Divider, IconButton, Input, TextField } from '@mui/material';
import ChessImageList from '../components/container/ImageList.js';
import SideMenu from './LeftMenu.js';
import FixedContainer from '../components/layout/FixedContainer.js';
import { styleMain } from '../styles/styleMain.js';
import { styleSide } from '../styles/styleSide.js';
import React, { useEffect, useRef, useState } from 'react';
import FlexContainer from '../components/layout/FlexContainer.js';
import axiosInstance from '../services/authAxios.js'
import { FEED_URL, FOLLOW_URL, ICON_Path, PROFILE_PATH, PROFILE_URL } from '../constants/path.js';
import { handleOpen, handleClose } from '../store/slices/popupSlice.js';
import { handleRender } from '../store/slices/renderSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../components/button/Button.js'
import { handleDialogOpen } from '../store/slices/dialogSlice.js';
import { addImageDialog } from '../styles/styleDialog.js';
const token = sessionStorage.getItem('token')

const ProfilePage = () => {
    const [flg, setFlg] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const [comments, setComments] = useState([]);
    const render = useSelector((state) => state.render.value)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const profileId = searchParams.get('id')? searchParams.get('id') : sessionStorage.getItem('id')
    const id = sessionStorage.getItem('id');
    const [name, setName] = useState('');
    const [isFollowed, setFollowed] = useState(0);
    const [follower, setFollower] = useState(0);
    const [following, setFollowing] = useState(0);
    const [ profileImage,setProfileImage ] = useState(null);
    let isLogin = async () => {
        try{
        await readProfile();
        const result = await axiosInstance.get(FEED_URL+profileId, {
            headers: { token },
            withCredentials: true,
        });
        setImages(result.data.images);
        setFeeds(result.data.feedList);
        setComments(result.data.comments);
        const followerResult = await axiosInstance.get(FOLLOW_URL+profileId, {
            headers: {
                type:'follower',             
                token },
            withCredentials: true,
        });
        setFollowed(followerResult.data.follow.filter(item => item.followingId === profileId).length);
        setFollower(followerResult.data.follow);
        const followingResult = await axiosInstance.get(FOLLOW_URL+profileId, {
            headers: {
                type:'following',             
                token },
            withCredentials: true,
        });
        setFollowing(followingResult.data.follow);
    } catch(e){
        dispatch(handleOpen(e.response.data.message));
        setTimeout(() => {
            dispatch(handleClose());
            navigate('/')
        },2000)
        console.log(e)
    }};

    useEffect(() => {
        isLogin();
    }, [render])


    const readProfile = async () => {
        try {
            const res = await axiosInstance.get(PROFILE_URL+profileId,{
                headers: {
                    token,
                    withCredentials: true,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(res.data.success){
                setProfileImage(res.data.profile);
                setName(res.data.profileName);
            }
            
        } catch (error) {
            console.error('Error uploading files:', error);
        }
      }

    const follow = async () => {
        const result = await axiosInstance.post(FOLLOW_URL+id, {
            followingId: profileId
        },{
            headers: { token },
            withCredentials: true,
        });
        dispatch(handleRender());
    }
    
    const unFollow = async () => {
        const result = await axiosInstance.delete(FOLLOW_URL+id, {
            data: {followingId: profileId}
        },{
            headers: { token },
            withCredentials: true,
        });
        dispatch(handleRender());
    }
    return (
        <>
            <FixedContainer style={styleSide}>
                <SideMenu />
            </FixedContainer>
            <FlexContainer style={styleMain}>
                <FlexContainer style={{margin:'50px auto', width: '45vw', minWidth: '800px'}}>
                    <IconButton onClick={()=>{
                        dispatch(handleDialogOpen({style: addImageDialog , title: '프로필 수정', type: 'profile' }));
                    }}
                    disabled={profileId !== id}
                    >
                        <Avatar alt="profile" src={profileImage? profileImage : PROFILE_PATH+"iu_profile.jpg"} sx={{width: '200px', height: '200px'}} />
                    </IconButton>

                    <FlexContainer style={{flexDirection:'column', flex:1, padding:'0px 30px'}}>
                        <div style={style}>
                            <span style={{margin:'auto 0px'}}>{profileId}</span>
                            <span style={{flex:1}}> </span>
                            {
                                profileId !== id && (
                                    (isFollowed > 0) ? <CustomButton style={{width: '100px'}} text='팔로우됨' onclick={unFollow}></CustomButton>
                                    : <CustomButton style={{width: '100px'}} text='팔로우' onclick={follow}></CustomButton>
                                )
                            }
                            
                        </div>
                        <div style={style}>
                            <span style={styleDate}>게시물 {feeds.length}</span>
                            <span style={styleDate}>팔로워 {follower.length}</span>
                            <span style={styleDate}>팔로우 {following.length}</span>
                        </div>
                        <div style={style}>
                            <span style={{opacity:0.8, fontSize: '14px',}}>{name}</span>
                        </div>
                    </FlexContainer>
                    <img src={ICON_Path+'icon_more_menu.png'} style={{marginBottom:'auto'}} width='40px' />
                </FlexContainer>    
                <ChessImageList feeds = {feeds} images = {images} comments={comments}
                    style={{margin:'50px auto', width: '45vw', minWidth: '800px'}}/>
                

            </FlexContainer>
        </>
    );
};

const style = {
    fontSize: '17px',
    fontWeight: 'bold',
    padding: '10px 30px',
    display: 'flex'
}
const styleDate = {
    fontSize: '17px',
    fontWeight: 'bold',
    opacity: '0.6',
    padding: '0px 45px 0px 15px'
}
export default ProfilePage;

//  {/* <MiniDrawer /> */}
//  <CustomBadge/>
//  {/* <StudyRedux/> */}
//  <CustomButton text="Button" onclick={()=>{alert('hi')}}/>
//  <SearchBox ></SearchBox>
//  <Divider />
 
