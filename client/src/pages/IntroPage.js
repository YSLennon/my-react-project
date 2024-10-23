import React from 'react';
import FlexContainer from '../components/container/FlexContainer';
import { profilePath } from '../constants/path';
import { styleIntro } from '../styles/styleIntro';
import FlexSubContainer from '../components/container/FlexSubContainer';
import InputBlock from '../components/input/InputBlock';
import CustomInput from '../components/input/CustomInput';
import CustomButton from '../components/button/Button';
import { FormControl } from '@mui/material';
const IntroPage = () => {
    
    return (
        <>
            <FlexContainer style={styleIntro}>
                <FlexSubContainer>
                    <img width='100%' src={profilePath+'iu_profile.jpg'} />
                </FlexSubContainer>
                <FlexSubContainer style={{width:'50%', display:'flex', flexDirection:'column'}}>
                    <img src='./clean_logo.png' style={{margin: '10px auto'}} width='30%'  />
                    <InputBlock text='ID' />
                    <InputBlock text='Password'/>
                    <InputBlock text='Password'/>
                    <InputBlock text='Name'/>
                    <InputBlock text='Phone'/>
                    <CustomButton text='회원가입'/>
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