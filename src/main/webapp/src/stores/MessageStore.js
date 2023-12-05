import { messageService } from '../services/MessageService';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import SockJS from 'sockjs-client';

const baseUrl = 'http://127.0.0.1:8080';

export default class MessageStore {

  constructor() {

    // 리스너들을 저장할 Set 초기화
    this.listeners = new Set();
    
    // SockJS와 Stomp를 사용하여 WebSocket 클라이언트 초기화
    this.socket = new SockJS(`${baseUrl}/chat`);
    this.client = Stomp.over(() => this.socket);
    this.connected = false;

    // 현재 채팅방 인덱스 및 가능한 채팅방 인덱스들 초기화
    this.currentRoomIndex = 0;
    this.roomIndices = [1, 2, 3];

    // 메시지 입력과 메시지 로그 초기화
    this.messageEntered = '';
    this.messageLogs = [];
  }

  connect(roomIndex, seq) {
    // 이미 연결된 경우 경고 출력후 함수를 종료
    if (this.connected) {
      console.warn('Socket is already connected.');
      return;
    }

    // 사용자 ID 할당
    this.userId = seq;

    // 기존 연결이 있다면 먼저 연결 해제
    if (this.client) {
    this.client.disconnect();
  }

    // WebSocket 및 Stomp 클라이언트를 초기화
    this.socket = new SockJS(`${baseUrl}/chat`);
    this.client = Stomp.over(() => this.socket);

    // 현재 채팅방 인덱스를 설정하고 해당 채팅방에 대한 구독을 시작
    this.currentRoomIndex = roomIndex;
    this.subscribeMessageBroker(this.currentRoomIndex);
    this.connected = true;

    // 메시지 발행
    this.publish();
  }

  subscribeMessageBroker(roomIndex) {

    // Stomp 클라이언트를 연결하고 채팅방에 대한 구독 설정
    this.client.connect(
      {},
      () => {
        this.client.subscribe(
          `/subscription/chat/room/${roomIndex}`,
          (messageReceived) => this.receiveMessage(messageReceived),
          {},
        );

        // 입장 메시지 전송
        this.sendMessage({ type: 'enter' });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
        // 오류 처리, 사용자에게 메시지 표시
      }
    );
  }

  disconnect() {
    if (this.client && this.client.connected){
    console.log('웹소켓 연결 해제 중...');
  
    // 나가기 메시지 전송
    this.sendMessage({ type: 'quit' });
    
    // 클라이언트 구독 해제후 연결을 해제
    if (this.client) {
      this.client.unsubscribe();
      this.client.disconnect();
    }
    
    // 상태 초기화
    this.connected = false;
    this.currentRoomIndex = 0;
    this.messageEntered = '';
    this.messageLogs = [];
    
    // 메시지 발행
    this.publish();
  } else {
    console.warn('Socket is not connected.');
  }

  }

  // createRoom({ type, newRoomName, roomIndex }) {
  //   console.log('새로운 채팅방 생성');
  
  //   // 클라이언트가 연결된 상태인지 확인
  //   if (this.client && this.client.connected) {
  //     this.client.subscribe(
  //       `/subscription/chat/room/${roomIndex}`,
  //       (messageReceived) => this.receiveMessage(messageReceived),
  //       {},
  //     );
  
  //     if (type === 'createRoom') {
  //       // 채팅방 생성 메시지 전송
  //       messageService.sendMessage({
  //         client: this.client,
  //         messageToSend: {
  //           type: 'text',
  //           placeholder: '채팅방 이름',
  //           value: newRoomName,
  //         },
  //       });
  //     }
  //   } else {
  //     console.error('활성 STOMP 연결이 없습니다. 채팅방을 생성할 수 없습니다.');
  //   }
  // }

  // Room 생성 로직
  createRoomHandler = async (newRoomName) => {
    try {
        // Check if STOMP is connected before creating a room
        if (!messageStore.connected) {
            console.log('STOMP connection is not active. Cannot create a chat room.');
            return;
        }

        // Create a Room and get the Index of the created Room
        const createdRoomIndex = await this.createRoom({
            type: 'createRoom',
            newRoomName,
        });

        // Get the message with the retrieved Index
        this.fetchMessages(createdRoomIndex);
    } catch (error) {
        console.error('An error occurred while calling the API:', error);
    }
}

  // Room 생성 API 호출
  createRoom = async ({ type, newRoomName, roomIndex }) => {
    console.log('새로운 채팅방 생성');
  
    // 클라이언트가 연결된 상태인지 확인
    if (this.client && this.client.connected) {
      this.client.subscribe(
        `/subscription/chat/room/${newRoomName}`,
            (messageReceived) => this.receiveMessage(messageReceived),
            {},
        );
  
      if (type === 'createRoom') {
        // 채팅방 생성 메시지 전송
        messageService.sendMessage({
          client: this.client,
          messageToSend: {
            type: 'text',
            placeholder: '채팅방 이름',
            value: newRoomName,
          },
        });
      }
    } else {
      console.error('활성 STOMP 연결이 없습니다. 채팅방을 생성할 수 없습니다.');
    }
    try {
      const response = await axios.post('http://127.0.0.1:8080/chat/createRoom', {
        newRoomName,
    });

    // 생성된 Room의 Index 반환
    return response.data.roomIndex;
  } catch (error) {
    console.error('Room 생성 API 호출 중 오류 발생:', error);
    throw error;
  }
}

// Room에 해당하는 메시지 가져오기
fetchMessages = async (newRoomName) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/chat/messages/${newRoomName}`);
    console.log(`Fetching messages for RoomIndex: ${newRoomName}`, response.data);
  } catch (error) {
    console.error('메시지 가져오기 API 호출 중 오류 발생:', error);

     // 여기서 어떤 종류의 404 에러인지 확인
     if (error.response && error.response.status === 404) {
      console.error('해당 RoomIndex에 대한 메시지를 찾을 수 없습니다.');
    }
  }
}

  changeInput(value) {
    // 메시지 입력값 변경
    this.messageEntered = value;
  }

  sendMessage({ type }) {
    // 메시지 입력 전송
    const message = type === 'message'
      ? this.messageEntered
      : '';

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

    // 일반 메시지를 전송
    messageService.sendMessage({
      client: this.client,
      messageToSend: {
        type,
        roomId: this.currentRoomIndex,
        userId: this.userId,
        message: this.messageEntered,
      },
    });
  
    // 입력 창을 초기화
    this.messageEntered = '';
    console.log('입력 창이 초기화되었습니다.');
  
    // 상태 업데이트
    this.publish();
  }

  receiveMessage(messageReceived) {
    try {
      // 받은 메시지를 파싱하고 로그에 추가
      const message = JSON.parse(messageReceived.body);
      console.log('Received message:', message);
      this.messageLogs = [...this.messageLogs, this.formatMessage(message)];
      this.publish();
      this.publish();
    } catch (error) {
      console.error('Received message is not valid JSON:', messageReceived.body);
    }
  }

  formatMessage(message) {
    // 메시지 포맷을 변경
    return {
      id: message.id,
      value: `${message.value} (${new Date().toLocaleTimeString()})`,
    };
  }

  subscribe(listener) {
    // 리스너 추가
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    // 리스너 제거
    this.listeners.delete(listener);
  }

  publish() {
    // 모든 리스너에게 상태 업데이트 알림
    this.listeners.forEach((listener) => listener());
  }
}

// 싱글톤으로 사용할 MessageStore 인스턴스를 생성
export const messageStore = new MessageStore();
