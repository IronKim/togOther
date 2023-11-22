import React from 'react';
import styles from '../../components/mypage/MyPage.module.css';
import myPhoto from '../../assets/image/myphoto.png';

const MypageSidebar = () => {
    return (
        <div className={styles.sidebarDiv}>
            <div className={ styles.sidebar }>
                <div className={ styles.profile }>
                    <img className={ styles.profileImg } src={ myPhoto } alt='사진' />
                    <div className={ styles.myProfile }><text>내 아이디는 어쩌구</text></div>
                </div> {/* profile */}
                <div style={{clear:'both'}}></div>
                <div className={ styles.buttons }>
                    <button>계정관리</button>{/* 계정관리 */}
                    <button>일정관리</button>{/* 일정관리 */}
                    <button>예약 내역</button> {/* 예약내역 */}
                    <button>내 동행 글</button> {/* 동행글 */}
                    <button>여행 후기</button>{/* 후기글 */}
                    <button>어쩌구후기</button>{/* 후기글 */}
                </div>
            </div> {/* sidebar */}
        </div>
    );
};

export default MypageSidebar;