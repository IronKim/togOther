import { messageService } from '../services/MessageService';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const baseUrl = 'http://127.0.0.1:8080';

export default class MessageStore {
  constructor() {
    this.listeners = new Set();

    this.userId = Math.ceil(Math.random() * 1000);

    this.socket = new SockJS(`${baseUrl}/chat`);
    this.client = Stomp.over(() => this.socket);
    this.connected = false;

    this.currentRoomIndex = 0;
    this.roomIndices = [1, 2, 3];

    this.messageEntered = '';
    
    this.messageLogs = [];
    
  }

  connect(roomIndex) {
    if (this.connected) {
      console.warn('Socket is already connected.');
      return;
    }

    this.socket = new SockJS(`${baseUrl}/chat`);
    this.client = Stomp.over(() => this.socket);

    this.currentRoomIndex = roomIndex;
    this.subscribeMessageBroker(this.currentRoomIndex);
    this.connected = true;
    this.publish();
  }
  
  subscribeMessageBroker(roomIndex) {
    this.client.connect(
      {},
      () => {
        this.client.subscribe(
          `/subscription/chat/room/${roomIndex}`,
          (messageReceived) => this.receiveMessage(messageReceived),
          {},
        );

        this.sendMessage({ type: 'enter' });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
        // Handle error, e.g., reconnect or show a message to the user.
      }
    );
  }

  disconnect() {
    console.log('웹소켓 연결 해제 중...');
  
    // 나가기 메시지 전송
    this.sendMessage({ type: 'quit' });
    
    if (this.client) {
      this.client.unsubscribe();
      this.client.disconnect();
    }
    
    this.connected = false;
    this.currentRoomIndex = 0;
    this.messageEntered = '';
    this.messageLogs = [];
    this.publish();
  }

  changeInput(value) {
    this.messageEntered = value;
  }

  sendMessage({ type }) {
    const message = type === 'message'
      ? this.messageEntered
      : '';

      
    console.log('sendMessage called with message:', messageStore.messageEntered);
    // 입장 메시지 전송
    if (type === 'enter') {
      messageService.sendMessage({
        client: this.client,
        messageToSend: {
          type: 'enter',
          roomId: this.currentRoomIndex,
          userId: this.userId,
          message: `User ${this.userId} entered the room.`,
        },
      });

      return;
    }
  
    // 입력값이 비어있는 경우 전송을 중지
    if (type === 'message' && !this.messageEntered.trim()) {
      console.log('메시지를 입력하세요.');
      alert('메시지를 입력하세요.');
      return;
    }

    console.log('sendMessage called with message:', this.messageEntered);
  
    // 일반 메시지 전송
    messageService.sendMessage({
      client: this.client,
      messageToSend: {
        type,
        roomId: this.currentRoomIndex,
        userId: this.userId,
        message: this.messageEntered,
      },
    });
  
    // 메시지를 보내고 나서 입력 창을 초기화합니다.
    this.messageEntered = '';
    console.log('입력 창이 초기화되었습니다.');
  
    // 이후에 publish 메서드를 호출하여 상태 업데이트를 알립니다.
    this.publish();
  }

  receiveMessage(messageReceived) {
    try {
      const message = JSON.parse(messageReceived.body);
      console.log('Received message:', message);
      this.messageLogs = [...this.messageLogs, this.formatMessage(message)];
      this.publish();
    } catch (error) {
      console.error('Received message is not valid JSON:', messageReceived.body);
    }
  }

  formatMessage(message) {
    return {
      id: message.id,
      value: `${message.value} (${new Date().toLocaleTimeString()})`,
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const messageStore = new MessageStore();