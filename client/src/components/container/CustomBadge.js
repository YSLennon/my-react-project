import React from 'react';
import { Badge } from '@mui/material';
import { PROFILE_PATH } from '../../constants/path';

const CustomBadge = () => {
    const iuBadge = PROFILE_PATH+'iu_profile.jpg';
    return (
        <Badge badgeContent={52} color="primary" sx={{margin: '15px'}}>
            <img src={iuBadge}/>
        </Badge>
    );
};

export default CustomBadge;