import React, { useEffect, useState } from 'react';
import { getAllPlanner,getAllTogether } from '../../api/AdvisorApiService';
import styles from '../../css/advisorCommunity.module.css';
import AdvisorDashboardModal from './AdvisorDashboardModal';

const AdvisorDashboardCommunity = () => {
    const[planner,setPlanner] = useState([])
    const[together,setTogether] = useState([])

    const[search,setSearch] = useState('')
    const[search2,setSearch2] = useState('')

    const[on,setOn] = useState(false)
    const[type,setType] = useState(-1)
    const[seq,setSeq] = useState(-1)

    const onClose = () => {
        setOn(false)
    }

    const onModal = (ty,se) => {
        setOn(true)
        setType(ty)
        setSeq(se)
    }

    useEffect(() => {
        getAllPlanner()
        .then(res => {
            setPlanner(res.data)
        })
        .catch(e => console.log(e))
        getAllTogether()
        .then(res => {
            setTogether(res.data)
        })
        .catch(e => console.log(e))
    },[])

    return (
        <div>
            {
                on && <AdvisorDashboardModal onClose={onClose} type={type} seq={seq}/>
            }
            <section className={styles.plannerSection}>
            <div className={styles.plannerTop}>
                <span className={styles.title}>제목</span>
                <span className={styles.userInfo}>유저아이디(seq)</span>
                <input type='search' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='검색' />
            </div>
            <div className={styles.plannerList}>
            {
                planner.filter(item => item.title.includes(search) || item.userName.includes(search) 
                || item.userid.includes(search) ).map(plan => <div className={styles.plannerItem}>
                    <span className={styles.title}>{plan.title}</span>
                    <span className={styles.userInfo}>{plan.userid}({plan.userSeq})</span>
                    <button onClick={()=>onModal(0,plan.plannerSeq)}>보기</button>
                    <button>삭제</button>
                </div>)
            }
            </div>
            </section>
            <section className={styles.plannerSection}>
            <div className={styles.plannerTop}>
                <span className={styles.title}>제목</span>
                <span className={styles.userInfo}>유저아이디(seq)</span>
                <input type='search' value={search2} onChange={(e)=>setSearch2(e.target.value)} placeholder='검색' />
                {/* 총 {total}개 */}
            </div>
            <div className={styles.plannerList}>
            {
                together.filter(item => item.title.includes(search2) || item.userName.includes(search2) 
                || item.userid.includes(search2) ).map(togo => <div className={styles.plannerItem}>
                    <span className={styles.title}>{togo.title}</span>
                    <span className={styles.userInfo}>{togo.userid}({togo.userSeq})</span>
                    <button onClick={()=>onModal(1,togo.togetherSeq)}>보기</button>
                    <button>삭제</button>
                </div>)
            }
            </div>
            </section>
        </div>
    );
};

export default AdvisorDashboardCommunity;