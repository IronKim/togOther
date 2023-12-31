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
import { useNavigate, useParams } from 'react-router-dom';
import backBut from '../../assets/image/backBut.png'
import { useUserStore } from '../../stores/mainStore';

const initialState = 1

const reducer = (state, action) => {
    switch(action.type) {
        case 'DECREMENT' : 
            return state > 1 ? state - 1 : state;
            
        case 'INCREMENT' : 
            return state + 1

        default : return false

    }
}

const PackageDetails = () => {

    const {user} = useUserStore();

    const [ count, dispatch ] = useReducer(reducer, initialState)

    const [selectedDate, setSelectedDate] = useState();

    const [mark, setMark] = useState([]);

    const [pack, setPack] = useState({});

    const {tpSeq} = useParams()

    const [images, setImages] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        getTourPackageByTpSeq(tpSeq)
        .then(res => {
            const imagesArray = res.data.tpImages.split(",");
            // 여기서 tpImages를 배열로 가져와서 setImages를 통해 상태 업데이트
            setImages(imagesArray);
            setPack(res.data)
            if(moment().format('YYYY-MM-DD') > res.data.tpsaleStart) {
                setSelectedDate(new Date(moment().format('YYYY-MM-DD')))
            } else {
                setSelectedDate(new Date(res.data.tpsaleStart))
            }
        })
        .catch(e => console.log(e));
    },[tpSeq])

    // 날짜 형태 변경-------------------------------------------------------------
    const StartDate = pack.tpsaleStart;
    const EndDate = pack.tpsaleEnd;

    const formatDateString = (dateString) => {
        const inputDate = new Date(dateString);
        return `${inputDate.getMonth() + 1}.${inputDate.getDate()}.${inputDate.getFullYear()}`;
    };
    
    const startformattedDate = formatDateString(StartDate);
    const endformattedDate = formatDateString(EndDate);

    // 선택한 날짜------------------------------------------------------------------
    const onChange = (date) => {
        setSelectedDate(date);
    };

    const selectformatDateStringtDate = (dateString) => {
        const SDate = new Date(dateString);
        return `${SDate.getMonth() + 1}.${SDate.getDate()}.${SDate.getFullYear()}`;
    };

    const formattedDate = selectformatDateStringtDate(StartDate);

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

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const onReservation = () => {
        navigate(`/package/reservation/${tpSeq}/${formattedDate}&${count}`)
    }

    const onLogin = () => {
        navigate(`/user/login`)
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <div className={ styles.package_main }>
            <img className={styles.backBut} src={backBut} onClick={() => back()}/>
            <div>    
                <img className={ styles.Thumbnail } src={pack.tpThumbnail} /> 
            </div>

            <p className={styles.package_title}>{pack.tpTitle}</p>
            <p className={styles.package_price}>{parseFloat(pack.tpPrice).toLocaleString()}원</p>
            <div className={ styles.details_scheduler }>
                <div className={ styles.scheduler }>
                    
                    <div className={ styles.calendar }>
                        <Calendar
                            onChange={ onChange } 
                            formatDay={(locale, date) => moment(date).format('DD')}
                            value={selectedDate}
                            minDetail="month"
                            maxDetail="month" 
                            // minDate={new Date(startformattedDate)}
                            minDate={ moment().format('YYYY-MM-DD') > pack.tpsaleStart ? moment().toDate() : new Date(startformattedDate)}
                            maxDate={new Date(endformattedDate)}
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
                        <div style={{marginBottom:'10px'}}>
                            <p style={{fontSize:'30px', color:'#2E8DFF'}}>선택한 날짜</p>
                        </div>
                        { moment(selectedDate).format('YYYY년 MM월 DD일')} 

                        <div className={ styles.y }>
                            <div className={ styles.text }>
                                <div style={{fontSize:'30px', color:'#2E8DFF',paddingTop:'10px'}}><p>총 금액</p></div>
                                <div className={ styles.price }><p>{parseFloat(pack.tpPrice * (count)).toLocaleString()}원</p>
                                    <div className={ styles.arrowdiv }>
                                        <div className={ styles.arrow }>
                                            <div>
                                                <img onClick={ () => count > 1 && dispatch({ type : 'DECREMENT' })} style={{ zIndex:'3' ,width:'20px', height : '20px', cursor: 'pointer' }} src={ minus } /></div>
                                            <div>{parseFloat(count) * 1}</div>
                                            <div><img onClick={ () => dispatch({ type : 'INCREMENT' })} style={{ width:'20px', height : '20px', cursor: 'pointer' }} src={ plus } /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={ styles.reservation } onClick={() => user.name !== '' ? onReservation() : onLogin()}>
                                    <button>{user.name !== '' ? '예약하기' : '로그인'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ styles.details } style={{ maxHeight: showMore ? 'none' : '200px' }}>
                    {
                    images.map((image, index) => (
                        <img key={index} className={styles.context} src={image}/>
                    ))}
                </div>
                <div className={styles.moreButtonDiv}>
                    <button className={styles.moreButton} onClick={toggleShowMore}>
                        {showMore ? '접기' : '더 보기'}
                    </button>
                </div>
                
            </div>
            <div style={{clear:'both'}}/>
        </div>  
    );
};

export default PackageDetails;