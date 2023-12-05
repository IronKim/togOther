package com.finalProject.togOther.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.dto.MessageResponseDto;
import com.finalProject.togOther.utils.MessageIdGenerator;

@Service
public class CreateRoomService {
	@Autowired
    private SimpMessagingTemplate template;

	public void Room(Long id, 
					 String newRoomName, 
					 String roomMaster, 
					 Long userCount,
					 String type) {
		template.convertAndSend(
	            "/subscription/chat/room/" + newRoomName,
	            new MessageResponseDto(
	                MessageIdGenerator.generateId(),
	                type,
	                "사용자 " + roomMaster + " 님이 "
	                    + "새로운 채팅방 " + newRoomName + "을 개설하였습니다." 
	                    	+ "현재 총 인원은 " +  userCount + "입니다."
	
	            )
);
		
	}

	public void Room(com.finalProject.togOther.models.Room room) {
		// TODO Auto-generated method stub
		
	}

}
