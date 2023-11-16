import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './FontAwesome';
import style from '../css/BottomNav.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BottomNav = ({ showNavbar }) => {
    const [activeNav, setActiveNav] = useState(2);

    return (
      <nav className={`${style.wrapper} ${showNavbar ? style.show : style.hide}`}>
            <Link to="/community" className={style.nav_link} onClick={() => setActiveNav(1)}>
              <div>
                <FontAwesomeIcon icon="users" className={activeNav === 1 ? style.active : style.nav_item} />
              </div>
            </Link>

            <Link to="/" className={style.nav_link} onClick={() => setActiveNav(2)}>
              <div>
                <FontAwesomeIcon icon="home" className={activeNav === 2 ? style.active : style.nav_item} />
              </div>
            </Link>

            <Link to="/travel" className={style.nav_link} onClick={() => setActiveNav(3)}>
              <div>
                <FontAwesomeIcon icon="info" className={activeNav === 3 ? style.active : style.nav_item} />
              </div>
            </Link>
      </nav>
    );
};

export default BottomNav;