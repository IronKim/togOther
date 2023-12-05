package com.finalProject.togOther.models;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import com.finalProject.togOther.chatUtils.RoomIdGenerator;

import lombok.Data;
@Component
@Data
public class Room {
	private Long id; // 채팅방의 고유 식별자

    private String name; //채팅방의 이름
    
    private String type;
    
    private String roomMaster; //채팅방을 생성한 사람
    
    private Long userCount;//인원 수

    private final Set<WebSocketSession> sessions = new HashSet<>(); // 채팅방에 속한 WebSocket 세션의 집합

    private Room() {
    }
    
    // 새로운 채팅방을 생성하는 정적 메서드
    public static Room create(String name, String roomMaster, Long userCount, String type) {
        Room room = new Room();
        room.id = RoomIdGenerator.createId(); // RoomIdGenerator를 사용하여 고유한 ID 생성
        room.name = name;
        room.roomMaster = roomMaster;
        room.userCount = userCount;
        room.type = type;
        return room;
    }

    // 현재 채팅방의 ID를 반환하는 메서드
    public Long getId() {
        return id;
    }
    
    public String getName() {
    	return name;
    }
    
    public String getRoomMaster() {
    	return roomMaster;
    }
    
    public Long getUserCount() {
    	return userCount;
    }
    
    public String getType() {
        return type;
    }

    // 현재 채팅방에 속한 WebSocket 세션들의 집합을 반환하는 메서드
    public Set<WebSocketSession> sessions() {
        return sessions;
    }

}
