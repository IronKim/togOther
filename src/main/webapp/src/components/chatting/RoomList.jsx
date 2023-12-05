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
        const createdRoom = await messageStore.createRoom({
          type: 'createRoom',
          newRoomName,
          roomIndex: newRoomIndex 
        });

        const { id, roomId, userId } = createdRoom;

        // Save the chat room details in the database
        await saveChatRoomToDatabase(id, roomId, userId);

        messageStore.fetchMessages(newRoomIndex);
      } catch (error) {
        console.error('An error occurred while creating the chat room:', error);
      }
      console.log('새로운 채팅방 생성')
      setNewRoomName('');
    }
  }

  const saveChatRoomToDatabase = async (roomId, roomName, roomIndex) => {
    try {
      // Make an API request or use your preferred method to save chat room details in the database
      const response = await axios.post('http://127.0.0.1:8080/chat/creatRoom', {
        roomId,
        roomName,
        roomIndex,
      });
  
      console.log('채팅방 정보가 데이터베이스에 저장되었습니다:', response.data);
    } catch (error) {
      console.error('데이터베이스에 채팅방 정보를 저장하는 동안 오류가 발생했습니다:', error);
      throw error; // Propagate the error to handle it at a higher level if needed
    }
  };
  
  useEffect(() => {
    console.log('Fetching messages for RoomIndex:', newRoomName);
    
    axios.get(`http://127.0.0.1:8080/chat/messages/${newRoomName}`)
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
