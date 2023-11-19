import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import useUserStore from '../stores/userStore';

import axios from "axios";

const Main = () => {
    
    const {user, setUser} = useUserStore();


    const getUserByToken = async() => {

        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("token");
        
        try {
            // 서버에 토큰을 보내서 사용자 데이터 가져오기
            const response = await axios.get("/api/user/getUserByToken", {
            headers: { Authorization: `${token}` },
            });
            console.log(response.data.user);
            setUser(response.data.user);
            
        } catch (error) {
            console.error("Error fetching user data:", error);
            
            }
    }

    const reRenderSite = async() => {
        await getUserByToken();
    }


    useEffect(() => {

        reRenderSite();
        

    }, []);
    
    
    const AdvisorRoute = ({children}) => {

        console.log(user.name);
    
        if(user === null) {
            return <Navigate to="/" />
        }
    
        if(user.authority === 'ROLE_ADMIN') {
            return children;
        }
    
        return <Navigate to="/" />
    }

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
                    <Route path='planner' element= { <Planner />} />
                    <Route path='place' element= { <Together/> } />
                </Routes>

                <FooterComponent />

                    <Routes>
                        <Route path='/advisor' element= { 

                            <AdvisorRoute>
                                <Advisor />
                            </AdvisorRoute>
                            } />
                        
                    </Routes>

            </BrowserRouter>
        </div>
    );
};

export default Main;