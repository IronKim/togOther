package com.finalProject.togOther.kakao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomMessageService {

    @Autowired
    MessageService messageService;

    public void sendMessage(String token,String order) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setMobileUrl("http://localhost:8080/miniProject/order/send");
        myMsg.setObjType("text");
        myMsg.setWebUrl("http://localhost:8080/miniProject/order/send");
        myMsg.setText("어쩌구 저쩌구...");
  
        messageService.sendToFriendMessage(token, myMsg);
    }
}
