import React from 'react';
import { Snackbar} from '@mui/material'
import { useSelector, useDispatch} from 'react-redux';
import { handleClose } from '../../store/slices/popupSlice'



const CustomPopup = () => {
    const { vertical, horizontal, open, message } = useSelector((state) => state.popup);
    const dispatch = useDispatch();

    // const [state, setState] = useState({
    // open: open,
    // vertical: 'top',
    // horizontal: 'center',
    // message: props.message
    // });
    const fnHandleClose = () => {
        dispatch(handleClose());
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={fnHandleClose}
            message={message}
            key={vertical + horizontal}
        />
    );
};

export default CustomPopup;