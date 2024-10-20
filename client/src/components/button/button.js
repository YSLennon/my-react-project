import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const CustomButton = (props) => {
    return (
        <div>
          <Button variant="contained" onClick={props.onclick}>
            {props.text}
          </Button>
        </div>
    );
};

export default CustomButton;