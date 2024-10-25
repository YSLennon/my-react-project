import React, { useReducer, useRef } from 'react';
import FlexContainer from '../components/container/FlexContainer';
import { FEED_URL, PROFILE_PATH, USER_URL } from '../constants/path';
import { styleIntro } from '../styles/styleIntro';
import FlexSubContainer from '../components/container/FlexSubContainer';
import InputBlock from '../components/input/InputBlock';
import CustomButton from '../components/button/Button';
import { FormControl,  } from '@mui/material';
import axios from 'axios'
import CustomPopup from '../components/popup/CustomPopup';
import { useDispatch } from 'react-redux';
import { popupSlice, handleOpen } from '../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';
import { decode } from '../services/decode'

const initialState = {
    id: '',
    pwd: ''
}
const reducer = (state, action) => {
    switch(action.type){
        case 'ID':
            return {...state, id: action.value}
        case 'Password':
            return {...state, pwd: action.value}
    }
}

const LoginPage = () => {
    const navigate = useNavigate();
    const disaptch = useDispatch();
    const [user, userDispatch] = useReducer(reducer, initialState);

    const login = async () => {
        const res = await axios.post(USER_URL+user.id, user, {
            withCredentials: true,
        });

        if(res.data.success){
            const user = decode(res.data.accessToken);
            console.log(res);
            sessionStorage.setItem('token', res.data.accessToken);
            sessionStorage.setItem('user', user);
            
            const token = res.data.accessToken;
            const result = await axios.get(FEED_URL, {
                withCredentials: true,
                headers:{token},
            })
            console.log(result)

            navigate('/main')
        } else {
            disaptch(handleOpen(res.data.message));
        }
    }

    return (
        <>
            <FlexContainer style={styleIntro}>
                <FlexSubContainer>
                    <img width='100%' src={PROFILE_PATH+'iu_profile.jpg'} />
                </FlexSubContainer>
                <FlexSubContainer style={{width:'50%', display:'flex', flexDirection:'column'}}>
                    <img src='./clean_logo.png' style={{margin: '10px auto'}} width='30%'  />
                    {['ID', 'Password'].map((item, index) => {
                        return (
                            <InputBlock type='login' text={item} dispatch={userDispatch} pwd={user.pwd} key={index}/>
                        )
                    })}
                    
                    <CustomButton text='로그인' onclick={()=>{
                        login()
                        // tempFunction()
                    }}/>
                    <div style={{flex: 1}}></div>
                    <FormControl sx={{ background: 'none', border: 'none'}}>
                        <div>계정이 없으신가요? <a style={{cursor: 'pointer', color:'#868fa8', fontWeight:'bold'}}>회원가입</a></div>
                    </FormControl>
                    
                </FlexSubContainer>
                <CustomPopup />
                
            </FlexContainer>
        </>
    );
};

export default LoginPage;