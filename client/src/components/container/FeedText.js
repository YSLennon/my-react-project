import React, { useEffect, useRef, useState } from 'react';
import FlexContainer from '../layout/FlexContainer';
import { feedText } from '../../styles/styleDialog';

const FeedText = (props) => {
    const textRef = props.textRef;
    useEffect(() => {
        textRef.current = '';
    },[])
    
    const [txt, setTxt] = useState('');
    return (
        <FlexContainer style={feedText}>
            
    <div style={{
        fontWeight: 'bold',
        marginBottom: '10px' // 프로필 영역과 글 작성 영역 사이 여백
    }}>
        프로필 영역
    </div>
    <textarea 
        ref={props.textRef}
        onChange={(e) => {
            textRef.current = e.target.value
            console.log(textRef.current)
            setTxt(e.target.value);
        }}
        value={textRef.current?textRef.current:''}
        style={{
        flex: '1',
        fontSize:'16px',
        // width: '100%', // 너비를 100%로 설정
        // height: '100%', // 높이를 적절히 설정
        border: 'none', // 테두리 설정
        // borderRadius: '4px', // 모서리 둥글게
        padding: '12px', // 안쪽 여백
        // resize: 'none', // 크기 조절 비활성화
        outline: 'none' // 포커스 시 테두리 강조 비활성화
    }}></textarea>
        </FlexContainer>
    );
};

export default FeedText;