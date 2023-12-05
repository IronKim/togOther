package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.ChatMessage;
import com.finalProject.togOther.domain.CreateRoom;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{

	public void save(CreateRoom createRoom);

}
