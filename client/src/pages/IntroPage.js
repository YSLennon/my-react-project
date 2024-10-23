import React, { useReducer } from 'react';
import FlexContainer from '../components/container/FlexContainer';
import { PROFILE_PATH, USER_URL } from '../constants/path';
import { styleIntro } from '../styles/styleIntro';
import FlexSubContainer from '../components/container/FlexSubContainer';
import InputBlock from '../components/input/InputBlock';
import CustomInput from '../components/input/CustomInput';
import CustomButton from '../components/button/Button';
import { FormControl } from '@mui/material';
import axios from 'axios'

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
const IntroPage = () => {
    const [user, userDispatch] = useReducer(reducer, initialState);
    const joinIn = async () => {
        const res = await axios.post(USER_URL, user);
        if(res.data.success){
            alert(res.data.message); // dialog?
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
                    {['ID', 'Password', 'ConfirmPassword', 'Name', 'Phone'].map((item) => {
                        return (
                            <InputBlock text={item} dispatch={userDispatch} pwd={user.pwd} key={item}/>
                        )
                    })}
                    
                    <CustomButton text='회원가입' onclick={()=>{
                        joinIn()
                    }}/>
                    <div style={{flex: 1}}></div>
                    <FormControl sx={{ background: 'none', border: 'none'}}>
                        <div>계정이 있으신가요? <a style={{cursor: 'pointer', color:'#868fa8', fontWeight:'bold'}}>로그인</a></div>
                    </FormControl>
                    
                </FlexSubContainer>
                
                
            </FlexContainer>
        </>
    );
};

export default IntroPage;