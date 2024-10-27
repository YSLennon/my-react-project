import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const CustomButton = (props) => {
  useEffect(() => {
    if(props.keypress){
      const handleKeyDownEnter = (e) => {
        if(e.key === 'Enter'){
          props.onclick();
        }
      }
      window.addEventListener('keydown', handleKeyDownEnter);
      return () => {window.removeEventListener('keydown', handleKeyDownEnter);}
    }
  }, [props.onclick]);
    return (
        <>
          <Button variant="contained" sx={props.style} onClick={props.onclick}>
            {props.text}
          </Button>
        </>
    );
};

export default CustomButton;