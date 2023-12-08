import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import styles from '../../css/MessageList.module.css';

const MessageList = ({roomIndex}) => {
  const [messages, setMessages] = useState([]);

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
    
    if (roomIndex) {
        
      const socket = new SockJS('http://www.togother.kro.kr/chat');
      console.log('RoomIndex:', roomIndex);
      socket.onopen = () => {
        const message = {
          type: 'message',
          roomId: roomIndex,
          userId: 'userID',
          message: 'Hi',
        };
        socket.send(JSON.stringify(message));
      };

      socket.onmessage = async (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);

        // When a new message arrives, retrieve the new message through an API call
        try {
          const response = await axios.get('http://www.togother.kro.kr/chat/messages');
          const newMessages = response.data;
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        } catch (error) {
          console.error('An error occurred while calling the API:', error);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [roomIndex]);
  

  //Call API using Axios
  useEffect(() => {
    console.log('Fetching messages for RoomIndex:', roomIndex);

    axios.get(`http://www.togother.kro.kr/chat/messages/${roomIndex}`)
      .then(response => {
        const fetchedMessages = response.data;
        setMessages(fetchedMessages);
        console.log(messages)
      })
      .catch(error => {
        console.error('An error occurred while calling the API:', error);
      });
  }, [roomIndex]);
  return (
    <div>
      <ul className={styles.messageList}>
      {messages
        .filter((item) => item.roomId === roomIndex)
        .map((message) => (
          <li key={message.id} className={styles.messageItem}>
            <div className={styles.messageInfo}>
              <p className={styles.messageUser}>{message.userId}</p>
            </div>
            <div className={styles.messageBubble}>
              <p className={styles.messageContent}>{message.message}</p>
              <p className={styles.messageTimestamp}>{formatTimestamp(message.timestamp)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MessageList;
