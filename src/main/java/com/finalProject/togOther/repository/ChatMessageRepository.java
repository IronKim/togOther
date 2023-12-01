package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{

}
