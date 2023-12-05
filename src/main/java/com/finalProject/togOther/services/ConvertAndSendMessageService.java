package com.finalProject.togOther.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.ChatMessage;
import com.finalProject.togOther.dto.MessageResponseDto;
import com.finalProject.togOther.repository.ChatMessageRepository;
import com.finalProject.togOther.utils.MessageIdGenerator;

@Service
public class ConvertAndSendMessageService {
	 @Autowired
	    private SimpMessagingTemplate template;
	 	private final ChatMessageRepository chatMessageRepository;

	 	@Autowired
	    public ConvertAndSendMessageService(ChatMessageRepository chatMessageRepository) {
	        this.chatMessageRepository = chatMessageRepository;
	    }
	 	
	    public void convertAndSendMessage(String type,
	                                      Long roomId,
	                                      String userId,
	                                      String message) {
	        template.convertAndSend(
	            "/subscription/chat/room/" + roomId,
	            new MessageResponseDto(
	                MessageIdGenerator.generateId(),
	                type,
	                "사용자 " + userId + ": " + message
	            )
	        );
	    }
	    
	    public List<ChatMessage> getAllMessages(Long roomIndex) {
	        return chatMessageRepository.findAll();
	    }
}
