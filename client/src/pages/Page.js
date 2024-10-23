import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './MainPage';
import IntroPage from './IntroPage';


const Page = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/intro' element={<IntroPage />} />
            </Routes>
        </Router>
    );
};

export default Page;