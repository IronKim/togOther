package com.finalProject.togOther.kakao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomMessageService {

    @Autowired
    MessageService messageService;

    public void sendMessage(String token,String text,String link) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setMobileUrl(link);
        myMsg.setObjType("text");
        myMsg.setWebUrl(link);
        myMsg.setText(text);
  
        messageService.sendToFriendMessage(token, myMsg);
    }
}
