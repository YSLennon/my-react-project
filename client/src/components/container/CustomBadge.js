import React from 'react';
import { Badge } from '@mui/material';
import { profilePath } from '../../constants/path';

const CustomBadge = () => {
    const iuBadge = profilePath+'iu_profile.jpg';
    return (
        <Badge badgeContent={52} color="primary" sx={{margin: '15px'}}>
            <img src={iuBadge}/>
        </Badge>
    );
};

export default CustomBadge;