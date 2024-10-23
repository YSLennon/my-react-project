import React from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';

const CustomInput = (props) => {
    
    return (
      <>
          {/* <div>
          <TextField id="standard-basic" label="comment" variant="filled" onChange={(e)=>{
            console.log(e)
          }} /> 
          </div> */}
          <FormControl sx={{ m: 1, width: '80%', margin:'10px auto' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">{props.text}</InputLabel>
            <Input
                disableUnderline // 밑줄 없애기
                variant="filled"
                placeholder="댓글 달기..."  /> 
          </FormControl>
          {/* <div>
          <TextField label="Filled success" variant="filled" color="success" focused />
          </div> */}
      </>
    )
  }
  

export default CustomInput;