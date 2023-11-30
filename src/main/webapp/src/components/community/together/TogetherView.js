import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import Style from '../../../css/togetherView.module.css'
import loadingImg from '../../../assets/image/loading.png'
import userDefaultProfile from '../../../assets/image/userDefaultProfile.png'
import TogetherWriteForm from './TogetherWriteForm';

import { getTogetherSeq,deleteTogether } from '../../../api/TogetherApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';
import { getCityList } from '../../../api/CityApiService';

import { GoogleMap,Marker } from '@react-google-maps/api';
import { getUserByEmail } from '../../../api/UserApiService';
import { useUserStore } from '../../../stores/mainStore';

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

const TogetherView = ({seqAd}) => {
    const { user } = useUserStore();
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
        getTogetherSeq(seqAd === undefined ? togetherSeq : seqAd)
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

    //유저 소환
    const [userList, setUserList] = useState([])
    useEffect(() => {
        getUserByEmail(togetherDTO.useremail)
            .then(res => {
                setUserList(res.data)
            })
            .catch(e => console.log(e))
        },[togetherDTO.useremail])

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

    const navigate = useNavigate()

    const onChange = (togetherDTO,subDTO,custom,place) => {
        
            navigate('/community/together/write', { state: { togetherDTO,subDTO,custom,place} })
        
    }
    
    const goDelete = async  () => {
        const gogo = window.confirm("동행을 삭제하시겠습니까?")
        
        if (gogo) {
            try {
                await deleteTogether(togetherSeq)
                alert("삭제가 완료되었습니다")
                navigate('/community/')
            } catch (error) {
                console.error("동행 삭제 중 오류:", error)
            }
        }
    }

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
                <div className={Style.midTitle}>
                    {togetherDTO.title}
                </div>
                {togetherDTO.userSeq === user.userSeq &&
                    <div>
                         {/* onClick={()=>onDelete(togetherDTO)} */}
                        <button className={Style.listDelete} onClick={()=>goDelete()}>삭 제</button>
                        <button className={Style.listChange} onClick={()=>onChange(togetherDTO,subDTO,custom,place)}>수 정</button>
                    </div>
                }
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
                        <div className={Style.midScTdiv}><span className={Style.midScText}>지역</span> &nbsp; {custom[0].placeName}</div>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>모집인원</span> &nbsp; {togetherDTO.tnum}</div>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>날짜</span> &nbsp; {togetherDTO.startDate}~{togetherDTO.endDate}</div>
                    </div>
                } 
                <div className={Style.contextDiv}>
                    <div  className={Style.contextR}>
                        <div className={Style.midContext}>{togetherDTO.context}</div>
                        {/* 동행리스트 카드 */}
                        <div className={Style.togetherList}>
                            <div className={Style.togetherMap}>
                                <div className={Style.togetherListUser}>
                                   {togetherDTO.userid}님의 동행 일정
                                </div>
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
                                    {userList.profileImage !== ''  ?
                                        <div className={Style.chatProfileImg}>
                                            <img src={userList.profileImage} className={Style.userImg} />
                                        </div>
                                        :
                                        <div className={Style.chatProfileImg}>
                                            <img src={userDefaultProfile} className={Style.userImg} />
                                        </div>
                                    }
                                    
                                    <div className={Style.inin}>
                                        <div className={Style.chatProfileName}>{togetherDTO.userid}</div>
                                        <div className={Style.chatProfileInfo}>{togetherDTO.userGender === 'M' ? '남자' : '여자'}</div>
                                    </div>
                                    {userList.likingFood && userList.likingTrip &&
                                    <div className={Style.chatText}>
                                        <p><span>{userList.likingFood}</span>의 음식 취향을 가진</p>
                                        <p><span>{userList.likingTrip}</span>를 좋아하는 여행자예요</p>
                                    </div>}
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
                                <div className={Style.toGotherMaster}>
                                    {togetherDTO.userProfileImage !== ''  ?
                                        <div className={Style.toGotherImg}>
                                            <img src={userList.profileImage} className={Style.userImg} />
                                        </div>
                                        :
                                        <div className={Style.toGotherImg}>
                                            <img src={userDefaultProfile} className={Style.userImg}/>
                                        </div>
                                    }
                                    <div className={Style.toGotherInfo}>
                                        <span>{userList.id}</span>|<span>{userList.gender === 'M' ? '남자' : '여자'}</span>
                                    </div>
                                </div>
                                <div className={Style.togotherList}>
                                    <div className={Style.togetherListOne}>동행을 신청해보세요.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>               
                
            </div>
            <div style={{clear:'both'}}/>
        </div>
    );
};

export default TogetherView;