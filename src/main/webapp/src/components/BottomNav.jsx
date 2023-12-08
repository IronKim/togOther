import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './FontAwesome';
import style from '../css/BottomNav.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BottomNav = ({ showNavbar }) => {
  const location = useLocation();

    const [activeNav, setActiveNav] = useState(2);

    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    const isActive = (path) => currentPath === path;

    return (
      <nav className={style.wrapper}>
        <Link to="/community" className={style.nav_link} onClick={() => navigate('/community')}>
          <div>
            <FontAwesomeIcon icon="users" className={location.pathname.includes('/community') ? style.active : style.nav_item} />
          </div>
        </Link>
        <Link to="/" className={style.nav_link} onClick={() => navigate('/')}>
          <div>
            <FontAwesomeIcon icon="home" className={isActive('/') ? style.active : style.nav_item} />
          </div>
        </Link>
        <Link to="/info/cityList" className={style.nav_link} onClick={() => navigate('/info/cityList')}>
          <div>
            <FontAwesomeIcon icon="info" className={location.pathname.includes('/info') ? style.active : style.nav_item} />
          </div>
        </Link>
        <Link to="/package" className={style.nav_link} onClick={() => navigate('/package')}>
          <div>
            <FontAwesomeIcon icon="cart-plus" className={isActive('/package') ? style.active : style.nav_item} />
          </div>
        </Link>
      </nav>
  );
};

export default BottomNav;