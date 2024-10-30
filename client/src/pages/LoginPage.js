import React, { useReducer, useRef } from 'react';
import FlexContainer from '../components/layout/FlexContainer';
import { FEED_URL, PROFILE_PATH, USER_URL } from '../constants/path';
import { styleIntro } from '../styles/styleIntro';
import FlexSubContainer from '../components/layout/FlexSubContainer';
import InputBlock from '../components/input/InputBlock';
import CustomButton from '../components/button/Button';
import { FormControl,  } from '@mui/material';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { handleOpen } from '../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';
import { decode } from '../services/decode'

const initialState = {
    id: '0',
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
    const idRef = useRef();
    const pwdRef = useRef();
    const navigate = useNavigate();
    const disaptch = useDispatch();
    const [user, userDispatch] = useReducer(reducer, initialState);

    const login = async () => {
        const res = await axios.post(USER_URL+user.id, user, {
            withCredentials: true,
        });
        if(user.id === '' || user.id === null || user.id === undefined){
            userDispatch({type: 'ID', value:'invalid Id'});
        }
        if(res.data.success){
            const user = decode(res.data.accessToken);
            sessionStorage.setItem('token', res.data.accessToken);
            sessionStorage.setItem('id', user.id);
            sessionStorage.setItem('name', user.name);
            sessionStorage.setItem('phone', user.phone);
            const id = sessionStorage.getItem('id');
            const token = res.data.accessToken;
            const result = await axios.get(FEED_URL, {
                withCredentials: true,
                headers:{token},
            })

            navigate(`/main?explore=${id}`)
        } else {        

            disaptch(handleOpen(res.data.message));
            if(res.data.type === 'id'){
                idRef.current.focus();
            } else {
                pwdRef.current.focus();
            }
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
                            <InputBlock type='login' text={item} loginRef={index === 0 ?idRef:pwdRef} dispatch={userDispatch} pwd={user.pwd} key={index}/>
                        )
                    })}
                    
                    <CustomButton keypress={true} text='로그인' onclick={()=>{
                        login()
                        // tempFunction()
                    }}/>
                    <div style={{flex: 1}}></div>
                    <FormControl sx={{ background: 'none', border: 'none'}}>
                        <div>계정이 없으신가요? <a href='/join' style={{cursor: 'pointer', color:'#868fa8', fontWeight:'bold'}}>회원가입</a></div>
                    </FormControl>
                    
                </FlexSubContainer>
                
            </FlexContainer>
        </>
    );
};

export default LoginPage;