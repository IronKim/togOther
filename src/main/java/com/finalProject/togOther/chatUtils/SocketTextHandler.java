package com.finalProject.togOther.chatUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.finalProject.togOther.models.Room;
import com.finalProject.togOther.repository.RoomRepository;

import lombok.extern.log4j.Log4j2;

public class SocketTextHandler extends TextWebSocketHandler {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Long roomId = getRoomId(session);
        roomRepository.room(roomId).sessions().add(session);

        System.out.println("새 클라이언트와 연결되었습니다.");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        Long roomId = getRoomId(session);
        Room room = roomRepository.room(roomId);

        for (WebSocketSession connectedSession : room.sessions()) {
            connectedSession.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        Long roomId = getRoomId(session);
        roomRepository.room(roomId).sessions().remove(session);

        System.out.println("특정 클라이언트와의 연결이 해제되었습니다.");
    }

    private Long getRoomId(WebSocketSession session) {
        String uri = Objects.requireNonNull(session.getUri()).toString();
        String[] parts = uri.split("/");
        String roomId = parts[parts.length - 1];
        return Long.parseLong(roomId);
    }
}
