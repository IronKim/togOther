import React, { useEffect, useState } from 'react';
import {getPaymentAll} from '../../api/PackageApiService'
import styles from '../../css/advisorPayment.module.css'
import AdvisorDashboardModal from './AdvisorDashboardModal';

const AdvisorDashboardPayment = () => {

    const [payment,setPayment] = useState([]);

    

    useEffect(()=>{
        getPaymentAll()
        .then(res =>
            setPayment(res.data.reverse())    
        )
    },[])

    const[search,setSearch] = useState('')

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

    return (
        <div>
            {
                on && <AdvisorDashboardModal onClose={onClose} type={type} seq={seq}/>
            }
            <section className={styles.paymentSection}>
            <h1 className={styles.topTitle}>예약 관리</h1>
            <div className={styles.paymentTop}>
                <span className={styles.time} style={{fontSize:'20px'}}>날짜</span>
                <span className={styles.title}>제목</span>
                <span className={styles.userInfo}>예약자(seq)</span>
                <span className={styles.price}>결제 금액</span>
                <input type='search' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='검색' />
            </div>
            <div className={styles.paymentList}>
            {
                payment.filter(item => item.title.includes(search) || item.bookerName.includes(search) 
                ).map(pay => <div className={styles.paymentItem}>
                    <span className={styles.time}>{new Date(pay.logTime).getMonth()+1}/
                    {new Date(pay.logTime).getDate()}<br/>
                    {new Date(pay.logTime).getHours()}:{new Date(pay.logTime).getMinutes()}</span>
                    <span className={styles.title}>{pay.title}</span>
                    <span className={styles.userInfo}>{pay.bookerName}({pay.userSeq})</span>
                    <span className={styles.price}>{parseFloat(pay.price).toLocaleString()}원 * {pay.count}개 =
                        총 {parseFloat(pay.price * pay.count).toLocaleString()}원</span>
                    <button onClick={()=>onModal(2,pay.paymentSeq)} className={styles.buts}>보기</button>
                </div>)
            }
            </div>
            </section>
        </div>
    );
};

export default AdvisorDashboardPayment;