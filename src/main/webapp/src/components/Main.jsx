import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Home from '../pages/Home';
import Advisor from '../pages/Advisor';
import Login from '../pages/Login';
import MainWrite from '../pages/MainWrite';

const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                        <Route path='/' element= { <Home />} />
                        <Route path='/user'>
                            <Route path='login' element ={ <Login />} />
                            {/* <Route path='write' element ={ <Write />} />
                            <Route path='detailWrite' element= { <DetailWrite />} />
                            <Route path='detail2Write' element= { <Detail2Write />} />
                            <Route path='mbti' element= { <MbtiMain/>} />
                             */}
                            <Route path='write' element ={ <MainWrite />}/>
                            <Route path='advisor' element= { <Advisor />} />
                        </Route>
                        
                    </Routes>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
};

export default Main;