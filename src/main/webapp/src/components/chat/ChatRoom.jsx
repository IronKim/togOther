import React, { useEffect, useState } from 'react';
import useMessageStore from '../../hooks/useMessageStore';
import axios from 'axios';
import SockJS from 'sockjs-client';

import styles from '../../css/chat.module.css';
import profileImg from '../../assets/image/profile_thumb.png'
import ProfileView from '../ProfileView/ProfileView';

const ChatRoom = (props) => {

    const {roomNum,user,users} = props

    const [modalShow1, setModalShow1] = useState(false);
    const [userSeq, setUserSeq] = useState(-1);

    const messageStore = useMessageStore();
    const [messageToSend, setMessageToSend] = useState('');
    const [messageLogs, setMessageLogs] = useState([]);
    const [messages, setMessages] = useState([]);

    const { connected, messageEntered } = messageStore;

    const onErrorImg = (e) => {
        e.target.src = profileImg;
    }

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
    
        if (roomNum) {
            console.log('Fetching messages for RoomIndex:', roomNum);
    
            axios.get(`http://www.togother.kro.kr/chat/messages/${roomNum}`)
                .then(response => {
                    const fetchedMessages = response.data;
                    setMessages(fetchedMessages);
                    console.log(messages)
                    setTimeout(() => {
                        const messageSection = document.getElementById('messageSection');
                            messageSection.scrollTo({
                                top: messageSection.scrollHeight,
                            });
                    }, 10);
                })
                .catch(error => {
                console.error('An error occurred while calling the API:', error);
            });
    
          const socket = new SockJS('http://www.togother.kro.kr/chat');
          console.log('RoomIndex:', roomNum);
          socket.onopen = () => {
            const message = {
              type: 'message',
              roomId: roomNum,
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
      }, [roomNum]);
    //////////////////////////////////////////////////////////////
    useEffect(() => {
        console.log('Room 컴포넌트가 리렌더링되었습니다.');
        const updateMessages = () => {
            // messageStore의 messageLogs가 업데이트될 때마다 호출됩니다.
            setTimeout(() => {
                const messageSection = document.getElementById('messageSection');
                if(messageSection !== null && 
                    messageSection.scrollTop+1000 > messageSection.scrollHeight) {
                    messageSection.scrollTo({
                        top: messageSection.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);

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
        } else {
            setTimeout(() => {
                const messageSection = document.getElementById('messageSection');
                messageSection.scrollTo({
                    top: messageSection.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
            // 메세지를 전송하는 로직 추가
            messageStore.sendMessage({ type: 'message' });
            setMessageToSend('');
        }
        
    };

    const handleChangeInput = (event) => {
        const { value } = event.target;
        setMessageToSend(value);
        messageStore.changeInput(value, { type: 'message' });  // Update messageStore state
    };
    //////////////////////////////////////////////////
    
    const onModal = (n) => {
        setUserSeq(n)
        setModalShow1(true)
    }

    return (
        <div className={styles.chatRoom}>
            <section className={styles.messageSection} id='messageSection'>
                {messages
                    .filter((item) => item.roomId === roomNum)
                    .map((message) => (
                    <div>
                    <div key={message.id} className={styles.messageItem}
                        style={{float: message.userId === user.id ? 'right' : 'left',
                        textAlign: message.userId === user.id ? 'right' : 'left'}}>
                        <div className={styles.messageInfo}>
                            <p className={styles.messageUser} style={{float: message.userId === user.id ? 'right' : 'left'}}>
                                <div style={{float: message.userId !== user.id ? 'right' : 'left'}}>
                                    {users.find(item => item.id === message.userId).name}</div>
                                <img src={users.find(item => item.id === message.userId) &&
                                    (users.find(item => item.id === message.userId).profileImage !== null &&
                                    users.find(item => item.id === message.userId).profileImage !== '' &&
                                    !users.find(item => item.id === message.userId).profileImage.includes('null')) ?
                                    users.find(item => item.id === message.userId).profileImage : profileImg}
                                    onClick={() => onModal(users.find(item => item.id === message.userId).userSeq)}
                                    onError={onErrorImg}
                                    style={{float: message.userId !== user.id ? 'right' : 'left'}}/>
                            </p>
                        <div style={{clear:'both'}}/>
                        </div>
                        <div className={styles.messageBubble}>
                        <p className={styles.messageContent}>{message.message}</p>
                        <h3 className={styles.messageTimestamp}>{formatTimestamp(message.timestamp)}</h3>
                        </div>
                    </div>
                    <div style={{clear:'both'}}/>
                    </div>
                ))}
                {messageLogs.map((message, index) => 
                    {if(message.roomId === roomNum){
                    return <div><div key={`${message}-${index}`} className={styles.messageItem}
                                style={{float: message.userId === user.id ? 'right' : 'left',
                                    textAlign: message.userId === user.id ? 'right' : 'left'}}>
                                <div className={styles.messageInfo}>
                                    <p className={styles.messageUser} style={{float: message.userId === user.id ? 'right' : 'left'}}>
                                        <div style={{float: message.userId !== user.id ? 'right' : 'left'}}>
                                            {users.find(item => item.id === message.userId).name}</div>
                                        <img src={users.find(item => item.id === message.userId) &&
                                            (users.find(item => item.id === message.userId).profileImage !== null &&
                                            users.find(item => item.id === message.userId).profileImage !== '' &&
                                            !users.find(item => item.id === message.userId).profileImage.includes('null')) ?
                                            users.find(item => item.id === message.userId).profileImage : profileImg}
                                            onClick={() => onModal(users.find(item => item.id === message.userId).userSeq)}
                                            onError={onErrorImg}
                                            style={{float: message.userId !== user.id ? 'right' : 'left'}}/>
                                    </p>
                                <div style={{clear:'both'}}/>
                                </div>
                                <div className={styles.messageBubble}>
                                    <p className={styles.messageContent}>{message.message}</p>
                                    <h3 className={styles.messageTimestamp}>{formatTimestamp(message.timestamp)}</h3>
                                </div>
                            </div>
                            <div style={{clear:'both'}}/>
                        </div>
                    } else if(message.type === 'enter') {
                    return <div className={styles.messageIn}>{message.value}</div>
                }})}
            </section>
            <section className={styles.sendSection}>
                <form onSubmit={handleSubmit}>
                <textarea
                    value={messageEntered}
                    onChange={handleChangeInput}
                    className={styles.button1}
                />
                <button
                    type="submit"
                    className={styles.button2}
                    style={{backgroundColor : messageToSend === '' && '#78b5ff'}}
                    disabled={messageToSend === '' && true}
                >
                    전송
                </button>
                </form>
            </section>
            {userSeq !== -1 && <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={userSeq}/> }
        </div>
    );
};

export default ChatRoom;