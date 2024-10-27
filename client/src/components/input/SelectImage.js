import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { handleOpen } from '../../store/slices/popupSlice';
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from '../../constants/file';
import { selectImageFiles } from '../../store/slices/fileSlice';
import CustomButton from '../button/Button';
import { handleDialogOpen } from '../../store/slices/dialogSlice';
import { feedDetail } from '../../styles/styleDialog';

const SelectImage = (props) => {
    const style = {
        width: 'fit-content',
        padding: '10px 20px', 
        margin: 'auto'
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
        console.log(fileImages);
        dispatch(handleDialogOpen({style: feedDetail, title:'새 게시물 만들기' }));
    }
    const selectFile = () => {
        inputFiles.current.click();
    }
    return (
        <>
            <CustomButton style={style} onclick={selectFile}
                text='이미지 선택'/>
            <input type="file" 
                name='uploaded_files'
                ref={inputFiles}
                onChange={handleChangeFile}
                multiple
                style={{display:'none'}}
                accept="image/*" />
            
        </>
    );
};

export default SelectImage;