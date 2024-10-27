import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleOpen } from '../store/slices/popupSlice';
import { FEED_URL, ICON_Path, PROFILE_PATH } from '../constants/path';
import axiosInstance from '../services/authAxios'
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from '../constants/file';
const initialState = {
    imageFiles: [],
    preview: null,
    previewIndex: 0,
}
const reducer = (state, action) => {
    switch(action.type){
        case 'img':
            return {...state, imageFiles: action.value}
        case 'prv':
            return {...state, preview: action.value}
        case 'idx':
            return {...state, previewIndex: action.value}
    }
}
const TestPage = () => {
    const dispatch = useDispatch();

    const inputFiles = useRef();
    const [state, stateDispatch] = useReducer(reducer, initialState);
    const { imageFiles, preview, previewIndex } = state;
    const index = useRef();
    const id = sessionStorage.getItem('id');

    const invalidFile = msg => {
        dispatch(handleOpen(msg));
        inputFiles.current.value = '';
        stateDispatch({type:'img', value:'[]'})
        // setImageFiles([]);
    }
    const selectFile = () => {
        inputFiles.current.click();
    }

    const handleChangeFile = (e) => {
        const files = e.target.files;
        
        
        if(files.length > MAX_FILE_COUNT){
            invalidFile('이미지는 최대 5개까지 업로드가 가능합니다.');
            return;
        }
        for(let i = 0 ; i< files.length ; i++){
            if(!files[i].type.match('image/.*')){
                invalidFile('이미지 파일만 업로드 할 수 있습니다.')
                return;
            } else if (files[i].size > MAX_FILE_SIZE){
                invalidFile('이미지 크기는 1MB를 초과할 수 없습니다.');
                return;
            }    
        }
        stateDispatch({type:'img', value:[...files]});
        //  setImageFiles([...files]);
    }
    const changeImage = (numb) => {
        console.log(numb)
        if(numb === 0) {
            index.current = 0;
            stateDispatch({type:'idx', value:0})
        } else {
            index.current = Math.min(Math.max((previewIndex+numb), 0),imageFiles.length-1);
            stateDispatch({type:'idx', value:index.current})    
        }
        const reader = new FileReader();
        reader.readAsDataURL(imageFiles[index.current]);
        reader.onloadend = () => {
            stateDispatch({type:'prv', value:reader.result})
            // setPreview(reader.result);
        }
    }
    // 파일 선택 시 이미지 변경
    useEffect(() => {
        if(imageFiles.length !== 0){
            changeImage(0);

        }
    },[imageFiles])
    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('hello', '이게머야');
        imageFiles.forEach((file) => {
            formData.append('uploaded_files', file, encodeURIComponent(file.name));
        });
        try {
            const res = await axiosInstance.post(FEED_URL+id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data); // 서버에서의 응답 출력
        } catch (error) {
            console.error('Error uploading files:', error);
        }
        
    }
    return (
        <>
        
            <button type='button' onClick={selectFile}>파일</button>
            <input type="file" 
                name='uploaded_files'
                ref={inputFiles}
                onChange={handleChangeFile}
                multiple
                style={{display:'none'}}
                accept="image/*" />
            <button onClick={uploadFile}>upload</button>

            
        </>
    );
};

export default TestPage;