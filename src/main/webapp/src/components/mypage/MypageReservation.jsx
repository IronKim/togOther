import React, { useEffect, useState } from 'react';
import styles from '../../css/MyPage.module.css';
import { getPaymentList,getTourPackageList } from '../../api/PackageApiService';
import { useUserStore } from '../../stores/mainStore';

import PackageResDetails from '../package/PackageResDetails';

import thumb from '../../assets/image/package_thumb.png'

const MypageReservation = () => {

    const {user} = useUserStore();

    const [payment,setPayment] = useState([]);
    const [packages,setPackages] = useState([])

    const [paySeq,setPaySeq] = useState(-1)
    const [paymentDiv,setPaymentDiv] = useState(false)
    
    const onBack = () => {
        setPaymentDiv(false)
    }

    const onPayment = (seq) => {
        setPaymentDiv(true)
        setPaySeq(seq)
    }

    useEffect(()=>{
        getPaymentList(user.userSeq)
        .then(res => {
            setPayment(res.data)
            
        })
        getTourPackageList()
        .then(res => 
            setPackages(res.data)
        )
    },[user])

    return (
        <div className={ styles.my_reservation_main }>
            <p className={ styles.reservation_title }>예약 내역</p>
            <hr className={styles.hr_1} />
            { paymentDiv && <PackageResDetails paySeq={paySeq} onBack={onBack}/>}
            { !paymentDiv && payment.map(pay => 
                <div className={ styles.reservation_1 } onClick={()=>onPayment(pay.paymentSeq)}>
                    <div >
                        {packages.length > 0 && 
                            <img className={ styles.reservation_img }
                            src= {packages.find(pack => pay.tpSeq === pack.tpSeq).tpThumbnail !== '' 
                            ? packages.find(pack => pay.tpSeq === pack.tpSeq).tpThumbnail.split(',')[0] : 
                            thumb} alt="Package Image"/>
                        }
                    </div>   
                        <h1 className={ styles.div_h1 }>
                            {pay.title}
                            <h2>{pay.useDate} 출발</h2>
                        </h1>
                        <p className={ styles.div_p }>{parseFloat(pay.price).toLocaleString()}원 {pay.count}개 
                        <h2>총 {parseFloat(pay.price * pay.count).toLocaleString()}원</h2></p>
                </div>
            )}
        </div>
    );
};

export default MypageReservation;