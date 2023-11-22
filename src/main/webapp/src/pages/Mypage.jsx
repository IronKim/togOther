import React from 'react';
import styles from '../css/MyPage.module.css';
import MypageMain from '../components/mypage/MypageMain';
import MypageSidebar from '../components/mypage/MypageSidebar';

const Mypage = () => {
    return (
        <div className={styles.main}>
            <MypageSidebar />
            <MypageMain />
            <div style={{clear:'both'}}></div>
        </div>
    );
};

export default Mypage;