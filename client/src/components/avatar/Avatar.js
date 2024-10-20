import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export default function MyAvatar(props) {
  return (
      <Avatar alt={props.alt} src={`/assets/profile/${props.src}`} />
  );
}
