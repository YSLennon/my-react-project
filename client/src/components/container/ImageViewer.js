import React, { useEffect, useReducer, useRef } from 'react';
import { ICON_Path, PROFILE_PATH } from '../../constants/path';
const initialState = {
    preview: null,
    previewIndex: 0,
}
const reducer = (state, action) => {
    switch(action.type){
        case 'prv':
            return {...state, preview: action.value}
        case 'idx':
            return {...state, previewIndex: action.value}
    }
}
const ImageViewer = (props) => {
    const style = props.style?props.style:{
        width: '500px',
        height: '500px',
        position: 'relative',
        background: '#eee',
        overflow: 'hidden',
        cursor: 'pointer'
    }
    const index = useRef(0);
    const [state, stateDispatch] = useReducer(reducer, initialState);
    const fileImages = props.fileImages;
    const { preview, previewIndex } = state;

    const changeImage = (numb) => {
        if(numb === 0) {
            index.current = 0;
            stateDispatch({type:'idx', value:0})
        } else {
            index.current = Math.min(Math.max((previewIndex+numb), 0),fileImages.length-1);
            stateDispatch({type:'idx', value:index.current})    
        }
        if(props.type !== 'feed'){
            const reader = new FileReader();
            reader.readAsDataURL(fileImages[index.current]);
            reader.onloadend = () => {
                stateDispatch({type:'prv', value:reader.result})
            }
        } else {
            stateDispatch({type:'prv', value:fileImages[index.current][2]});
        }
    }
    useEffect(() => {
        if (fileImages && fileImages.length > 0) {
            changeImage(0);
        }
    }, [fileImages])

    return (
        <div style={style}>
            <img 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    transform: 'translate(-50%, -50%)',
                }}
                src={ preview ? preview : `${PROFILE_PATH}iu_profile.jpg`}
                alt='이미지'
            />
            <img 
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '0',
                    transform: 'translateY(-50%)'
                }}
                src={`${ICON_Path}icon_right.png`}
                onClick={()=>changeImage(1)}
                alt='오른쪽 버튼'
            />
            <img 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    transform: 'translateY(-50%)'
                }}
                onClick={()=>changeImage(-1)}
                src={`${ICON_Path}icon_left.png`}
                alt='왼쪽 버튼'
            />
        </div>
    );
};

export default ImageViewer;