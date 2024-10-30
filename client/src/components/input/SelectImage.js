import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { handleOpen } from '../../store/slices/popupSlice';
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from '../../constants/file';
import { selectImageFiles } from '../../store/slices/fileSlice';
import CustomButton from '../button/Button';
import { afterClose, handleDialogClose, handleDialogOpen } from '../../store/slices/dialogSlice';
import { feedDetail } from '../../styles/styleDialog';
import axiosInstance from '../../services/authAxios';
import { FEED_URL, PROFILE_URL } from '../../constants/path';
import { handleRender } from '../../store/slices/renderSlice';

const SelectImage = (props) => {
    const token = sessionStorage.getItem('token');
    const style = {
        width: 'fit-content',
        padding: '10px 20px', 
        margin: 'auto',
        hegiht: 'calc( 100% - 35px )',
        };
    const inputFiles = useRef();
    const dispatch = useDispatch('');
    const { fileImages, setFileImages } = props;

    const invalidFile = msg => {
        dispatch(handleOpen(msg));
        inputFiles.current.value = '';
        setFileImages(prev => []);
    }
    
    const handleChangeFile = async (e) => {
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
        await setFileImages([...files]);
        dispatch(handleDialogOpen({style: feedDetail, title:'새 게시물 만들기' }));
    }
    
    const changeProfile = async (e) => {
        const files = e.target.files;
        for(let i = 0 ; i< files.length ; i++){
            if(!files[i].type.match('image/.*')){
                invalidFile('이미지 파일만 업로드 할 수 있습니다.')
                return;
            } else if (files[i].size > MAX_FILE_SIZE){
                invalidFile('이미지 크기는 1MB를 초과할 수 없습니다.');
                return;
            }    
        }
        await setFileImages([...files]);
        // console.log(fileImages);
        // dispatch(handleDialogOpen({style: feedDetail, title:'새 게시물 만들기' }));
    }
    useEffect(() => {
        if(props.type === 'profile' && fileImages[0]){
            postProfile(fileImages[0]);
        }   
        
    },[fileImages])
    
    const selectFile = () => {
        inputFiles.current.click();
    }
    
  const postProfile = async (file) => {
    const formData = new FormData();
    const uid = sessionStorage.getItem('id')
    formData.append('uploaded_files', file, encodeURIComponent(file.name));
    try {
        const res = await axiosInstance.post(PROFILE_URL+uid, formData, {
            headers: {
                token,
                withCredentials: true,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res);
        if(res.data.success){
          dispatch(handleOpen(res.data.message));
          setTimeout(()=>{dispatch(afterClose())}, 200);
          setFileImages([]);
          dispatch(handleDialogClose());
          dispatch(handleRender());
        }
        
    } catch (error) {
        console.error('Error uploading files:', error);
    }
  }
    return (
        <>
            <CustomButton style={style} onclick={selectFile}
                text='이미지 선택'/>
                {
                    props.type === 'profile' ?(
                        <input type="file" 
                            name='uploaded_files'
                            ref={inputFiles}
                            onChange={changeProfile}
                            style={{display:'none'}}
                            accept="image/*" />
                    ):(
                        <input type="file" 
                            name='uploaded_files'
                            ref={inputFiles}
                            onChange={handleChangeFile}
                            multiple
                            style={{display:'none'}}
                            accept="image/*" />
                    )
                }
            
        </>
    );
};

export default SelectImage;