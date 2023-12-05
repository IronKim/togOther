package com.finalProject.togOther.dto;

public class MessageRequestDto {
	private String type;

    private Long roomId;

    private String userId;

    private String message;
    
    //private Long userCount;
    
    //private String userMaster;
    
    public MessageRequestDto() {

    }

    public MessageRequestDto(String type,
                             Long roomId,
                             String userId,
                             String message
                            /* Long userCount,
                             String userMaster*/) {
        this.type = type;
        this.roomId = roomId; //채팅방 id
        this.userId = userId; //보내는 사람
        //this.userMaster = userMaster; //채팅방 생성한 사람
        this.message = message; //내용
       // this.userCount = userCount; //사람수
    }

    public String getType() {
        return type;
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }
    /*
    public Long getUserCount() {
    	return userCount;
    }
    public String getUserMaster() {
    	return userMaster;
    }
    */
}
