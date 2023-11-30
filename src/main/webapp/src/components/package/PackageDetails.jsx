import React, { useReducer, useState } from 'react';
import axios from 'axios';
import moment, { months } from 'moment';
import styles from '../../css/PackagePage.module.css';
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css';
import '../../calendar.css';
import { useQuery } from 'react-query';
import minus from '../../assets/image/minus.png';
import plus from '../../assets/image/plus.png';


const initialState = 1

const reducer = (state, action) => {
    switch(action.type) {
        case 'DECREMENT' : 
            return state - 1 
            
        case 'INCREMENT' : 
            return state + 1

        default : return false

    }
}

const PackageDetails = () => {

    const [ count, dispatch ] = useReducer(reducer, initialState)

    const [value, onChange] = useState(new Date());

    const [mark, setMark] = useState([]);

    const { data } = useQuery(
      ['logDate', months],
      async () => {
        const result = await axios.get(
          `/api/healthLogs?health_log_type=DIET`
        );
        console.log(result.data)
        return result.data;
      },

      {
        onSuccess: (data: any) => {
          setMark(data);
        },
      }
    );

    return (
        <div className={ styles.package_main }>
            <div className={ styles.tap }>
                <div><div><p>상품소개</p></div></div>
                <div><div><p>유의사항</p></div></div>
                <div><div><p>문의하기</p></div></div>
                <div><div><p>여행후기</p></div></div>
            </div>
        
            <div className={ styles.img }>    
                <img src='' />
            </div>

            <p className={styles.package_title}>[도시이름] 미라클 몽공, 홉스골 7박 8알 몽골의 알프스 홉스골 호수, 미니사막, 어쩌구까지!</p>
            <div className={ styles.details_scheduler }>
                <div className={ styles.scheduler }>
                    
                    <div className={ styles.calendar }>
                        <Calendar
                            onChange={ onChange } 
                            formatDay={(locale, date) => moment(date).format('DD')}
                            value={value}
                            minDetail="month"
                            maxDetail="month" 
                            navigationLabel={null}
                            showNeighboringMonth={false}
                            className="mx-auto w-full text-sm border-b"
                            tileContent={({ date, view }) => {
                                
                                let html = []
                                
                                if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
                                html.push(<div className="dot"></div>)
                                }
                                
                                return (

                                    <>
                                        <div className="flex justify-center items-center absoluteDiv">{ html }</div>
                                    </>

                                )
                            }}
                        />
                    </div>

                        <div className={ styles.selected_day }>
                            { moment(value).format('YYYY년 MM월 DD일')} 
                            <div className={ styles.x }>
                                <p style={{ fontSize: '15px' }}>상품 선택</p>
                            </div>

                            <div className={ styles.y }>
                                <div className={ styles.text }>
                                    <div><p>기본 구성 상품</p></div>
                                    <div><p>선택한 날짜</p></div>
                                    <div className={ styles.price }><p>대충 100,000원</p>
                                        <div className={ styles.arrow_div }>
                                            <div className={ styles.arrow }>
                                                <div><img onClick={ () => count > 1 && dispatch({ type : 'DECREMENT' })} style={{ width:'20px', height : '20px' }} src={ minus } /></div>
                                                <div>{ count }</div>
                                                <div><img onClick={ () => dispatch({ type : 'INCREMENT' })}style={{ width:'20px', height : '20px' }} src={ plus } /></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={ styles.reservation }>
                                        <button>예약하기</button>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={ styles.details }>
                    <section className={styles.prTag}>여기는 가격이랑 태그들</section>
                    <section className={styles.context}>여기는 어쩌구 상세정보</section>
                </div>
            </div>
            <div style={{clear:'both'}}/>
        </div>  
    );
};

export default PackageDetails;