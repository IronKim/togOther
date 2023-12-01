package com.finalProject.togOther.models;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import com.finalProject.togOther.chatUtils.RoomIdGenerator;

public class Room {
	private Long id;

    private String name;

    private final Set<WebSocketSession> sessions = new HashSet<>();

    public static Room create(String name) {
        Room room = new Room();
        room.id = RoomIdGenerator.createId();
        room.name = name;
        return room;
    }

    public Long id() {
        return id;
    }

    public Set<WebSocketSession> sessions() {
        return sessions;
    }

}
