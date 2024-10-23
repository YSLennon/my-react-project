import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { profilePath } from '../../constants/path';

export default function MyAvatar(props) {
  const iuAvater = profilePath+props.src
  return (
      <Avatar alt={props.alt} src={iuAvater} />
  );
}
