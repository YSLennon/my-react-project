import './App.css';
import theme from './styles/theme.js'
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import Page from './pages/Page.js';
import { store } from './store/store.js';
import CustomPopup from './components/popup/CustomPopup.js';
import CustomDialog from './pages/Dialog.js';
import { CssBaseline } from '@mui/material';


const ariaLabel = { 'aria-label': 'description' };

function App() { 
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme('light')}>
      <CssBaseline />
        <Page />

        
        <CustomPopup />
        <CustomDialog />

      </ThemeProvider>
    </Provider>
  );
}

export default App;
