import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

import logo from '../assets/image/Logo.png';

import  styles  from"../css/Header.module.css";

import { useUserStore } from '../stores/mainStore';

import BottomNav from './BottomNav';
import { logoutUser } from '../api/UserApiService';


const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};

const HeaderComponent = () => {

    const navigate = useNavigate();

    const {user, clearUser} = useUserStore();

    const logout= () => {

      const refreshToken = localStorage.getItem("refreshToken");

      if(refreshToken !== null) {
        logoutUser(refreshToken).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        })
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      Swal.fire({
        icon: "success",
        title: "로그아웃 되었습니다.",
        showConfirmButton: false,
        timer: 1000
      })
      clearUser();

      // navigate로 현재 페이지 리다이렉트
      navigate('/');
    }

    const [prevScrollY, setPrevScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
  
        // 이전 스크롤 위치와 현재 스크롤 위치 비교
        if (scrollY > prevScrollY) {
          setShowNavbar(false)
        } else {
          setShowNavbar(true)
        }
  
        setPrevScrollY(scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [prevScrollY, showNavbar]);

    const location = useLocation();
    const { cityseq } = useParams();

    const [selectedCity, setSelectedCity] = useState('')

    return (
        <div>
            {showNavbar && <BottomNav showNavbar={showNavbar} />}
            <header className={ styles.header }>
                <div className={ styles.logo }>
                    <Link to='/' style={ linkStyle }>
                        <img src={ logo } alt='로고' />
                    </Link>
                </div>
                <nav className={styles.nav}>
                  <ul>
                    <li className={ styles.navli }>
                      <NavLink
                        to='/'
                        style={location.pathname === '/' ? { color: '#2E8DFF' } : {}}
                        activeClassName={styles.activeLink}
                        className={styles.activeL}
                      >
                        홈
                      </NavLink>
                    </li>
                    <li className={ styles.navli }>
                      <NavLink
                        to='/info/cityList'
                        style={location.pathname.includes('/info') ? { color: '#2E8DFF' } : {}}
                        activeClassName={styles.activeLink}
                        className={styles.activeL}
                      >
                        여행정보
                      </NavLink>
                    </li>

                    <li className={ styles.navli }>
                      <NavLink
                        to='/community'
                        style={location.pathname.includes('/community') ? { color: '#2E8DFF' } : {}}
                        activeClassName={styles.activeLink}
                        className={styles.activeL}
                      >
                        커뮤니티
                      </NavLink>
                    </li>

                    <li className={ styles.navli }>
                      <NavLink
                        to='/package'
                        style={location.pathname.includes('/package') ? { color: '#2E8DFF' } : {}}
                        activeClassName={styles.activeLink}
                        className={styles.activeL}
                      >
                        여행 패키지
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <div className={ styles['login_section'] }>
                  {
                    user.name === '' ? (
                      <>
                        <NavLink to='/user/login' style={location.pathname === '/user/login' ? { color: '#2E8DFF' } : {}} className={styles.activeL}>
                          로그인
                        </NavLink>
                        <span className={ styles.slash }>/</span> 
                        <NavLink to='/user/write' style={location.pathname === '/user/write' ? { color: '#2E8DFF' } : {}} className={styles.activeL}>
                        회원가입
                      </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to={user.authority === 'ROLE_ADMIN' ? '/advisor' : '/user/mypage'} style={location.pathname === '/user/mypage' ? { color: '#2E8DFF' } : {}} className={styles.activeL}>
                          { user.name }님
                        </NavLink>
                        <span className={ styles.slash }>/</span> 
                        <span className={styles.activeLinkU} onClick={logout} >로그아웃</span> 
                      </>
                    )
                  }
                </div>
            </header>
        </div>
    );
};

export default HeaderComponent;  