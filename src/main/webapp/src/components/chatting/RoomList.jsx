import { useEffect } from 'react';
import useMessageStore from '../../hooks/useMessageStore';

export default function RoomList({roomIndex, setRoomIndex}) {
  const messageStore = useMessageStore();

  const {
    socket,
    connected,
    currentRoomIndex,
    roomIndices,
  } = messageStore;

  const handleClickEnterRoom = ({ newRoomIndex }) => {

    
    // setCurrentRoomIdx(newRoomIndex);

    if (connected) {
      console.warn('Already connected.');
      messageStore.disconnect(currentRoomIndex);
    }
  
    // 연결 시도
    messageStore.connect(newRoomIndex);

    setRoomIndex(newRoomIndex)
    
  };

  const handleClickQuitRoom = async () => {
    messageStore.disconnect(currentRoomIndex);
    setRoomIndex()
  };

 
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
    </div>
  );
}
