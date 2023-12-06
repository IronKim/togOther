import { useEffect, useState } from 'react';
import useMessageStore from '../../hooks/useMessageStore';
import { useUserStore } from '../../stores/mainStore';
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

  // useEffect(() => {
  //   // Assuming communitySeq is the community sequence number
  //   const togetherSeq = 1; // You should get this value dynamically

  //   // Dynamically generate room indices based on communitySeq
  //   const roomIndices = [togetherSeq, togetherSeq + 1, togetherSeq + 2];

  //   // Update the room indices in messageStore
  //   messageStore.setRoomIndices(roomIndices);
  // }, [messageStore]);

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

  // 고유한 채팅방 인덱스를 생성하는 함수
  function generateUniqueRoomIndex() {
    //난수와 현재 날짜를 결합하여 고유한 인덱스를 생성
    const randomPart = Math.floor(Math.random() * 1000);
    const datePart = Date.now();
    return `${datePart}-${randomPart}`;
  }

  const handleCreateRoom = async () => {
    if (connected) {
      console.warn('이미 연결되어있음');
      messageStore.disconnect(currentRoomIndex);
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8080/chat/createRoom');
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
          채팅하기
        </button>
      </div>
    </div>
  );
}
