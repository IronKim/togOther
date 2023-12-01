import React from 'react';
import MbtiMain from '../mbti/MbtiMain';
import styles from '../../css/MyPage.module.css';

const MyMbti = (props) => {
    const{inputUserData,mbtiClose,updateMbti,theEndMbti } = props

    return (
        <div>
            <div className={styles.bg} onClick={() => mbtiClose()}></div>
            <div className={styles.onModal}>
                <MbtiMain inputUserData={inputUserData} updateMbti={updateMbti} theEndMbti={theEndMbti}/>
            </div>
        </div>
    );
};

export default MyMbti;