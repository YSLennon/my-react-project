import { useState } from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { emailRegex, nameRegex, passwordRegex, phoneRegex } from '../../constants/regex';
import { joinRegexMsg } from '../../constants/message';


const InputBlock = (props) => {
  const [condition, setCondition] = useState(null);
  const getJoinRegexMsg = joinRegexMsg(props.text);
  const checkRegex = (value) => {
    if(props.text === 'ID') return emailRegex.test(value)
    else if(props.text === 'Password') return passwordRegex.test(value)
    else if(props.text === 'ConfirmPassword') return (props.pwd === value);
    else if(props.text === 'Name') return nameRegex.test(value)
    else if(props.text === 'Phone') return phoneRegex.test(value)
  }
  const type = !(props.text === 'Password' || props.text === 'ConfirmPassword')
  const [showPassword, setShowPassword] = React.useState(type);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };
  return (
      <>
        <FormControl sx={{ m: 1, width: '80%', margin:'10px auto',
          borderColor: condition ? '#66bb6a' : 'red', 
          borderWidth: condition ? '2px': '1px',
          borderStyle: (condition !== null) ? 'solid' : 'none' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password"
          sx={{fontWeight: condition?'bold':'normal', color: condition ? '#66bb6a' : 'default' }} >{props.text}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            disableUnderline // 밑줄 없애기
            
            variant="filled"
            onChange={(e)=> {
              props.dispatch({type: props.text, value: e.target.value})
              setCondition(checkRegex(e.target.value));
            }}
            endAdornment={
              (props.text === 'Password' || props.text === 'ConfirmPassword') && (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>)
            }
          />
        </FormControl>
        {(condition === null || condition) ?'': getJoinRegexMsg
         }
      </>
  );
};
export default InputBlock;