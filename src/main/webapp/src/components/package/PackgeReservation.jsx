import React, { useEffect, useState } from 'react';
import { getTourPackageByTpSeq } from '../../api/PackageApiService';
import styles from '../../css/PackageReservation.module.css';

import sweet from 'sweetalert2';

import { useUserStore } from '../../stores/mainStore';
import { useParams } from 'react-router-dom';

const IMP = window.IMP || {};

IMP.init('imp37267524');

    const PackgeReservation = () => {

    ////////////결제 api /////////////
    function callback(response) {
        const { success, error_msg } = response;


        if (success) {
            window.scrollTo(0, 0);
            sweet.fire({
                title: "결제 성공",
                icon: "success"
            }).then(() => {
                
            });
        } else {
            sweet.fire({
                title: "결제 실패",
                text: error_msg,
                icon: "warning"
            }).then(() => {
                
            });
        }
    }

    function onClickPayment() {
        const data = {
            pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            merchant_uid: `mid_${new Date()}`,
            amount: 1000,
            name: '아임포트 결제 데이터 분석',
            buyer_name: name,
            buyer_tel: tel,
            buyer_email: email,
          };
        IMP.request_pay(data, callback);
    }
    //////////////////////////////////

    const {user} = useUserStore();

    const {packageSeq,info} = useParams();

    const[name,setName] = useState('');
    const[gender,setGender] = useState('');
    const[year,setYear] = useState('');
    const[month,setMonth] = useState('01');
    const[date,setDate] = useState('01');
    const[telCode,setTelCode] = useState('82');
    const[tel,setTel] = useState('');
    const[email,setEmail] = useState('');
    const[wish,setWish] = useState('');
    const[packages,setPackages] = useState({});



    useEffect(()=>{
        getTourPackageByTpSeq(packageSeq)
        .then(res=> {
            setPackages(res.data)
            console.log(res)
        })
    },[packageSeq])

    useEffect(()=>{
        const day = new Date(user.birthday)

        setName(user.name)
        setGender(user.gender)
        setYear(day.getFullYear())
        setMonth(day.getMonth() + 1)
        setDate(day.getDate())
        setTel(user.phone)
        setEmail(user.email)
    },[user])

    return (
        <div className={ styles.main_page }>
            <div className={ styles.payment_main}>
                <div className={styles.payment_top}>
                    <button  className={ styles.payment_button}>총 결제금액은 어쩌구얼마얼마</button>
                </div>
            </div>

            <div className={ styles.main_reservation}>
                <p style={{ fontSize : '23px', margin: '10px' }}>예약하기</p>
                <div className={ styles._}></div>
                <div className={ styles.information }>
                    <p style={{ fontSize:'20px' , padding : '10px 0 10px 10px' }}>예약자 정보</p>

                    <div className={ styles.reserv_information}>
                        <div className={ styles.name_start }>
                        <label for='name'>예약자 이름</label>
                            <input placeholder='이름을 입력해주세요.' name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        <label>성별</label>
                            <select className={ styles.gender_select } value={gender} onChange={(e)=>setGender(e.target.value)}>
                                <option value='M'>남</option>
                                <option value='F'>여</option>
                            </select>       
                        </div>
                        <div className={ styles.name_start }>
                        <div className={styles.row_div}>                        
                                <label for='year'>태어난 년도</label>
                                <input placeholder='년도 입력 (ex 1995)' name='year' value={year} onChange={(e)=>setYear(e.target.value)}/>
                            <div className={styles.row_day}>
                            <label style={{ marginLeft: '10px' }}>월</label>
                                <select className={ styles.select_month_day } 
                                    value={month} onChange={(e)=>setMonth(e.target.value)}>
                                    <option value='01'>01</option>
                                    <option value='02'>02</option>
                                    <option value='03'>03</option>
                                    <option value='04'>04</option>
                                    <option value='05'>05</option>
                                    <option value='06'>06</option>
                                    <option value='07'>07</option>
                                    <option value='08'>08</option>
                                    <option value='09'>09</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                </select>
                            <label>일</label>
                                <select className={ styles.select_month_day }
                                    value={date} onChange={(e)=>setDate(e.target.value)}>
                                    <option value='01'>01</option>
                                    <option value='02'>02</option>
                                    <option value='03'>03</option>
                                    <option value='04'>04</option>
                                    <option value='05'>05</option>
                                    <option value='06'>06</option>
                                    <option value='07'>07</option>
                                    <option value='08'>08</option>
                                    <option value='09'>09</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                    <option value='13'>13</option>
                                    <option value='14'>14</option>
                                    <option value='15'>15</option>
                                    <option value='16'>16</option>
                                    <option value='17'>17</option>
                                    <option value='18'>18</option>
                                    <option value='19'>19</option>
                                    <option value='20'>20</option>
                                    <option value='21'>21</option>
                                    <option value='22'>22</option>
                                    <option value='23'>23</option>
                                    <option value='24'>24</option>
                                    <option value='25'>25</option>
                                    <option value='26'>26</option>
                                    <option value='27'>27</option>
                                    <option value='28'>28</option>
                                    {!(['02'].includes(month) && parseInt(year)%4 !== 0) && <option value='29'>29</option>}
                                    {!['02'].includes(month) && <option value='30'>30</option>}
                                    {!['02', '04', '06', '09', '11'].includes(month) && <option value='31'>31</option>}
                                </select>
                            </div>
                        </div>
                        </div>
                        <div>

                            <div className={ styles.name_start } >
                            <label>국가</label>
                                <select className={ styles.country }
                                    value={telCode} onChange={(e)=>setTelCode(e.target.value)}>
                                    <option value='82' >+82 한국</option>
                                    <option value='30'>+30 그리스</option>
                                    <option value='31'>+31 네덜란드</option>
                                    <option value='47'>+47 노르웨이</option>
                                    <option value='64'>+64 뉴질랜드</option>
                                    <option value='886'>+886 대만</option>
                                    <option value='45'>+45 덴마크</option>
                                    <option value='49'>+49 독일</option>
                                    <option value='856'>+856 라오스</option>
                                    <option value='371'>+371 라트비아</option>
                                    <option value='7'>+7 러시아</option>
                                    <option value='961'>+961 레바논</option>
                                    <option value='40'>+40 루마니아</option>
                                    <option value='352'>+352 룩셈부르크</option>
                                    <option value='370'>+370 리투아니아</option>
                                    <option value='853'>+853 마카오</option>
                                    <option value='389'>+389 마케도니아</option>
                                    <option value='60'>+60 말레이시아</option>
                                    <option value='356'>+356 몰타</option>
                                    <option value='976'>+976 몽골</option>
                                    <option value='1'>+1 미국</option>
                                    <option value='95'>+95 미얀마</option>
                                    <option value='973'>+973 바레인</option>
                                    <option value='880'>+880 방글라데시</option>
                                    <option value='84'>+84 베트남</option>
                                    <option value='32'>+32 벨기에</option>
                                    <option value='375'>+375 벨라투스</option>
                                </select>
                                <label>휴대전화 번호</label>
                                    <input className={ styles.phone } placeholder='하이픈(-)을 빼고 입력해주세요.' 
                                        value={tel} onChange={(e)=>setTel(e.target.value)}/>
                            </div>
                            <div  className={ styles.name_start }>
                                <label>이메일</label>
                                    <input placeholder='이메일 주소를 입력해주세요.' style={{width:'80%',height:'45px'}}
                                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                        </div>

                        <div className={ styles._}></div>
                        </div>

                        <div  className={ styles.name_start }>
                            <textarea placeholder='요청사항을 입력해주세요.' 
                                value={wish} onChange={(e)=>setWish(e.target.value)}/>
                        </div>
                        <div className={ styles.payment_bottom}>
                            <button className={ styles.payment_button}>총 결제금액은 어쩌구얼마얼마</button>
                        </div>
                    <br/>
                </div>
            </div>
            <div style={{clear:'both'}}/>
        </div>   
    );
};

export default PackgeReservation;