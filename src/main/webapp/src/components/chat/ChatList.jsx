import React, { useEffect, useState } from 'react';
import { roomList } from '../../api/ChatApiService';
import { getAllTogether,getUser } from '../../api/AdvisorApiService';
import { useUserStore } from '../../stores/mainStore';
 
import styles from '../../css/chat.module.css'

const ChatList = (props) => {
    const {onRoomNum,onSetNum} = props;

    const {user} = useUserStore();

    const [rooms,setRooms] = useState([])
    const [users,setUsers] = useState([])
    const [togos,setTogos] = useState([])

    useEffect(()=>{
        getAllTogether()
        .then(res => setTogos(res.data))

        getUser()
        .then(res => setUsers(res.data))

        roomList()
        .then(res => {
                const ro = res.data.reverse().filter(item => item.masterSeq === user.userSeq 
                    || item.entrySeq.split(',').includes(user.userSeq.toString()))
                setRooms(ro)
                onRoomNum(ro[0].id)
            }
        )
    },[user])

      //날짜 및 요일 구하기
    const calcDay = (seq) => {
        const date = new Date(togos.find(item => item.togetherSeq === seq).startDate)
        const week = date.getDay();
        const date2 = new Date(togos.find(item => item.togetherSeq === seq).endDate)
        const week2 = date2.getDay();

        if(togos.find(item => item.togetherSeq === seq).startDate === 
        togos.find(item => item.togetherSeq === seq).endDate) {
            return <span>{(date.getMonth()+1)}/{date.getDate()} 
            </span>
        } else {
            return <span>{(date.getMonth()+1)}/{date.getDate()}&nbsp;-&nbsp; 
            {(date2.getMonth()+1)}/{date2.getDate()} 
            </span>
        }
    }

    const goRoom = (n) => {
        onRoomNum(n)
        onSetNum(1)
    }

    return (
        <div>
            {
                rooms.length > 0 && rooms.map(ro => <div className={styles.roomItem} onClick={() => goRoom(ro.id)}>
                    <h1 style={{float:'left'}}>{ro.title}</h1>
                    {togos.find(item => item.togetherSeq === ro.toMainSeq) && <h3 style={{float:'right'}}>
                        {calcDay(ro.toMainSeq)}</h3>}
                    <div style={{clear:'both'}}/>
                    {users.length > 0 && <div>
                        <h2>관리자 | <span style={{fontWeight : ro.masterSeq === user.userSeq && 'bold',
                        color : ro.masterSeq === user.userSeq && '#2E8DFF'}}>
                        &nbsp;{users.find(us => us.userSeq === ro.masterSeq).name}&nbsp;</span></h2>
                        {ro.entrySeq !== '' ? <h2>참가자 | {ro.entrySeq.split(',').map( entry => 
                            <span style={{fontWeight : entry == user.userSeq && 'bold',
                            color : entry == user.userSeq && '#2E8DFF'}}>
                            &nbsp;{users.find(us => us.userSeq == entry).name}&nbsp;</span>
                        )}</h2> : <h2>참가자를 구해보세요</h2>}
                    </div>}
                </div>)
            }
        </div>
    );
};

export default ChatList;