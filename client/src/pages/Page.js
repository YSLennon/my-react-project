import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './MainPage';
import IntroPage from './IntroPage';
import LoginPage from './LoginPage';


const Page = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/join' element={<IntroPage />} />
                <Route path='/intro' element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default Page;