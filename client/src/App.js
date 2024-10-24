import './App.css';
import theme from './styles/theme.js'
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import Page from './pages/Page.js';
import { store } from './store/store.js';


const ariaLabel = { 'aria-label': 'description' };

function App() { 
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme('light')}>
        <Page />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
