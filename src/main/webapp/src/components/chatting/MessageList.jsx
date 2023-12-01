import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const MessageList = ({roomIndex, currentRoomIdxRef}) => {
  const [messages, setMessages] = useState([]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    
    // Run only if currentRoomIdx is valid
    if (roomIndex) {
        
      // WebSocket connection
      const socket = new SockJS('http://localhost:8080/chat');
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

      // Code executed when a WebSocket message is received
      socket.onmessage = async (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);

        // When a new message arrives, retrieve the new message through an API call
        try {
          const response = await axios.get('http://localhost:8080/chat/messages');
          const newMessages = response.data;
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        } catch (error) {
          console.error('An error occurred while calling the API:', error);
        }
      };

      return () => {
        // Disconnect WebSocket when component is unmounted
        socket.close();
      };
    }
  }, [roomIndex]);

  //Call API using Axios
  useEffect(() => {
    console.log('Fetching messages for RoomIndex:', roomIndex);
    
    //axios.get(`http://localhost:8080/chat/messages/${currentRoomIdx}`)
    axios.get(`http://localhost:8080/chat/messages/${roomIndex}`)
      .then(response => {
        const fetchedMessages = response.data;
        setMessages(fetchedMessages);
        console.log(messages)
      })
      .catch(error => {
        console.error('An error occurred while calling the API:', error);
      });
  }, [roomIndex]); // Pass useEffect as an empty array to run it only once when the component is mounted

  return (
    <div>
      {/* {roomIndex ? <>{roomIndex}</> : <>없다</>} */}
      <ul>
      {messages.filter((item)=>item.roomId === currentRoomIdxRef.current).map(message => (
          <li key={message.id}>
            {message.userId}: {message.message}- {formatTimestamp(message.timestamp)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
