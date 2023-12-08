import React, { useEffect, useState } from 'react';

import { getAllSubscript,entryRoom,getChatSeq,deleteSubscript,addSubscript } from '../../api/TogetherApiService';

import styles from '../../css/chat.module.css';
import ProfileView from '../ProfileView/ProfileView';

import sweet from 'sweetalert2'; 

const ChatNotice = (props) => {
    const{user,users,onAl} = props

    const [modalShow1, setModalShow1] = useState(false);
    const [userSeq, setUserSeq] = useState(-1);

    const[subscript,setSubscript] = useState([])

    useEffect(()=>{
        getAllSubscript()
        .then(res => setSubscript(res.data.filter(item => item.masterSeq === user.userSeq).reverse()))
    },[])

    const onModal = (n) => {
        setUserSeq(n)
        setModalShow1(true)
    }

    const onCheck = (name,txt,tos,us,subs) => {
        sweet.fire({
            title: name + "의 소개글",
            text: txt,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "수락",
            cancelButtonText: "거절"
        }).then((result) => {
            if (result.isConfirmed) {
                onAl()
                deleteSubscript(subs)
                .then(
                    setSubscript(su => {
                        return su.filter(item => item.subscriptSeq !== subs)
                    })
                )
                const subscriptDTO = {
                    chatSeq: -1,
                    context: "신청이 수락되었습니다",
                    masterSeq: us,
                    userSeq: user.userSeq,
                    toMainSeq: tos,
                    sw : 1 
                }
                addSubscript(subscriptDTO)
                getChatSeq(tos)
                .then(res => {
                    const entry = (res.data.entrySeq !== '' && res.data.entrySeq + ',') + us + ''
                    entryRoom({chatSeq: res.data.id+'',entry : entry})
                    .then(
                        sweet.fire({
                            title: "수락하였습니다",
                            icon: "success"
                        })
                    )
                })
            } else if(result.dismiss === 'cancel'){
                onAl()
                deleteSubscript(subs)
                .then(
                    setSubscript(su => {
                        return su.filter(item => item.subscriptSeq !== subs)
                    })
                )
                const subscriptDTO = {
                    chatSeq: -1,
                    context: "신청이 거절되었습니다",
                    masterSeq: us,
                    userSeq: user.userSeq,
                    toMainSeq: tos,
                    sw : 1 
                }
                addSubscript(subscriptDTO)
                sweet.fire({
                    title: "거절하였습니다",
                    icon: "error"
                })
            }
        });
    }    
    const onDelete = (subs) => {
        onAl()
        deleteSubscript(subs)
            .then(
                setSubscript(su => {
                return su.filter(item => item.subscriptSeq !== subs)
            })
        )
    }

    return (
        <div>
            {
                subscript.map(item => <div className={styles.noticeItem}>
                    { item.sw === 0 && <button onClick={() => 
                        onCheck(users.find(item2 => item2.userSeq === item.userSeq).name,
                        item.context,item.toMainSeq,item.userSeq,item.subscriptSeq)}>보기</button>}
                    { item.sw === 1 && <button onClick={() => onDelete(item.subscriptSeq)}
                    style={{color:'black',backgroundColor:'lightgray'}}>확인</button>}
                    <div className={styles.noticeProfile}>
                        <img src={users.find(item2 => item2.userSeq === item.userSeq).profileImage} 
                        onClick={()=>onModal(item.userSeq)}/>
                        <div style={{clear:'left'}}></div>
                        <h2>{users.find(item2 => item2.userSeq === item.userSeq).name}</h2>
                    </div>
                    <p>{item.context}</p>
                </div>)
            }
            {userSeq !== -1 && <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={userSeq}/> }
        </div>
    );
};

export default ChatNotice;  