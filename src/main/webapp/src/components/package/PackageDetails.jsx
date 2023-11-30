import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import moment, { months } from 'moment';
import styles from '../../css/PackagePage.module.css';
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css';
import '../../calendar.css';
import { useQuery } from 'react-query';
import minus from '../../assets/image/minus.png';
import plus from '../../assets/image/plus.png';
import { getTourPackageByTpSeq } from '../../api/PackageApiService';
import { useParams } from 'react-router-dom';


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

    const [pack, setPack] = useState({});

    const {tpSeq} = useParams()

    const [images, setImages] = useState([])

    useEffect(() => {
        console.log(tpSeq);

        getTourPackageByTpSeq(tpSeq)
        .then(res => {
            console.log(res.data)
            // console.log(imagesArray)
            // // 여기서 tpImages를 배열로 가져와서 setImages를 통해 상태 업데이트
            // const imagesArray = [res.data.tpImages]; // tpImages가 없을 경우 빈 배열로 초기화
            // setImages(imagesArray);
            setPack(res.data)
        })
        .catch(e => console.log(e));
    },[tpSeq])

    useEffect(() => {
        console.log(tpSeq);

        getTourPackageByTpSeq(tpSeq)
        .then(res => {
            console.log(imagesArray)
            // 여기서 tpImages를 배열로 가져와서 setImages를 통해 상태 업데이트
            const imagesArray = [res.data.tpImages]; // tpImages가 없을 경우 빈 배열로 초기화
            setImages(imagesArray);

        })
        .catch(e => console.log(e));
    },[tpSeq])


    // const { data } = useQuery(
    //   ['logDate', months],
    //   async () => {
    //     const result = await axios.get(
    //       `/api/healthLogs?health_log_type=DIET`
    //     );
    //     console.log(result.data)
    //     return result.data;
    //   },

    //   {
    //     onSuccess: (data: any) => {
    //       setMark(data);
    //     },
    //   }
    // );

    return (
        <div className={ styles.package_main }>

            <div>    
                <img className={ styles.Thumbnail } src={pack.tpThumbnail} /> 
            </div>

            <p className={styles.package_title}>{pack.tpTitle}</p>
            <p style={{textAlign:'right', fontSize:'30px'}}>{pack.tpPrice}원</p>
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
                                    <div className={ styles.price }><p>{pack.tpPrice}원</p>
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
                    <section className={styles.prTag}></section>
                    {
                    images.map((image, index) => (
                        <img key={index} className={styles.context} src={image}/>
                    ))}
                </div>
            </div>
        </div>  
    );
};

export default PackageDetails;