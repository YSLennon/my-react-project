import React, { useReducer, useRef } from 'react';
import FlexContainer from '../components/layout/FlexContainer';
import { PROFILE_PATH, USER_URL } from '../constants/path';
import { styleIntro } from '../styles/styleIntro';
import FlexSubContainer from '../components/layout/FlexSubContainer';
import InputBlock from '../components/input/InputBlock';
import CustomButton from '../components/button/Button';
import { FormControl,  } from '@mui/material';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { popupSlice, handleOpen } from '../store/slices/popupSlice';
import { emailRegex, nameRegex, passwordRegex, phoneRegex } from '../constants/regex';
import { useNavigate } from 'react-router-dom';

const initialState = {
    id: '',
    pwd: '',
    pwd2: '',
    name: '',
    phone: '',
}
const reducer = (state, action) => {
    switch(action.type){
        case 'ID':
            return {...state, id: action.value}
        case 'Password':
            return {...state, pwd: action.value}
        case 'ConfirmPassword':
            return {...state, pwd2: action.value}
        case 'Name':
            return {...state, name: action.value}
        case 'Phone':
            return {...state, phone: action.value}
    }
}

const JoinPage = () => {
    const disaptch = useDispatch();
    const navigate = useNavigate();
    const [user, userDispatch] = useReducer(reducer, initialState);

    const checkRegex = () => {
        if(!emailRegex.test(user.id)) return '올바른 이메일을 입력해주세요';
        if(!passwordRegex.test(user.pwd)) return '올바른 비밀번호를 입력해주세요';
        if(user.pwd !== user.pwd2) return '비밀번호가 일치하지 않습니다.';
        if(!nameRegex.test(user.name)) return '올바른 이름을 입력해주세요';
        if(!phoneRegex.test(user.phone)) return '올바른 전화번호를 입력해주세요';
        else return ''
      }

    const joinIn = async () => {
        const correctFormat = checkRegex();
        if(correctFormat){
            disaptch(handleOpen(correctFormat));
            return
        }
        const res = await axios.post(USER_URL, user);
        if(res.data.success){
            disaptch(handleOpen(res.data.message));
            navigate('/')
        } else {
            disaptch(handleOpen(res.data.message));
        }
    }

    return (
        <>
            <FlexContainer style={styleIntro}>
                <FlexSubContainer style={{
                    overflow:'hidden',
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}} >
                    <img height='100%' src={'/logo.png'} />
                </FlexSubContainer>
                <FlexSubContainer style={{width:'50%', display:'flex', flexDirection:'column'}}>
                    <img src='./clean_logo.png' style={{margin: '10px auto'}} width='30%'  />
                    {['ID', 'Password', 'ConfirmPassword', 'Name', 'Phone'].map((item) => {
                        return (
                            <InputBlock text={item} dispatch={userDispatch} pwd={user.pwd} key={item}/>
                        )
                    })}
                    
                    <CustomButton keypress={true} text='회원가입' onclick={()=>{
                        joinIn()
                    }}/>
                    <div style={{flex: 1}}></div>
                    <FormControl sx={{ background: 'none', border: 'none'}}>
                        <div>계정이 있으신가요? <a href='/intro' style={{cursor: 'pointer', color:'#868fa8', fontWeight:'bold'}}>로그인</a></div>
                    </FormControl>
                    
                </FlexSubContainer>
                
            </FlexContainer>
        </>
    );
};

export default JoinPage;