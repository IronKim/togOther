import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPaymentBySeq, getTourPackageByTpSeq } from '../../api/PackageApiService';

import backBut from '../../assets/image/backBut.png'
import thumb from '../../assets/image/package_thumb.png'
import styles from '../../css/PackageResDetails.module.css';

import sweet from 'sweetalert2';
import { useUserStore } from '../../stores/mainStore';

const PackageResDetails = (props) => {
    const {paySeq,onBack,onClose} = props;

    const {paymentSeq} = useParams();

    const {user} = useUserStore();

    const navigate = useNavigate()

    const [payment,setPayment] = useState()
    const [packages,setPackages] = useState()

    useEffect(()=>{
       
        getPaymentBySeq(paySeq === undefined ? paymentSeq : paySeq)
        .then(res => {
            setPayment(res.data)

            if(res.data.userSeq !== user.userSeq && user.authority !== 'ROLE_ADMIN') {
                navigate('/');
                sweet.fire({
                    title: "잘못된 접근입니다.",
                    icon: "warning"
                })
            }


            getTourPackageByTpSeq(res.data.tpSeq)
            .then(res2 => {
                setPackages(res2.data)
            })
        })
    },[paymentSeq])

    const onToPackagePage = (tpSeq) => {
        navigate(`/package/details/${tpSeq}`)
    }

    const back = () => {
        navigate(`/package`)
    }

    return (
        <div className={styles.main} style={{width : paySeq !== undefined && '100%'}}>
            <img className={styles.backBut} src={backBut} onClick={() => paySeq === undefined ? back() : onClose === undefined ? onBack() : onClose()}/>
            {paySeq === undefined ?  <div>
                <div className={styles.topTitle}>예약완료</div>
                <div className={styles.hr}/>
            </div> : <div style={{clear:'both'}}></div>}
            <section className={styles.leftSection}>
            {packages !== undefined && <div className={styles.item} onClick={()=>onToPackagePage(packages.tpSeq)}>
                <img src= {packages.tpThumbnail.split(',')[0] !== '' 
                    ? packages.tpThumbnail.split(',')[0]: thumb} alt="Package Image"/>
                <div className={styles.itemTitle}>{packages.tpTitle}</div>    
                <div className={styles.itemPrice}>{parseFloat(packages.tpPrice).toLocaleString()}원</div>    
                <div style={{clear:'both'}}></div>
                </div>
            }
            <br/>
            {
                payment &&<div>
                    <h1>예약자 정보</h1>
                    <h2>이름</h2>
                    <h3>{payment.bookerName}</h3>
                    <h2>전화번호</h2>
                    <h3>{payment.bookerTel}</h3>
                    <h2>이메일</h2>
                    <h3>{payment.bookerEmail}</h3>
                    <h2>생년월일</h2>
                    <h3>{payment.bookerBirthday}</h3>
                </div>
            }
            </section>
            <section className={styles.rightSection}>
                {payment && <div>
                    <h1>출발 일자</h1>
                    <h2>{payment.useDate}</h2>
                    <br/>
                    <h1>결제 정보</h1>
                    <h2>가격</h2>
                    <h3>{parseFloat(payment.price).toLocaleString()}원</h3>
                    <h2>구매 개수</h2>
                    <h3>{payment.count}개</h3>
                    <h2>총 결제 금액</h2>
                    <h3>{parseFloat(payment.price * payment.count).toLocaleString()}원</h3>
                    <h2>결제일</h2>
                    <h3>{payment.logTime}</h3>
                    <h2>결제수단</h2>
                    <h3>{payment.method}</h3>
                </div>}
            </section>
        </div>
    );
};

export default PackageResDetails;