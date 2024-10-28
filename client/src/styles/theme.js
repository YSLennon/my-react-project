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
          padding: '10px 16px',  // 모든 Button에 기본 패딩 설정
        //   color: '#fff7da',
          width: '80%',
          margin: '10px auto',
          borderRadius:'10px',

        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '10px auto',
          border: '1px solid #eee',
          borderRadius: '10px',
          background: '#eee',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginLeft: '10px',
          fontSize: '16px'
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          marginLeft: '10px',
          fontSize: '16px'
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '100%',
          fontSize: '16px'
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display:'flex',
          background:'#bbb',
          fontSize: '18px',
          fontWeight: 'bold',
          opacity: '0.95',
          padding:'5px 15px'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '100%',
          fontSize: '16px'
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '70px',
          height: '70px',
          display: 'inline-block',
        },
      },
    },
  },
});

export default theme;