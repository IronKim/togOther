import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Home from '../pages/Home';
import Advisor from '../pages/Advisor';
import CityPage from '../pages/CityMain';
import PlacePage from '../pages/PlacePage';


const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path='/' element= { <Home />} />
                        <Route path='/advisor' element= { <Advisor />} />
                        <Route path='info'>
                            <Route path='place/:placeSeq' element={ <PlacePage />} />
                            <Route path='city' element={ <CityPage />} />
                        </Route>
                    </Routes>
                <FooterComponent />
                    <Routes>
                        <Route path='/advisor' element= { <Advisor />} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Main;