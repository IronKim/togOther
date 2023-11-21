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
import TogetherList from './community/together/TogetherList';
import useUserStore from '../stores/userStore';
import { getTokenByRefreshToken, getUserByAccessToken } from '../api/UserApiService';
import BottomNav from './BottomNav';

const Main = ({ showNavbar }) => {
    
    const {user, setUser} = useUserStore();

    const getUserByToken = async() => {

        // 로컬 스토리지에서 토큰 가져오기
        const accessToken = localStorage.getItem("accessToken");

        if(accessToken === null) {
            return;
        }
        
        await getUserByAccessToken(accessToken)
        .then(res => {
            console.log(res);
            
            console.log(res.data);
            setUser(res.data.user);
        })
        .catch(e => {
            console.log(e);
            if(e.response.status === 401) {
                console.log("accessToken토큰 만료");
                localStorage.removeItem("accessToken");
                getToken();
            }
        })
    }

    const getToken = async() => {
            
            // 로컬 스토리지에서 토큰 가져오기
            const refreshToken = localStorage.getItem("refreshToken");
    
            if(refreshToken === null) {
                return;
            }
            
            await getTokenByRefreshToken(refreshToken)
            .then(res => {
                localStorage.setItem('accessToken', res.headers.authorization);
                localStorage.setItem('refreshToken', res.headers['refresh-token']);
                getUserByToken();
            })
            .catch(e => {
                console.log(e);
                if(e.response.status === 401) {
                    console.log("refreshToken토큰 만료");
                    localStorage.removeItem("refreshToken");
                }
            })
        }

    // 렌더링이 시작되면 실행
    const reRenderSite = async() => {
        
        // 로컬 스토리지에 토큰값이 있으면 유저 정보 가져오기
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
                    <Route path='community'>
                        <Route path='togetherWrite' element= { <Together/> } />
                        <Route path='togetherList' element= { <TogetherList/> } />
                    </Route>
                    {showNavbar && <BottomNav showNavbar={showNavbar} />}
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