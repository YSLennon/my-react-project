import { useEffect } from "react";

export const joinRegexMsg = (text) => {
    let message ='';
    console.log(text);
    if(text === 'ID') message = '올바른 이메일 형식으로 작성해주세요'
    if(text === 'Password') message = '8자리 이상의 영문, 숫자, 특수문자가 필요합니다'
    if(text === 'ConfirmPassword') message = '동일한 비밀번호를 입력해주세요'
    if(text === 'Name') message = '영문, 숫자만 입력 가능합니다'
    if(text === 'Phone') message = '숫자로만 이뤄진 올바른 번호를 입력해주세요' 
    return <div style={{ m: 1, fontSize:'12px',fontWeight:'bold', color:'red', width: '80%', margin:'-7px auto' }} >
    {message}
  </div>
}