import React, { useState } from 'react';
import Chat from './Chat';

import { useUserStore } from '../../stores/mainStore';
import Style from '../../css/homeModal.module.css'
import messageIcon from '../../assets/image/message_icon.png'


const ChatBtn = () => {
  const {user} = useUserStore();
  const[open,setOpen] = useState(false)
  const[close,setClose] = useState(false)
  const onClose = () => {
    setClose(true)
    setTimeout(() => {
      setClose(false)
      setOpen(false)
		}, 700);
  }
    return (
        <div>
        {   user.name !== '' &&
          <div className={Style.openWrite} onClick={() => !open && setOpen(true)} style={{opacity : open ? 0 : 1}}>
            <img src={messageIcon} className={Style.messageIcon}/>
          </div>
        }
        {open && <Chat onClose={onClose} close={close}/>}
        </div>
    );
};

export default ChatBtn;