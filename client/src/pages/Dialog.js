import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { handleDialogClose, afterClose, handleDialogOpen } from '../store/slices/dialogSlice';
import { addImageDialog, feedATag, feedDetail } from '../styles/styleDialog';
import SelectImage from '../components/input/SelectImage';
import FeedDetail from '../components/container/FeedDetail';
import axiosInstance from '../services/authAxios';
import { FEED_URL } from '../constants/path';
import { handleOpen } from '../store/slices/popupSlice';

const emails = ['username@gmail.com', 'user02@gmail.com'];
 
const initialState = {
  fileImages: [],
}
const reducer = (state, action) => {
  switch(action.type){
    case 'file':
      return {fileImages: action.payload}
    default:
      return state;
  }
  
}
 
export default function CustomDialog(props) {
  const [fileImages, setFileImages] = useState([]);
  const textRef=useRef('');
  const id = sessionStorage.getItem('id');
  const token = sessionStorage.getItem('token');
  const { open, title, style } = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  useEffect(() => {
    if (style === feedDetail) {
        // FeedDetail이 렌더링될 때 fileImages를 확인
        setFileImages([...fileImages]);
    }
}, [style]); // style 또는 fileImages가 변경될 때마다 실행

  const handleClose = () => {
    // onClose(selectedValue);
    dispatch(handleDialogClose());
    setTimeout(() => dispatch(afterClose()), 100);
    
  };
  const postFeed = async () => {
    const formData = new FormData();
    formData.append('text', textRef.current);
    fileImages.forEach((file) => {
        formData.append('uploaded_files', file, encodeURIComponent(file.name));
    });
    try {
        const res = await axiosInstance.post(FEED_URL+id, formData, {
            headers: {
                token,
                withCredentials: true,
                'Content-Type': 'multipart/form-data',
            },
        });
        if(res.data.success){
          dispatch(handleOpen(res.data.message));
          setTimeout(()=>{dispatch(afterClose())}, 200);
          textRef.current = '';
          setFileImages([]);
          dispatch(handleDialogClose());
        }
        
    } catch (error) {
        console.error('Error uploading files:', error);
    }
  }

  // // const handleListItemClick = (value) => {
  // //   // onClose(value);
  // };

  return (
    <Dialog
      onClose={handleClose} open={open} PaperProps={{
        sx: style
      }}>
      <DialogTitle>
        <span style={{flex:1, textAlign:'center'}}>{title}</span>
        {style === feedDetail && <a href='#' onClick={postFeed} style={feedATag}>공유하기</a>}
        </DialogTitle>
      {style === addImageDialog && 
      <SelectImage fileImages={fileImages} setFileImages={setFileImages} />}
      {style === feedDetail && 
      <FeedDetail fileImages={fileImages} textRef={textRef}/>}
    </Dialog>
  );
}

// export default function CustomDialog(props) {
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClose = (value) => {
//     // setSelectedValue(value);
//   };

//   return (
//     <div>
//       {/* <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button> */}
//       <SimpleDialog
//         // selectedValue={selectedValue}
//         // open={open}
//         // onClose={handleClose}
//       >
//         </SimpleDialog>
//     </div>
//   );
// }
