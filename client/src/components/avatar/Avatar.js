import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { PROFILE_PATH } from '../../constants/path';

export default function MyAvatar(props) {
  const iuAvater = PROFILE_PATH+props.src
  return (
      <Avatar alt={props.alt} src={iuAvater} />
  );
}
