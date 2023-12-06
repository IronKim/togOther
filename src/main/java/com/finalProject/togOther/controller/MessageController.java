package com.finalProject.togOther.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.finalProject.togOther.domain.ChatMessage;
import com.finalProject.togOther.domain.CreateRoom;
import com.finalProject.togOther.dto.MessageRequestDto;
import com.finalProject.togOther.models.Room;
import com.finalProject.togOther.repository.ChatMessageRepository;
import com.finalProject.togOther.repository.CreateRoomRepository;
import com.finalProject.togOther.repository.RoomRepository;
import com.finalProject.togOther.services.ConvertAndSendMessageService;
import com.finalProject.togOther.services.CreateRoomService;
import com.finalProject.togOther.services.EnterRoomService;
import com.finalProject.togOther.services.QuitRoomService;

import jakarta.transaction.Transactional;

@RestController
public class MessageController {
    private final EnterRoomService enterRoomService;
    private final QuitRoomService quitRoomService;
    private final ConvertAndSendMessageService convertAndSendMessageService;
    private final ChatMessageRepository chatMessageRepository;
    private final CreateRoomRepository createRoomRepository;
    private final CreateRoomService createRoomService;
    private final Room room;
    private final RoomRepository roomRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
   
    @Autowired
    public MessageController(EnterRoomService enterRoomService,
                             QuitRoomService quitRoomService,
                             ConvertAndSendMessageService convertAndSendMessageService,
                             ChatMessageRepository chatMessageRepository,
                             CreateRoomRepository createRoomRepository,
                             CreateRoomService createRoomService,
                             Room room,
                             RoomRepository roomRepository) {
        this.enterRoomService = enterRoomService;
        this.quitRoomService = quitRoomService;
        this.convertAndSendMessageService = convertAndSendMessageService;
        this.chatMessageRepository = chatMessageRepository;
        this.createRoomRepository  = createRoomRepository;
        this.createRoomService = createRoomService;
        this.room = room;
        this.roomRepository = roomRepository;
    }

    @MessageMapping("/chat/enter")
    public void enter(MessageRequestDto messageRequestDto) {
        enterRoomService.enterRoom(
            messageRequestDto.getType(),
            messageRequestDto.getRoomId(),
            messageRequestDto.getUserId()
        );
    }

    @MessageMapping("/chat/quit")
    public void quit(MessageRequestDto messageRequestDto) {
        quitRoomService.quitRoom(
            messageRequestDto.getType(),
            messageRequestDto.getRoomId(),
            messageRequestDto.getUserId()
        );
    }

    @MessageMapping("/chat/message")
    public void message(MessageRequestDto messageRequestDto) {
        convertAndSendMessageService.convertAndSendMessage(
            messageRequestDto.getType(),
            messageRequestDto.getRoomId(),
            messageRequestDto.getUserId(),
            messageRequestDto.getMessage()
        );
        
     // 채팅 로그 저장
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setRoomId(messageRequestDto.getRoomId());
        chatMessage.setUserId(messageRequestDto.getUserId());
        chatMessage.setMessage(messageRequestDto.getMessage());
        chatMessage.setTimestamp(LocalDateTime.now());
        
        chatMessageRepository.save(chatMessage);
        
     // 브로드캐스팅
        messagingTemplate.convertAndSend("/subscription/chat/room/" + chatMessage.getRoomId(), chatMessage);
    }
    
    @GetMapping("/chat/messages/{roomIndex}")
    public List<ChatMessage> getAllMessages(@PathVariable Long roomIndex) {
        System.out.println("Received request for all messages");
        return convertAndSendMessageService.getAllMessages(roomIndex);
    }
    
//    @PostMapping("/chat/createRoom")
//    public void createRoom(@RequestBody String newRoomName) {
//    	createRoomService.Room(
//                room.getId(),
//                newRoomName,
//                room.getRoomMaster(),
//                room.getUserCount(),
//                room.getType()
//        );
//    	
//    	CreateRoom createRoom = new CreateRoom();
//    	createRoom.setId(room.getId());
//    	createRoom.setName(newRoomName);
//    	createRoom.setRoomMaster(room.getRoomMaster());
//    	createRoom.setUserCount(room.getUserCount());
//    	
//    	roomRepository.save(createRoom);
//    	
//    	messagingTemplate.convertAndSend("/subscription/chat/room/" + newRoomName, room);
//    }
    @PostMapping("/chat/createRoom")
    public ResponseEntity<Long> createRoom(@RequestBody Map<String, String> requestBody) {
    	
    	CreateRoom createRoom = new CreateRoom();
    	createRoom.setTitle(requestBody.get("title"));
    	createRoom.setToMainSeq(Integer.parseInt(requestBody.get("toMainSeq")));
    	createRoom.setStatus((byte) 0);
    	createRoom.setMasterSeq(Integer.parseInt(requestBody.get("master")));
    	createRoom.setEntrySeq("");
    	
    	createRoomRepository.save(createRoom);
    	
    	return ResponseEntity.ok(createRoom.getId());
    }
    
    @GetMapping("/chat/roomList")
    public ResponseEntity<List<CreateRoom>> roomList() {
    	return ResponseEntity.ok(createRoomRepository.findAll());
    }
    
    @Transactional
    @PutMapping("/chat/updateRoom")
    public ResponseEntity<String> updateRoom(@RequestBody Map<String, Integer> requestBody) {
    	
    	int beforeSeq = requestBody.get("beforeSeq");
    	
    	int afterSeq = requestBody.get("afterSeq");
    	
    	createRoomRepository.updateBytoMainSeq(beforeSeq,afterSeq);
    	
    	return ResponseEntity.ok("성공");
    }
    
    @DeleteMapping("/chat/deleteRoom")
    public ResponseEntity<String> deleteRoom(@RequestBody Map<String, Integer> requestBody) {
    	
    	int toMainSeq = requestBody.get("toMainSeq");
    	
    	createRoomRepository.deleteBytoMainSeq(toMainSeq);
    	
    	return ResponseEntity.ok("성공");
    }
    
    @MessageExceptionHandler
    public String exception(Exception ex) {
        return "Error has occurred: " + ex.getMessage();
    }
}