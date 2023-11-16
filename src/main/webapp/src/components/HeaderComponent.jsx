import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/image/Logo.png';

import  styles  from"../css/Header.module.css";

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};

const HeaderComponent = () => {
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
                        <li><NavLink to='/information' style={ linkStyle } activeClassName={ styles.activeLink } className={ styles.activeL }>여행정보</NavLink></li>
                        <li><NavLink to='/travel' style={ linkStyle } className={ styles.activeL }>커뮤니티</NavLink></li>
                    </ul>
                </nav>
                <div className={ styles['login_section'] }>
                    <Link to='/login' style={ linkStyle }>로그인 </Link> &nbsp;
                    <Link to='/join' style={ linkStyle }> / 회원가입</Link>
                </div>
            </header>
        </div>
    );
};

export default HeaderComponent;