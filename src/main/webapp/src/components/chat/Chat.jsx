import React, { useState } from 'react';
import styles from '../../css/chat.module.css'
import xBut from '../../assets/image/xBut.png';
import ChatList from './ChatList';
import ChatNotice from './ChatNotice';
import ChatRoom from './ChatRoom';

const Chat = (props) => {
    const {onClose,close} = props

    const [num,setNum] = useState(0)
    return (
        <>
        <div className={`${styles.chatForm} ${!close && styles.openChat} ${close && styles.closeChat}`}>
            <section className={styles.topSection}>
                <img src={xBut} className={styles.xBut} onClick={onClose}/>
            </section>
            <section className={styles.middleSection}>
                {
                    num === 0 && <ChatList/>
                }
                {
                    num === 1 && <ChatRoom/>
                }
                {
                    num === 2 && <ChatNotice/>
                }
            </section>
            <section className={styles.bottomSection}>
                <button onClick={() => setNum(0)}>리스트</button>
                <button onClick={() => setNum(1)}>채팅방</button>
                <button onClick={() => setNum(2)}>알림</button>
            </section>
        </div>
        </>
    );
};

export default Chat;