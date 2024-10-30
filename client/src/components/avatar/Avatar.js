import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { PROFILE_PATH } from '../../constants/path';

export default function MyAvatar(props) {
  const iuAvater = PROFILE_PATH+"iu_profile.jpg"
  return (
      <Avatar alt={props.alt} src={props.src? props.src : PROFILE_PATH+"iu_profile.jpg"} sx={{width: '70px', height: '70px'}} />
  );
}
