import { useEffect, useState } from 'react';
import useMessageStore from '../../hooks/useMessageStore';
import { useUserStore } from '../../stores/mainStore';
import axios from 'axios';

export default function RoomList({roomIndex, setRoomIndex}) {
  const messageStore = useMessageStore();
  const {user} = useUserStore()
  const [newRoomName, setNewRoomName] = useState('');

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

  //새로운 채팅방 만들기
  const handleCreateRoom = async () => {
    if (connected) {
      console.warn('이미 연결되어있음');
      messageStore.disconnect(currentRoomIndex);
    }

    const newRoomName = 'New Room'; 
    const newRoomIndex = generateUniqueRoomIndex();
  
    // 연결 시도
    await messageStore.connect(newRoomIndex, user.id);
    setRoomIndex(newRoomIndex);

    // STOMP를 활성화하고 채팅방에 대한 구독을 설정
    messageStore.subscribeMessageBroker(newRoomIndex);
    
    if(newRoomName.trim() !== '') {
       // 서버에게 채팅방 생성 요청을 보내는 로직을 추가하기
       try {
        // Add logic to send a chat room creation request to the server
        const createdRoomIndex = await messageStore.createRoom({
          type: 'createRoom',
          newRoomName,
          roomIndex: newRoomIndex 
        });
        messageStore.fetchMessages(createdRoomIndex);
      } catch (error) {
        console.error('An error occurred while creating the chat room:', error);
      }
      console.log('새로운 채팅방 생성')
      setNewRoomName('');
    }
  }
  useEffect(() => {
    console.log('Fetching messages for RoomIndex:', newRoomName);
    
    axios.get(`http://127.0.0.1:8080/chat/messages/1`)
    .then((response) => {
        console.log('Received messages:', response.data);
    })
    .catch((error) => {
        console.error('An error occurred while calling the API:', error);
    });
  }, [newRoomName]); 

  return (
    <div>
      <ul>
        {roomIndices.map((roomName) => (
          <li key={roomName}>
            <button
              type="button"
              onClick={() => handleClickEnterRoom({
                previousRoomIndex: currentRoomIndex,
                newRoomIndex: roomName,
              })}
            >
              채팅방
              {' '}
              {roomName}
            </button>
          </li>
        ))}
      </ul>
      {connected && (
        <button
          type="button"
          onClick={() => handleClickQuitRoom()}
        >
          연결 종료
        </button>
      )}
      <div>
        <input
          type="text"
          placeholder="채팅방 이름"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
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
