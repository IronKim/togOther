package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.ChatMessage;
import com.finalProject.togOther.domain.CreateRoom;

public interface CreateRoomRepository extends JpaRepository<CreateRoom, Long>{

}
