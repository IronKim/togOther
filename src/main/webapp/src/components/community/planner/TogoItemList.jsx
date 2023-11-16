import React from 'react';
import styles from '../../../css/planner.module.css'

const TogoItemList = (props) => {
    const {subDTO,toList,sDay,toItemDelete,xBut} = props;

    //날짜 및 요일 구하기
    const calcDay = (nDay) => {
        const date = new Date(sDay)
        date.setDate(date.getDate() + nDay - 1);
        const week = date.getDay();

        return <span>{(date.getMonth()+1)}월{date.getDate()}일 
        ({week===0&&'일'}{week===1&&'월'}{week===2&&'화'}{week===3&&'수'}
        {week===4&&'목'}{week===5&&'금'}{week===6&&'토'})</span>
    }

    return (
        <div>
            {
                subDTO.filter(item => item.toNum === toList).slice().sort((a, b) => a.nDay - b.nDay).map(
                    item2 => <div className={styles.toListItem}>
                    <div><img style={{float:'left',margin:'0 5px 5px 0'}} 
                    onClick={() => toItemDelete(item2.nDay,item2.endTime)} className={styles.xButSmall} src={xBut}/>
                    {calcDay(item2.nDay)} <div className={styles.toListTime}>
                    {item2.startTime}시 - {item2.endTime}시</div></div>
                    <div style={{clear:'both'}}>
                    <div className={styles.placeContext}><span style={{fontWeight:'bold'}}>장소 </span> 
                        {item2.place !== null && item2.place.name}{item2.customDTO !== null && item2.customDTO.placeName}</div>
                    </div><div className={styles.toListContext}><span style={{fontWeight:'bold'}}>
                    내용 </span> {item2.context}</div></div>
                )
            }
        </div>
    );
};

export default TogoItemList;