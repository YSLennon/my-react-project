import { useState } from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const InputBlock = (props) => {
    const type = !(props.text === 'Password')
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
          <FormControl sx={{ m: 1, width: '80%', margin:'10px auto' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">{props.text}</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              disableUnderline // 밑줄 없애기
              variant="filled"
              endAdornment={
                (props.text === 'Password') && (<InputAdornment position="end">
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
        </>
    );
};
export default InputBlock;