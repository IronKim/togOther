import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Style from '../../../css/togetherView.module.css'
import loadingImg from '../../../assets/image/loading.png'

import { getTogetherSeq } from '../../../api/TogetherApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';
import { getCityList } from '../../../api/CityApiService';

import { GoogleMap,Marker } from '@react-google-maps/api';
// import { useUserStore } from '../../../stores/mainStore';

const containerStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    position: 'relative'
  };
  
  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

const TogetherView = () => {
    // const { user } = useUserStore();
    const { togetherSeq } = useParams()
    const [custom,setCustom] = useState([])
    const [place, setPlace] = useState([])
    const [loading, setLoading] = useState(true);

    //시티 소환
    const [city, setCity] = useState([])
    const [cityFind, setCityFind] = useState([])
    useEffect(()=> {
        getCityList()
        .then(res => {
            setCity(res.data)
        })
        .catch(e => console.log(e))
    },[])
    
    //투게더랑 서브 소환
    const [togetherDTO, setTogetherDTO] = useState([])
    const [subDTO, setSubDTO] = useState([])
    useEffect(()=> {
        getTogetherSeq(togetherSeq)
        .then(res => {
            setTogetherDTO(res.data.together)
            setSubDTO(res.data.subItem)
            

            let placeDTO = []
            let customDTO = [] 
            res.data.subItem.map(item => {
                if (item.placeSw === 0) {
                    placeDTO.push(getPlace(item.placeSeq));
                }
                if (item.placeSw === 1) {
                    customDTO.push(getCustomPlace(item.plCustomSeq));
                }
            })

            Promise.all(placeDTO)
                .then(responses => {
                    const placeData = responses.map(res => res.data)
                    setPlace(placeData)

                    if (placeData.length > 0) {
                        const citySeq = placeData[0].citySeq;

                        // 도시를 찾기 전에 도시 배열이 설정되었는지 확인
                        if (city.length > 0) {
                            const foundCity = city.find(item => item.citySeq === citySeq);
                            
                            if (foundCity) {
                                setCityFind(foundCity.cityName)
                                console.log(cityFind)
                                setLoading(false)
                            }
                        }
                    }
                })
                .catch(e => console.error( e))
                setLoading(false)
            Promise.all(customDTO)
                .then(responses => setCustom(responses.map(res => res.data)))
                .catch(e => console.error( e))
        })
    },[togetherSeq, city])

    //sub를 nday를 기준으로 정렬
    const sortedSubDTO = [...subDTO].sort((a, b) => a.nday - b.nday)

    //버튼누르면 nday받아와
    const [array, setArray] = useState(null)//sub배열
    const [clickLat, setClickLat] = useState(null)
    const [clickLng, setClickLng] = useState(null)
    const [clickAdress, setClickAdress] = useState(null)

    const ndayIndex = (index) => {
        setArray(index)
    }
    useEffect(() => {
        sortedSubDTO.forEach(item => {
            if (array !== null && item.placeSw === 0) {
                const placeL = place.find(p => sortedSubDTO[array].placeSeq === p.placeSeq)
                if(placeL){
                    setClickLat(placeL.latitude)
                    setClickLng(placeL.longitude)
                    setClickAdress(placeL.address)
                }
            }
            if (array !== null && item.placeSw === 1) {
                const customL = custom.find(c=> sortedSubDTO[array].plCustomSeq === c.plCustomSeq)
                if(customL){
                    setClickLat(customL.latitude)
                    setClickLng(customL.longitude)
                    setClickAdress(customL.address)
                }
            }
        })

    }, [array, custom]);

    
    

    return (
        <div className={Style.viewForm}>
            <div className={Style.viewInner}>
                {/* 상단지도/사진 */}
                <div className={Style.innerTop}>
                    
                    {custom !== null && custom.length > 0 && 
                        (<GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                        lat: parseFloat(custom[0].latitude),
                        lng: parseFloat(custom[0].longitude)}}
                        zoom={15}
                        options={{ disableDefaultUI: true, styles: myStyles }}>
                        <Marker
                            position={{
                            lat: parseFloat(custom[0].latitude),
                            lng: parseFloat(custom[0].longitude)}}
                        />
                        </GoogleMap>)
                    }
                    {place !== null && place.length > 0 && 
                        (<GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                        lat: parseFloat(place[0].latitude),
                        lng: parseFloat(place[0].longitude)}}
                        zoom={15}
                        options={{ disableDefaultUI: true, styles: myStyles }}>
                        <Marker
                            position={{
                            lat: parseFloat(place[0].latitude),
                            lng: parseFloat(place[0].longitude)}}
                        />
                        </GoogleMap>)
                    }
                </div>
                <div className={Style.midTitle}>{togetherDTO.title}</div>
                {
                place !== null && place.length > 0 ?
                    <div className={Style.midSc}>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>지역</span> &nbsp; {cityFind}</div>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>모집인원</span> &nbsp; {togetherDTO.tnum}</div>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>날짜</span> &nbsp; {togetherDTO.startDate}~{togetherDTO.endDate}</div>
                    </div>
                    :
                    custom.length > 0 &&
                    <div className={Style.midSc}>
                        <div className={Style.midScTdiv}><div className={Style.midScText}>지역</div> &nbsp; {custom[0].placeName}</div>
                        <div className={Style.midScTdiv}><div className={Style.midScText}>모집인원</div> &nbsp; {togetherDTO.tnum}</div>
                        <div className={Style.midScTdiv}><div className={Style.midScText}>날짜</div> &nbsp; {togetherDTO.startDate}~{togetherDTO.endDate}</div>
                    </div>
                } 
                <div className={Style.contextDiv}>
                    <div  className={Style.contextR}>
                        <div className={Style.midContext}>{togetherDTO.context}</div>
                        {/* 동행리스트 카드 */}
                        <div className={Style.togetherList}>
                            <div className={Style.togetherMap}>
                                <div className={Style.togetherListUser}>유저정보</div>
                                {clickLat === null && place !== null && place.length > 0 &&
                                (<GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={{
                                    lat: parseFloat(place[0].latitude),
                                    lng: parseFloat(place[0].longitude)}}
                                    zoom={15}
                                    options={{ disableDefaultUI: true, styles: myStyles }}>
                                    <Marker
                                        position={{
                                        lat: parseFloat(place[0].latitude),
                                        lng: parseFloat(place[0].longitude)}}
                                    />
                                    </GoogleMap>)}
                                
                                {clickLat === null && custom !== null && custom.length > 0 && 
                                (<GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={{
                                    lat: parseFloat(custom[0].latitude),
                                    lng: parseFloat(custom[0].longitude)}}
                                    zoom={15}
                                    options={{ disableDefaultUI: true, styles: myStyles }}>
                                    <Marker
                                        position={{
                                        lat: parseFloat(custom[0].latitude),
                                        lng: parseFloat(custom[0].longitude)}}
                                    />
                                </GoogleMap>)}
                                
                                {clickLat !== null && 
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={{
                                        lat: parseFloat(clickLat),
                                        lng: parseFloat(clickLng)}}
                                        zoom={15}
                                        options={{ disableDefaultUI: true, styles: myStyles }}>
                                        <Marker
                                        position={{
                                        lat: parseFloat(clickLat),
                                        lng: parseFloat(clickLng)}}
                                    />
                                    </GoogleMap>}
                            </div>

                            <div className={Style.togetherSchedule}>
                                {sortedSubDTO.map((item,index) => (
                                    <button className={
                                        `${Style.subDay} ${array === index ? 
                                                                    Style.selecDay 
                                                                    :
                                                                    ''}`}
                                    onClick={()=>ndayIndex(index)}>
                                        DAY {item.nday}
                                    </button>
                                ))}
                                {clickAdress !== null && array !== null &&
                                <div className={Style.scheduleContext}>
                                    <p>{clickAdress}</p>
                                    <br/>
                                    <p>{sortedSubDTO[array].context}</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                    {/* 오른쪽 정보 */}
                    <div className={Style.togetherChatDiv}>

                            <div className={Style.togetherChatInner}>
                                <div className={Style.chatProfile}>
                                    <div className={Style.chatProfileImg}></div>
                                    <div className={Style.inin}>
                                        <div className={Style.chatProfileName}>이름</div>
                                        <div className={Style.chatProfileInfo}>성별.국적</div>
                                    </div>
                                    <div className={Style.chatText}>프로필 사진을 클릭해보세요!</div>
                                </div>
                                    <div className={Style.hrhr}></div>
                            </div>
                            
                            <div className={Style.togetherChatInner2}>
                                <div className={Style.chatGoDiv}>
                                    <button className={Style.chatGo}>채팅하기</button>
                                </div>
                            </div>
                        <div className={Style.togetherTo}>
                            <p>함께하는 동행</p>
                            <div className={Style.toGother}>
                                <div className={Style.toGotherImg}></div> 
                                <div className={Style.toGotherInfo}>
                                    <span>이름</span>|<span>성별</span>|<span>국적</span></div>
                            </div>
                        </div>
                        {/* {togetherSeq}
                        {togetherDTO.title}
                        {subDTO.map(item => (
                            <div>{item.context}{item.plCustomSeq}</div>
                        ))} 
                        
                        {custom.map(item => (
                            <div>//{item.placeName}</div>
                        ))}  */}

                            {/* <button onClick={()=> console.log(user)}></button> */}
                    </div>
                </div>


                
            </div>
            <div style={{clear:'both'}}/>
        </div>
    );
};

export default TogetherView;