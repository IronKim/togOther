import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Home from '../pages/Home';
import Advisor from '../pages/Advisor';

import CityMain from '../pages/CityMain';
import PlacePage from '../pages/PlacePage';
import City from '../pages/City';
import Login from '../pages/Login';
import Write from '../pages/Write';
import Planner from '../pages/Planner';

import Together from '../pages/Together';
import Community from '../pages/Community';


const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>

                    <Route path='/' element= { <Home />} />
                    <Route path='user'>
                        <Route path='login' element ={ <Login />} />
                        <Route path='write' element ={ <Write />}/>
                    </Route>
                    <Route path='info'>
                        <Route path='place/:placeSeq' element={ <PlacePage />} />
                        <Route path='cityList' element={ <CityMain />} />
                        <Route path='city/:citySeq' element={ <City />}/>
                    </Route>
                    <Route path='community'>
                        <Route path='' element={ <Community/>}/>
                        <Route path='planner' element= { <Planner />} />
                        <Route path='place' element= { <Together/> } />
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