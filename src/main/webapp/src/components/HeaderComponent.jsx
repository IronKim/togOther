import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/image/Logo.png';

import  styles  from"../css/Header.module.css";
import { useUserStore } from '../stores/mainStore';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};

const HeaderComponent = () => {

    const {user} = useUserStore();

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        //로직 추가
        window.location.reload();
    }

    return (
        <div>
            <header className={ styles.header }>
                <div className={ styles.logo }>
                    <Link to='/' style={ linkStyle }>
                        <img src={ logo } alt='로고' />
                    </Link>
                </div>
                <nav className={ styles.nav }>
                    <ul>
                        <li><NavLink to='/' style={ linkStyle } className={ styles.activeL }>홈</NavLink></li>
                        <li><NavLink to='/info/cityList' style={ linkStyle } activeClassName={ styles.activeLink } className={ styles.activeL }>여행정보</NavLink></li>
                        <li><NavLink to='/travel' style={ linkStyle } className={ styles.activeL }>커뮤니티</NavLink></li>
                    </ul>
                </nav>
                <div className={ styles['login_section'] }>
                    {
                        user.name === '' ? (
                            <>
                                <Link to='/user/login' style={ linkStyle }>로그인</Link> 
                                <span className={ styles.slash }>/</span> 
                                <Link to='/user/write' style={ linkStyle }>회원가입 </Link>
                            </>
                        ) : (
                            <>
                                <span className={styles.activeLinkU} >{ user.name }님</span>
                                <span className={ styles.slash }>/</span> 
                                <span className={styles.activeLinkU} onClick={logoutUser} >로그아웃</span> 
                            </>
                        )
                    }                  
                </div>
            </header>
        </div>
    );
};

export default HeaderComponent;