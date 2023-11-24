import React from 'react';
import styles from '../css/MyPage.module.css';
import MypageMain from '../components/mypage/MypageMain';
import MypageSidebar from '../components/mypage/MypageSidebar';

import defaultImg from '../assets/image/profile_thumb.png';

const Mypage = () => {

    const onErrorImg = (e) => {
        e.target.src = defaultImg;
    }

    return (
        <div className={styles.main}>
            <MypageSidebar />
            <MypageMain />
            <div style={{clear:'both'}}></div>
        </div>
    );
};

export default Mypage;