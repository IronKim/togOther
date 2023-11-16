import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Home from '../pages/Home';
import Advisor from '../pages/Advisor';
import Together from '../pages/Together';

const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path='/' element= { <Home />} />
                        <Route path='/advisor' element= { <Advisor />} />
                        <Route path='/place' element= { <Together/> } />
                    </Routes>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
};

export default Main;