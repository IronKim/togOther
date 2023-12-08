package com.finalProject.togOther.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.dto.MessageResponseDto;
import com.finalProject.togOther.utils.MessageIdGenerator;

@Service
public class EnterRoomService {
	 @Autowired
	    private SimpMessagingTemplate template;

	    public void enterRoom(String type,
	                          Long roomId,
	                          String userId) {
	        template.convertAndSend(
	            "/subscription/chat/room/" + roomId,
	            new MessageResponseDto(
	                MessageIdGenerator.generateId(),
	                type,
	                userId + " 님이 활동중입니다"
	            )
	        );
	    }

}
