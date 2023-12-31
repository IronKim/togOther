import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import Style from '../../../css/togetherView.module.css'
import userDefaultProfile from '../../../assets/image/userDefaultProfile.png'
import backBut from '../../../assets/image/backBut.png'

import { getTogetherSeq,deleteTogether,addSubscript,getChatSeq,getAllSubscript,deleteRoom } from '../../../api/TogetherApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';
import { getCityList } from '../../../api/CityApiService';
import { getUser } from '../../../api/AdvisorApiService';

import { GoogleMap,Marker } from '@react-google-maps/api';
import { getUserByEmail } from '../../../api/UserApiService';
import { useUserStore } from '../../../stores/mainStore';
import sweet from 'sweetalert2'; 
import ProfileView from '../../ProfileView/ProfileView';

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

const TogetherView = ({seqAd,open,onOpen}) => {
    const { user } = useUserStore();
    const { togetherSeq } = useParams()
    const [custom,setCustom] = useState([])
    const [place, setPlace] = useState([])
    const [subscripts, setSubscripts] = useState([])
    const [loading, setLoading] = useState(true);
    const [chat,setChat] = useState()
    const [users,setUsers] = useState([])
    const [modalSeq,setModalSeq] = useState(-1)

    
    //시티 소환
    const [city, setCity] = useState([])
    const [cityFind, setCityFind] = useState([])
    useEffect(()=> {
        getAllSubscript()
        .then(res => setSubscripts(res.data.filter(sub => sub.toMainSeq == togetherSeq)))

        getCityList()
        .then(res => {
            setCity(res.data)
        })
        .catch(e => console.log(e))
        getChatSeq(togetherSeq)
        .then(res => setChat(res.data))

        getUser()
        .then(res => setUsers(res.data))
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
            window.scrollTo(0, 0);
            navigate('/community/together/write', { state: { togetherDTO,subDTO,custom,place} })
        
    }
    
    const goDelete = async  () => {
        sweet.fire({
            title: "삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRoom(togetherSeq)
                deleteTogether(togetherSeq)
                .then(res => {
                    window.scrollTo(0,0)
                    sweet.fire({
                        title: "삭제되었습니다",
                        icon: "success"
                    })
                    .then(navigate('/community/'))
                })
            } 
        });
    }
    const [modalShow1, setModalShow1] = useState(false);

    const subscript = async() =>{
        const { value: text, isConfirmed } = await sweet.fire({
            title: "소개글",
            input: "textarea",
            inputPlaceholder: "소개글을 작성해보세요",
            showCancelButton: true,
            confirmButtonText: "신청",
            cancelButtonText: "취소"
        })
        if (isConfirmed) {
            const subscriptDTO = {
                chatSeq: chat.id,
                context: text,
                masterSeq: togetherDTO.userSeq,
                userSeq: user.userSeq,
                toMainSeq: togetherSeq,
                sw :0 
            }
            addSubscript(subscriptDTO)
            sweet.fire({
                title: "신청이 완료되었습니다",
                icon: "success"
            }).then(
                getAllSubscript()
                .then(res => setSubscripts(res.data.filter(sub => sub.toMainSeq == togetherSeq)))
            )
        } 
          
    }
    const getAge = (bDay) => {
        const today = new Date();
        const birthDate = new Date(bDay);
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
      
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }


        const decade = Math.floor(age / 10) * 10;
        return `${decade}대`;
    }
    const back = () => {
        window.scrollTo(0, 0);
        navigate(-1);
    }
    const onModal = (n) => {
        setModalSeq(n)
        setModalShow1(true)
    }
    return (
        <div className={Style.viewForm}>
            <div className={Style.viewInner}>
            {seqAd === undefined && <img src={backBut} className={Style.backBut} onClick={() => back()}/>}
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
                        <div className={Style.midScTdiv}><span className={Style.midScText}>정원</span> &nbsp; {togetherDTO.tnum}</div>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>날짜</span> &nbsp; {togetherDTO.startDate}~{togetherDTO.endDate}</div>
                    </div>
                    :
                    custom.length > 0 &&
                    <div className={Style.midSc}>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>지역</span> &nbsp; {custom[0].placeName}</div>
                        <div className={Style.midScTdiv}><span className={Style.midScText}>정원</span> &nbsp; {togetherDTO.tnum}</div>
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
                                    <p>{sortedSubDTO[array].startTime}시~{sortedSubDTO[array].endTime}시</p>
                                    <br/>
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
                                    {userList.profileImage !== null ?
                                        <div className={Style.chatProfileImg} onClick={() => setModalShow1(true)}>
                                            <img src={userList.profileImage} className={Style.userImg} />
                                        </div>
                                        :
                                        <div className={Style.chatProfileImg} onClick={() => setModalShow1(true)}>
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
                                {!open && user.name !== '' && togetherDTO.userSeq !== user.userSeq &&
                                    subscripts.findIndex(subs => subs.userSeq === user.userSeq) === -1 &&
                                    (chat && !chat.entrySeq.split(',').includes(user.userSeq.toString())) &&
                                    (chat && (chat.entrySeq.split(',').length + (chat.entrySeq !== '' && 1)) < togetherDTO.tnum) && 
                                    <div className={Style.chatGoDiv}>
                                        <button className={Style.chatGo} onClick={()=>subscript()}>신청하기</button>
                                    </div>
                                }
                                {
                                togetherDTO.userSeq !== user.userSeq &&
                                subscripts.findIndex(subs => subs.userSeq === user.userSeq) !== -1 &&    
                                    <div className={Style.chatGoDiv}>
                                            <button className={Style.chatGo}
                                            style={{backgroundColor:'#6c90bc'}}
                                            >수락대기중</button>
                                    </div>
                                }
                                {
                                    (chat && chat.entrySeq.split(',').includes(user.userSeq.toString())) &&
                                    <div className={Style.chatGoDiv}>
                                            <button className={Style.chatGo}
                                            style={{backgroundColor:'#6c90bc'}}
                                            >채팅참여중</button>
                                    </div>
                                }
                                {
                                    !open && chat && 
                                    (chat.entrySeq.split(',').length + (chat.entrySeq !== '' && 1)) < togetherDTO.tnum &&
                                    togetherDTO.userSeq === user.userSeq &&
                                    <div className={Style.chatGoDiv}>
                                            <button className={Style.chatGo} onClick={() => onOpen()}
                                            >채팅보기</button>
                                    </div>
                                }
                                {
                                    chat && !chat.entrySeq.split(',').includes(user.userSeq.toString()) &&
                                    chat.entrySeq !== '' && (chat.entrySeq.split(',').length + 1) >= togetherDTO.tnum &&
                                    <div className={Style.chatGoDiv}>
                                            <button className={Style.chatGo}
                                            style={{backgroundColor:'#6c90bc'}}
                                            >마감</button>
                                    </div>
                                }
                            </div>
                        <div className={Style.togetherTo}>
                            <p>함께하는 동행</p>
                            <div className={Style.toGother}>
                                <div className={Style.toGotherMaster}>
                                    {togetherDTO.userProfileImage ?
                                        <div className={Style.toGotherImg} onClick={() => onModal(togetherDTO.userSeq)}>
                                            <img src={userList.profileImage} className={Style.userImg} />
                                        </div>
                                        :
                                        <div className={Style.toGotherImg} onClick={() => onModal(togetherDTO.userSeq)}>
                                            <img src={userDefaultProfile} className={Style.userImg}/>
                                        </div>
                                    }
                                    <div className={Style.toGotherInfo}>
                                        <div>&nbsp;{userList.name}&nbsp;|&nbsp;</div>
                                        <div>{userList.gender === 'M' ? '남자' : '여자'}&nbsp;|&nbsp;</div>
                                        <div>{getAge(userList.birthday)}</div>
                                    </div>
                                </div>
                                {
                                    chat && users.filter(item => chat.entrySeq.split(',').includes(item.userSeq+'')).map(en => 
                                        <div className={Style.toGotherMaster}>
                                            {en.profileImage ?
                                                <div className={Style.toGotherImg} onClick={() => onModal(en.userSeq)}>
                                                    <img src={en.profileImage} className={Style.userImg} />
                                                </div>
                                                :
                                                <div className={Style.toGotherImg} onClick={() => onModal(en.userSeq)}>
                                                    <img src={userDefaultProfile} className={Style.userImg}/>
                                                </div>
                                            }
                                            <div className={Style.toGotherInfo}>
                                                <div>&nbsp;{en.name}&nbsp;|&nbsp;</div>
                                                <div>{en.gender === 'M' ? '남자' : '여자'}&nbsp;|&nbsp;</div>
                                                <div>{getAge(en.birthday)}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>               
                
            </div>
            <div style={{clear:'both'}}/>
            {togetherDTO && <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={modalSeq}/> }
        </div>
    );
};

export default TogetherView;