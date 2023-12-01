import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
    const [username, setUsername] = useState('')
    const msgInputRef = useRef(null);
    const websocketRef = useRef(null);

    useEffect(() => {
        // 컴포넌트가 마운트 되었을 때
        setUsername(''); //UserName 초기화

        const handleDisconnect = () => {
            disconnect();
        }

        const handleSand = () => {
            send();
        }

        const handleMsgAreaClick = () => {
            msgInputRef.current.focus();
        }

        const websocket = new WebSocket('ws://localhost:8080/chat');
        websocketRef.current = websocket;

        websocket.onmessage = onMessage;
        websocket.onopen = onOpen;
        websocket.onclose = onClose;
        
        //컴포넌트가 언마운트 되었을 때
        return () => {
            websocket.close();
        };
    }, []);

    const disconnect = () => {
        const str = username + ': 님이 방을 나갔습니다.';
        websocketRef.current.send(str);
    };

    const send = () => {
        const msg = msgInputRef.current.value.trim();
        
        console.log(username + " : " + msg);
        websocketRef.current.send(username + " : " + msg);
        msgInputRef.current.value = '';
    };

    const onOpen = () => {
        const str = username + ': 님이 입장하였습니다.';
        websocketRef.current.send(str);
    }

    const onClose = () => {
        const str = username + ': 님이 방을 나갔습니다.';
        websocketRef.current.send(str);
    }

    const onMessage = (msg) => {
        const data = msg.data;
        const sessionId = arr[0];
        const arr = data.split(" : ");
        const curSession = username;
        const message = arr[1];

        console.log(`curSession: ${curSession}`);
        console.log(`sessionId: ${sessionId}`);
        console.log(`message: ${message}`);

        const messageElement = (
            <div className={`alert ${sessionId === curSession ? 'slert-secondary' : 'alert-warning'}`}>
                <b>{ sessionId } : { message }</b>  
            </div>
        )

        setMessages((prevMessages) => [...prevMessages, messageElement])
    }

    const [message, setMessages] = useState([]);
    
    return (
        <div>
            
        </div>
    );
};

export default ChatComponent;