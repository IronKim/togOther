import React, { useEffect, useState } from 'react';
import { getAllPlanner,getAllTogether } from '../../api/AdvisorApiService';
import { deletePlanner } from '../../api/PlannerApiService';
import { deleteTogether } from '../../api/TogetherApiService';
import styles from '../../css/advisorCommunity.module.css';
import AdvisorDashboardModal from './AdvisorDashboardModal';

import sweet from 'sweetalert2';

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
            setPlanner(res.data.reverse())
        })
        .catch(e => console.log(e))
        getAllTogether()
        .then(res => {
            setTogether(res.data.reverse())
        })
        .catch(e => console.log(e))
    },[])

    const deletePlan = (seq) => {
        sweet.fire({
            title: "삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요"
        }).then((result) => {
            if (result.isConfirmed) {
                deletePlanner(seq)
                .then(res => {
                    setPlanner(planner.filter(item=> item.plannerSeq !== seq))
                    sweet.fire({
                        title: "삭제되었습니다",
                        icon: "success"
                    })
                })
            } 
        });
        }

    const deleteTogethers = (seq) => {
        sweet.fire({
            title: "삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTogether(seq)
                .then(res => {
                    setTogether(together.filter(item=> item.togetherSeq !== seq))
                    sweet.fire({
                        title: "삭제되었습니다",
                        icon: "success"
                    })
                })
            } 
        });
        }

    return (
        <div>
            {
                on && <AdvisorDashboardModal onClose={onClose} type={type} seq={seq}/>
            }
            <section className={styles.communitySection}>
            <h1 className={styles.topTitle}>플래너 관리</h1>
            <div className={styles.communityTop}>
                <span className={styles.time} style={{fontSize:'20px'}}>날짜</span>
                <span className={styles.title}>제목</span>
                <span className={styles.userInfo}>유저아이디(seq)</span>
                <input type='search' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='검색' />
            </div>
            <div className={styles.communityList}>
            {
                planner.filter(item => item.title.includes(search) || item.userName.includes(search) 
                || item.userid.includes(search) ).map(plan => <div className={styles.communityItem}>
                    <span className={styles.time}>{new Date(plan.logTime).getMonth()+1}/
                    {new Date(plan.logTime).getDate()}<br/>
                    {new Date(plan.logTime).getHours()}:{new Date(plan.logTime).getMinutes()}</span>
                    <span className={styles.title}>{plan.title}</span>
                    <span className={styles.userInfo}>{plan.userid}({plan.userSeq})</span>
                    <button onClick={()=>onModal(0,plan.plannerSeq)} className={styles.buts}>보기</button>
                    <button onClick={()=>deletePlan(plan.plannerSeq)} className={styles.buts}>삭제</button>
                </div>)
            }
            </div>
            </section>
            <section className={styles.communitySection}>
            <h1 className={styles.topTitle}>동행 관리</h1>
            <div className={styles.communityTop}>
                <span className={styles.time} style={{fontSize:'20px'}}>날짜</span>
                <span className={styles.title}>제목</span>
                <span className={styles.userInfo}>유저아이디(seq)</span>
                <input type='search' value={search2} onChange={(e)=>setSearch2(e.target.value)} placeholder='검색' />
                {/* 총 {total}개 */}
            </div>
            <div className={styles.communityList}>
            {
                together.filter(item => item.title.includes(search2) || item.userName.includes(search2) 
                || item.userid.includes(search2) ).map(togo => <div className={styles.communityItem}>
                    <span className={styles.time}>{new Date(togo.logTime).getMonth()+1}/
                    {new Date(togo.logTime).getDate()}<br/>
                    {new Date(togo.logTime).getHours()}:{new Date(togo.logTime).getMinutes()}</span>
                    <span className={styles.title}>{togo.title}</span>
                    <span className={styles.userInfo}>{togo.userid}({togo.userSeq})</span>
                    <button onClick={()=>onModal(1,togo.togetherSeq)} className={styles.buts}>보기</button>
                    <button onClick={()=>deleteTogethers(togo.togetherSeq)} className={styles.buts}>삭제</button>
                </div>)
            }
            </div>
            </section>
        </div>
    );
};

export default AdvisorDashboardCommunity;