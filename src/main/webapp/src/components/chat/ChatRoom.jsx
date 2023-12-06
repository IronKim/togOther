import React, { useEffect, useRef, useState } from 'react';
import MessageList from '../chatting/MessageList';
import Room from '../chatting/Room';
import useMessageStore from '../../hooks/useMessageStore';

const ChatRoom = (props) => {

    const messageStore = useMessageStore();

    const [currentRoomIdx, setCurrentRoomIdx] = useState();
    const currentRoomIdxRef = useRef(currentRoomIdx)

    useEffect(()=>{currentRoomIdxRef.current = currentRoomIdx},[currentRoomIdx])

    // const handleClickEnterRoom = async ({ newRoomIndex }) => {
    //     if (connected) {
    //       console.warn('이미 연결되어있음');
    //       messageStore.disconnect(currentRoomIndex);
    //   }
      
    //     // 연결 시도
    //     await messageStore.connect(newRoomIndex, user.id);
    //     setRoomIndex(newRoomIndex);
    
    //     // STOMP를 활성화하고 채팅방에 대한 구독을 설정
    //     messageStore.subscribeMessageBroker(newRoomIndex);
    // };

    return (
        <div>
            <MessageList roomIndex={currentRoomIdx} currentRoomIdxRef={currentRoomIdxRef} />
            <Room />
        </div>
    );
};

export default ChatRoom;