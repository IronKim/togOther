import React, { useState } from 'react';
import Chat from './Chat';

import { useUserStore } from '../../stores/mainStore';
import Style from '../../css/homeModal.module.css'
import messageIcon from '../../assets/image/message_icon.png'


const ChatBtn = (props) => {
  
  const {close,open,onClose,onOpen} = props

  const {user} = useUserStore();

    return (
        <div>
        {   user.name !== '' &&
          <div className={Style.openWrite} onClick={() => !open && onOpen()} style={{opacity : open ? 0 : 1}}>
            <img src={messageIcon} className={Style.messageIcon}/>
          </div>
        }
        {open && <Chat onClose={onClose} close={close}/>}
        </div>
    );
};

export default ChatBtn;