import React, { useEffect, useState } from 'react';
import styles from '../../css/chat.module.css'
import xBut from '../../assets/image/xBut.png';
import list from '../../assets/image/chat_list.png';
import notice from '../../assets/image/chat_notice.png';
import room from '../../assets/image/chat_room.png';

import ChatList from './ChatList';
import ChatNotice from './ChatNotice';
import ChatRoom from './ChatRoom';
import { useUserStore } from '../../stores/mainStore';
import useMessageStore from '../../hooks/useMessageStore';

import { getAllTogether,getUser } from '../../api/AdvisorApiService';
import { getAllSubscript } from '../../api/TogetherApiService';

const Chat = (props) => {
    const {onClose,close} = props

    const messageStore = useMessageStore();
    const {user} = useUserStore();

    const [num,setNum] = useState(0)

    const [roomNum,setRoomNum] = useState(-1)
    const [togoNum,setTogoNum] = useState(-1)
    const [tab,setTab] = useState(0)

    const [users,setUsers] = useState([])
    const [togos,setTogos] = useState([])

    const [al,setAl] = useState(0);

    useEffect(()=>{
        getAllTogether()
        .then(res => setTogos(res.data))

        getUser()
        .then(res => setUsers(res.data))

    },[])

    const onTogoNum = (n) => {
        setTogoNum(n)
    }

    const onRoomNum = (n) => {
        setRoomNum(n)
        const handleClickEnterRoom = async (n) => {
            // 연결 시도
            await messageStore.connect(n, user.id);
        
            // STOMP를 활성화하고 채팅방에 대한 구독을 설정
            messageStore.subscribeMessageBroker(n);
        };
        handleClickEnterRoom(n)
    }
    const onSetNum = (n) => {
        setNum(n)
    } 
    const onDisSetNum = (n) => {
        messageStore.disconnect(roomNum);
        setNum(n)
    }
    const onConSetNum = (n) => {
        setNum(n)
        const handleClickEnterRoom = async () => {
            // 연결 시도
            await messageStore.connect(roomNum, user.id);
        
            // STOMP를 활성화하고 채팅방에 대한 구독을 설정
            messageStore.subscribeMessageBroker(roomNum);
        };
        handleClickEnterRoom()
    }
    useEffect(()=>{
        getAllSubscript()
        .then(res => setAl(res.data.filter(item => item.masterSeq === user.userSeq).length))
    },[num])

    const onAl = () => {
        setAl(al - 1)
    }

    return (
        <>
        <div className={`${styles.chatForm} ${!close && styles.openChat} ${close && styles.closeChat}`}>
            <section className={styles.topSection}>
                <div>
                    {num === 0 && <span className={styles.topButton}>
                        <button onClick={()=>setTab(0)} style={{color: tab !== 0 && 'darkgray'}}>전체</button>    
                        <button onClick={()=>setTab(1)} style={{color: tab !== 1 && 'darkgray'}}>총괄자</button>    
                        <button onClick={()=>setTab(2)} style={{color: tab !== 2 && 'darkgray'}}>참가자</button>    
                    </span>}
                    {num === 1 && togos.find(item => item.togetherSeq === togoNum).title}
                </div>
                <img src={xBut} className={styles.xBut} onClick={onClose}/>
            </section>
            <section className={styles.middleSection} id='middleSection'>
                {
                    num === 0 && <ChatList onRoomNum={onRoomNum} onSetNum={onSetNum} user={user} 
                    users={users} togos={togos} onTogoNum={onTogoNum} tab={tab}/>
                }
                {
                    num === 1 && <ChatRoom roomNum={roomNum} user={user} users={users} />
                }
                {
                    num === 2 && <ChatNotice user={user} users={users} onAl={onAl}/>
                }
            </section>
            <section className={styles.bottomSection}>
                <div onClick={() => onDisSetNum(0)} style={{backgroundColor:num === 0 && 'whitesmoke'}}><img src={list}/></div>
                <div onClick={() => roomNum !== -1 && onConSetNum(1)} 
                    style={{backgroundColor:num === 1 && 'whitesmoke',opacity: roomNum === -1 && 0.3}}>
                    <img src={room}/></div>
                <div onClick={() => onDisSetNum(2)} style={{backgroundColor:num === 2 && 'whitesmoke'}}><img src={notice}/>
                    {al > 0 && <h3 className={styles.notNum}>{al}</h3>}
                </div>
            </section>
        </div>
        </>
    );
};

export default Chat;