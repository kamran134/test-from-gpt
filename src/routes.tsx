import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import UserProfile from './components/pages/UserProfile/UserProfile';

const Router: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='user/:id' element={<UserProfile />} />
        </Routes>
    );
}

export default Router;