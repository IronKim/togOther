import React, { useState } from 'react';
import styles from '../../css/chat.module.css'
import xBut from '../../assets/image/xBut.png';
import list from '../../assets/image/chat_list.png';
import notice from '../../assets/image/chat_notice.png';
import room from '../../assets/image/chat_room.png';

import ChatList from './ChatList';
import ChatNotice from './ChatNotice';
import ChatRoom from './ChatRoom';

const Chat = (props) => {
    const {onClose,close} = props

    const [num,setNum] = useState(0)

    const [roomNum,setRoomNum] = useState(-1)

    const onRoomNum = (n) => {
        setRoomNum(n)
    }
    const onSetNum = (n) => {
        setNum(n)
    } 
    return (
        <>
        <div className={`${styles.chatForm} ${!close && styles.openChat} ${close && styles.closeChat}`}>
            <section className={styles.topSection}>
                <img src={xBut} className={styles.xBut} onClick={onClose}/>
            </section>
            <section className={styles.middleSection}>
                {
                    num === 0 && <ChatList onRoomNum={onRoomNum} onSetNum={onSetNum}/>
                }
                {
                    num === 1 && <ChatRoom roomNum={roomNum}/>
                }
                {
                    num === 2 && <ChatNotice/>
                }
            </section>
            <section className={styles.bottomSection}>
                <div onClick={() => setNum(0)} style={{backgroundColor:num === 0 && 'whitesmoke'}}><img src={list}/></div>
                <div onClick={() => setNum(1)} style={{backgroundColor:num === 1 && 'whitesmoke'}}><img src={room}/></div>
                <div onClick={() => setNum(2)} style={{backgroundColor:num === 2 && 'whitesmoke'}}><img src={notice}/></div>
            </section>
        </div>
        </>
    );
};

export default Chat;