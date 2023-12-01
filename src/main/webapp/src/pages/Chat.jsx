import React, { useEffect, useRef, useState } from 'react';
import Room from '../components/chatting/Room';
import RoomList from '../components/chatting/RoomList';
import MessageList from '../components/chatting/MessageList';

const Chat = () => {

    const [currentRoomIdx, setCurrentRoomIdx] = useState();
    const currentRoomIdxRef = useRef(currentRoomIdx)

    useEffect(()=>{currentRoomIdxRef.current = currentRoomIdx},[currentRoomIdx])

    return (
        <div>
            <RoomList roomIndex={currentRoomIdx} setRoomIndex={setCurrentRoomIdx} />
            <MessageList roomIndex={currentRoomIdx} currentRoomIdxRef={currentRoomIdxRef}/>
            <Room />
        </div>
    );
};

export default Chat;