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
                        <h1 className={ styles.div_h1 }>
                            한강가서 재밌게 놀까?
                            <h2>2023.11.12</h2>
                        </h1>
                        <p className={ styles.div_p }>25000원 4개 
                        <h2>총 100000원</h2></p>
                </div>
        </div>
    );
};

export default MypageReservation;