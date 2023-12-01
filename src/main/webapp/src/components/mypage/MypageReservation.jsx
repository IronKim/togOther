import React from 'react';
import styles from '../../css/MyPage.module.css';

const MypageReservation = () => {
    return (
        <div className={ styles.my_reservation_main }>
            <p className={ styles.reservation_title }>예약 내역</p>
            <hr className={styles.hr_1} />
                <div className={ styles.reservation_1 }>
                    <div className={ styles.reservation_img_div }>
                        <img style={{ width: '120px', height : '70px;' }} src='' />
                    </div>   

                    <div className={ styles.p_div}>
                        <p>어쩌구 저쩌구 패키지 웅앵웅</p>
                        <p>| 대충 얼마얼마 원</p>
                        <p>| 패키지 갯수</p>
                        <p>| 출발 일자</p>
                    </div>
                </div>
        </div>
    );
};

export default MypageReservation;