import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const CustomButton = (props) => {
    return (
        <>
          <Button variant="contained" onClick={props.onclick}>
            {props.text}
          </Button>
        </>
    );
};

export default CustomButton;