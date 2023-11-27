import React from 'react';
import styles from '../../css/PackagePage.module.css';

const PackgeReservation = () => {
    return (
        <div className={ styles.main_page }>
            <div className={ styles.payment_main }>
                <div className={ styles.payment_div }>
                    <p style={{  fontSize : '23px', margin : '10px'}}>결제하기</p>
                </div>
                <div className={styles.left_div}>
                    <div className={ styles.div_img }>
                        <img sytle={{ width : '80px', heght : '80px' }} />
                        <p>어쩌구저쩌구 로마가 웅앵웅</p>
                        <span>대충 11월 27일 출발 / 옵션 0개</span>
                    </div>

                        <div className={ styles.select_info }>
                            <p>선택된 상품</p>
                            <p>기본 구성 상품</p>
                                <div className={ styles.select_ab }>
                                    <div className={ styles.select_a }><p>총 대충 100,000원</p></div>
                                    <div className={ styles.select_b }><p>총 ?개</p></div>
                                </div>
                        </div>
                    </div>
                        <div className={ styles.payment }>
                        <h5>결제 방식 필수</h5>
                            <div><button className={ styles.card }>신용/체크카드 결제</button></div>

                            <div className={ styles.payment_how }>
                                <button><img src />카카오페이</button>
                                <button><img src />네이버페이</button>
                                <button><img src />삼성페이</button>
                            </div>
                            <div className={ styles.payment_end }><button>총 어쩌구얼마어마 결제하기</button></div>
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
                            <input placeholder='이름을 입력해주세요.' name='name' />
                        <label>성별</label>
                            <select className={ styles.gender_select }>
                                <option value>성별</option>
                                <option value='W'>여</option>
                                <option value='M' selected>남</option>
                            </select>       
                        </div>
                        

                        <div className={ styles.name_start }>
                        <div className={styles.row_div}>                        
                                <label for='year'>태어난 년도</label>
                                <input placeholder='년도를 4자리로 입력해주세요.(ex 1995)' name='year' />
                            <div className={styles.row_day}>
                            <label style={{ marginLeft: '10px' }}>월</label>
                                <select className={ styles.select_month_day }>
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
                                <select className={ styles.select_month_day }>
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
                                    <option value='29'>29</option>
                                    <option value='30'>30</option>
                                    <option value='31'>31</option>
                                </select>
                            </div>
                        </div>
                        </div>
                        <div>

                            <div className={ styles.name_start }>
                            <label>국가</label>
                                <select className={ styles.country }>
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
                                    <input className={ styles.phone }placeholder='하이픈(-)을 빼고 입력해주세요.' />
                            </div>
                            <div  className={ styles.name_start }>
                                <label>이메일</label>
                                    <input placeholder='이메일 주소를 입력해주세요.' style={{width:'80%'}}/>
                            </div>
                        </div>

                        <div className={ styles._}></div>
                        </div>

                        <div  className={ styles.name_start }>
                            <textarea placeholder='요청사항을 입력해주세요.' />
                        </div>
                        <div className={ styles.payment_real_end}>
                            <button>총 결제금액은 어쩌구얼마얼마</button>
                        </div>
                    <br/>
                </div>
            </div>
            <div style={{clear:'both'}}/>
        </div>   
    );
};

export default PackgeReservation;