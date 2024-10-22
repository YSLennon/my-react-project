import logo from './logo.svg';
import './App.css';
import CustomButton from './components/button/Button.js'
import theme from './styles/theme.js'
import { ThemeProvider } from '@emotion/react';
import SearchBox from './components/input/SearchBox.js';
import Avatar from './components/avatar/Avatar.js';
import MyAvatar from './components/avatar/Avatar.js';
import { Divider, Input, TextField } from '@mui/material';
import ChessImageList from './components/container/ImageList.js';
import SideMenu from './components/container/LeftMenu.js';
import CustomDialog from './components/container/Dialog.js';
import InputJs from './components/input/input.js';
import StudyRedux from './StudyRedux.js';
import { Provider } from 'react-redux';
import { store } from './hooks/storeTest.js';


const ariaLabel = { 'aria-label': 'description' };

function App() { 
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme('light')}>
        <StudyRedux/>
        {/* <div className="App">
        <CustomDialog />
        <CustomButton text="Button" onclick={()=>{alert('hi')}}/>
            <SearchBox ></SearchBox>
            <Divider />
            <InputJs/>

            <MyAvatar alt="a" src="iu_profile.jpg" />
            <ChessImageList/>
            <SideMenu />
        </div> */}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
