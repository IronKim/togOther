import React from 'react';
import Style from '../../css/chat.module.css'

const Chat = (props) => {
    const {onClose} = props
    return (
        <>
        <div className={Style.bg} onClick={onClose}></div>
        <div className={Style.chatForm}>
            <div className={Style.chatList}>
                <div className={Style.chatListOne}>
                    님과의 대화
                </div>
            </div>
            <div className={Style.chatContext}>

            </div>
        </div>
        </>
    );
};

export default Chat;