import { useEffect, useState } from 'react';
import useMessageStore from '../../hooks/useMessageStore';
import styles from '../../css/MessageList.module.css';

export default function Room(props) {
  const {roomNum} = props

  const messageStore = useMessageStore();
  const [messageToSend, setMessageToSend] = useState('');
  const [messageLogs, setMessageLogs] = useState([]);
  const { connected, messageEntered } = messageStore;

  //////////////////////////////////시간 형식 잡기
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
  };
//////////////////////////////////////////////////////

  useEffect(() => {
    console.log('Room 컴포넌트가 리렌더링되었습니다.');
    const updateMessages = () => {
      // messageStore의 messageLogs가 업데이트될 때마다 호출됩니다.
      setMessageLogs(messageStore.messageLogs);
    };

    messageStore.subscribe(updateMessages);

    return () => {
      messageStore.unsubscribe(updateMessages);
    };
  }, [messageStore]);

  const beforeUnloadListener = (() => {
    if (connected) {
      messageStore.disconnect();
    }
  });

  window.addEventListener('beforeunload', beforeUnloadListener);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 메세지 입력 여부 확인
    if (!messageToSend) {
      alert('메세지를 입력해주세요.');
      return;
    }
    
    // 메세지를 전송하는 로직 추가
    messageStore.sendMessage({ type: 'message' });
    
    // 상태 초기화
    setMessageToSend('');
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    setMessageToSend(value);
    messageStore.changeInput(value, { type: 'message' });  // Update messageStore state
  };

  const handleConnect = (newRoomIndex) => {
    // 이미 연결되어 있다면 더 이상의 작업을 수행하지 않음
    if (messageStore.connected) {
      console.warn('Socket is already connected.');
      return;
    }
  
    messageStore.connect(newRoomIndex);
  }
  
  if (!connected) {
    return (
      null
    );
  }
  

  return (
    <div>
      <ul>
      {messageLogs.map((message, index) => 
      {if(message.roomId === roomNum){
         return <li key={`${message}-${index}`} className={styles.messageItem}>
            <div className={styles.messageInfo}>
              <p className={styles.messageUser}>{message.userId}</p>
            </div>
            <div className={styles.messageBubble}>
              <p className={styles.messageContent}>{message.message}</p>
              <p className={styles.messageTimestamp}>{formatTimestamp(message.timestamp)}</p>
            </div>
          </li>
      } else if(message.type === 'enter') {
        return <li>{message.value}</li>
      }})}
      </ul> 
      <form onSubmit={handleSubmit}>
        <label htmlFor="message-to-send">
          메시지 입력
        </label>
        <input
          type="text"
          value={messageEntered}
          onChange={handleChangeInput}
          className={styles.button1}
        />
        <button
          type="submit"
          className={styles.button2}
        >
          전송
        </button>
      </form>
      <button onClick={()=>console.log(messageLogs)}>하하</button>
    </div>
  );
}
