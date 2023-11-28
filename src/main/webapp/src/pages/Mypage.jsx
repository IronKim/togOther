import React, { useState } from 'react';
import styles from '../css/MyPage.module.css';
import MypageSidebar from '../components/mypage/MypageSidebar';

import defaultImg from '../assets/image/profile_thumb.png';
import MypageWrite from '../components/mypage/MypageWrite';
import MypagePlanner from '../components/mypage/MypagePlanner';

const Mypage = () => {

    const [state,setState] = useState(0);//0 계정관리 1 플래너 2 동행 3 예약관리 4 후기관리..

    const onState = (st) => {
        setState(st)
    }

    const onErrorImg = (e) => {
        e.target.src = defaultImg;
    }

    return (
        <div className={styles.main}>
            <MypageSidebar onErrorImg={onErrorImg} onState={onState} state={state}/>
            {
                state === 0 && <MypageWrite onErrorImg={onErrorImg} />
            }
            {
                state === 2 && <MypagePlanner onErrorImg={onErrorImg} />
            }
            <div style={{clear:'both'}}></div>
        </div>
    );
};

export default Mypage;