import { Tooltip } from '@mui/material';
import React from 'react';

const ToolTip = (props) => {
    return (
        <Tooltip title={props.title}>
            {props.children}
        </Tooltip>
    );
};

export default ToolTip;