import { createTheme } from '@mui/material';
import React from 'react';

const theme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light')
    ?{
        primary: {
          main: '#868fa8',  // primary 색상
        },
        secondary: {
          main: '#d32f2f',  // secondary 색상
        },
    }:{ // dark모드 색상 지정
        primary: {
          main: '#222',  // primary 색상
        },
        secondary: {
          main: '#d32f2f',  // secondary 색상
        },
    }    
  },
  typography: {
    fontSize: 14,  // 기본 폰트 크기 설정
    button: {
      fontWeight: 'bold',  // 버튼에 대한 기본 스타일
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '4px 16px',  // 모든 Button에 기본 패딩 설정
        //   color: '#fff7da',
          width: '90%'

        },
      },
    },
  },
});

export default theme;