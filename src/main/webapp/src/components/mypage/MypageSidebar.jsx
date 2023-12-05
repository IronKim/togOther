import React from 'react';
import myPhoto from '../../assets/image/myphoto.png';
import styles from '../../css/MyPage.module.css';
import { useUserStore } from '../../stores/mainStore';

import setting from '../../assets/image/setting.png'
import planner from '../../assets/image/planner.png'
import people from '../../assets/image/people.png'
import reservation from '../../assets/image/reservation.png'
import after from '../../assets/image/after.png'
import chat from '../../assets/image/chat.png'

const MypageSidebar = ({onErrorImg,onState,state}) => {

    const { user } = useUserStore();

    return (
        <div className={styles.sidebarDiv}>
            <div className={ styles.sidebar }>
                <div className={ styles.profile }>
                    <img className={ styles.profileImg } onError={onErrorImg} 
                    src={ user.profileImage === null ? '' : user.profileImage.toString()} alt='사진' />
                    <div className={ styles.myProfile }>{user.id}</div>
                </div> {/* profile */}
                <div style={{clear:'both'}}></div>
                <div className={ styles.buttons }>
                    <button onClick={() => onState(0)} style={{backgroundColor: state === 0 ? 'whitesmoke' : 'white',
                        borderRadius:  state === 0 ? '10px' : 0}}
                        ><img src={setting}/>&nbsp;&nbsp;계정설정</button>{/* 계정관리 */}
                    <button onClick={() => onState(1)}style={{backgroundColor: state === 1 ? 'whitesmoke' : 'white',
                        borderRadius:  state === 1 ? '10px' : 0}}
                        ><img src={chat}/>&nbsp;&nbsp;채팅관리</button>{/* 채팅 */}
                    <button onClick={() => onState(2)}style={{backgroundColor: state === 2 ? 'whitesmoke' : 'white',
                        borderRadius:  state === 2 ? '10px' : 0}}
                        ><img src={planner}/>&nbsp;&nbsp;내 일정</button>{/* 일정관리 */}
                    <button onClick={() => onState(3)}style={{backgroundColor: state === 3 ? 'whitesmoke' : 'white',
                        borderRadius:  state === 3 ? '10px' : 0}}
                        ><img src={people}/>&nbsp;&nbsp;내 동행</button> {/* 동행글 */}
                    <button onClick={() => onState(4)}style={{backgroundColor: state === 4 ? 'whitesmoke' : 'white',
                        borderRadius:  state === 4 ? '10px' : 0}}
                        ><img src={reservation}/>&nbsp;&nbsp;예약 내역</button> {/* 예약내역 */}
                    <button onClick={() => onState(5)}style={{backgroundColor: state === 5 ? 'whitesmoke' : 'white',
                        borderRadius:  state === 5 ? '10px' : 0}}
                        ><img src={after}/>&nbsp;&nbsp;여행 후기</button>{/* 후기글 */}
                </div>
            </div> {/* sidebar */}
        </div>
    );
};

export default MypageSidebar;