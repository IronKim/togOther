import React from 'react';
import Chat from './components/chat/Chat';

import { useUserStore } from '../../stores/mainStore';
import Style from '../../css/homeModal.module.css'
import messageIcon from '../../assets/image/message_icon.png'


const ChatBtn = () => {
  const {user} = useUserStore();
  const[open,setOpen] = useState(false)
  const onClose = () => {
    setOpen(true)
  }
    return (
        <div>
            {   user.name !== '' &&
          <div className={Style.openWrite} onClick={() => setOpen(!open)}>
            <img src={messageIcon} className={Style.messageIcon}/>
          </div>
      }
      {!open && <Chat onClose={onClose}/>}
        </div>
    );
};

export default ChatBtn;