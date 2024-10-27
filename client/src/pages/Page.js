import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './MainPage';
import JoinPage from './JoinPage';
import LoginPage from './LoginPage';
import TestPage from './TestPage';


const Page = () => {
    

    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<LoginPage />} />
                <Route path='/intro' element={<LoginPage />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/join' element={<JoinPage />} />
                <Route path='/test' element={<TestPage />} />
            </Routes>
        </Router>
    );
};

export default Page;