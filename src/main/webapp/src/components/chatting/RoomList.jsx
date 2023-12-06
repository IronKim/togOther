import { useEffect, useState } from 'react';
import useMessageStore from '../../hooks/useMessageStore';
import { useUserStore } from '../../stores/mainStore';
import {} from '../../api/ChatApiService';
import axios from 'axios';

export default function RoomList({roomIndex, setRoomIndex}) {
  const messageStore = useMessageStore();
  const {user} = useUserStore()

  const {
    socket,
    connected,
    currentRoomIndex,
    roomIndices,
  } = messageStore;

  //새로운 채팅방에 연결 시도
  const handleClickEnterRoom = async ({ newRoomIndex }) => {
    if (connected) {
      console.warn('이미 연결되어있음');
      messageStore.disconnect(currentRoomIndex);
  }
  
    // 연결 시도
    await messageStore.connect(newRoomIndex, user.id);
    setRoomIndex(newRoomIndex);

    // STOMP를 활성화하고 채팅방에 대한 구독을 설정
    messageStore.subscribeMessageBroker(newRoomIndex);
};

  //현재 채팅방에서 연결 종료
  const handleClickQuitRoom = async () => {
    messageStore.disconnect(currentRoomIndex);
    setRoomIndex()
  };

  function generateUniqueRoomIndex() {
    // Add your logic to generate a unique room index, e.g., using a timestamp or UUID
    return Math.floor(Math.random() * 1000); // Replace this with your actual logic
  }

  const handleCreateRoom = async () => {
    alert('ㅎㅎ')

    if (connected) {
      console.warn('이미 연결되어있음');
      messageStore.disconnect(currentRoomIndex);
    }
  
    try {
      const response = await axios.post('http://www.togother.kro.kr/chat/createRoom');
      const newRoomIndex = response.data;
  
      await messageStore.connect(newRoomIndex, user.id);
      setRoomIndex(newRoomIndex);
  
      // STOMP를 활성화하고 채팅방에 대한 구독을 설정
      messageStore.subscribeMessageBroker(newRoomIndex);
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error);
      // 오류 처리 로직 추가
    }
  };
  
  const [chatNum,setChatNum] = useState()

  return (
    <div>
      <input value={chatNum} onChange={(e) => setChatNum(e.target.value)}/>
      <button
        type="button"
        onClick={() => handleClickEnterRoom({
          previousRoomIndex: currentRoomIndex,
          newRoomIndex: parseInt(chatNum),
        })}
      >
      {chatNum}채팅방
      </button>
      {connected && (
        <button
          type="button"
          onClick={() => handleClickQuitRoom()}
        >
          연결 종료
        </button>
      )}
      <div>
        <button
          type="button"
          onClick={handleCreateRoom}
        >
          채팅방 만들기
        </button>
      </div>
    </div>
  );
}
