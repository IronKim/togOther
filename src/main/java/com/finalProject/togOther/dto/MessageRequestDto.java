package com.finalProject.togOther.dto;

public class MessageRequestDto {
	private String type;

    private Long roomId;

    private Long userId;

    private String message;
    
    public MessageRequestDto() {

    }

    public MessageRequestDto(String type,
                             Long roomId,
                             Long userId,
                             String message) {
        this.type = type;
        this.roomId = roomId; //채팅방 id
        this.userId = userId; //보내는 사람
        this.message = message; //내용
    }

    public String getType() {
        return type;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }
}
