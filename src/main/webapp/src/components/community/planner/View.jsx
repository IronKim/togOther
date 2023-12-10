import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlannerView, deletePlanner } from '../../../api/PlannerApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';
import { getUserByEmail } from '../../../api/UserApiService';
import { GoogleMap,Marker } from '@react-google-maps/api';
import { useUserStore } from '../../../stores/mainStore';
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import sweet from 'sweetalert2';

import styles from '../../../css/plannerView.module.css'
import plannerImg from '../../../assets/image/planner.png'
import profileImg from '../../../assets/image/profile_thumb.png'
import backBut from '../../../assets/image/backBut.png'
import WhatDay from './WhatDay';
import Modal from './Modal';
import ImgModal from './ImgModal';
import ProfileView from '../../ProfileView/ProfileView';

const containerStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    zIndex: 0
};

const onErrorImg = (e) => {
    e.target.src = profileImg;
}

// const myStyles = [
//     {
//       featureType: "poi",
//       elementType: "labels",
//       stylers: [{ visibility: "off" }],
//     },
//   ];

const View = ({seqAd}) => {
    const {user} = useUserStore();

    const [modalShow1, setModalShow1] = useState(false);
    const [modal,setModal] = useState({sw: -1 ,seq: -1})
    const [add, setAdd] = useState(false)
    const [img, setImg] = useState(false)
    const [link,setLink] = useState('')
    const [mouse,setMouse] = useState({x:0,y:0})

    const navigate = useNavigate()

    const onImg = (e,li) => {
        setAdd(false)
        setImg(true)
        setLink(li)
        setMouse({ x: e.clientX, y: e.clientY })
    }
    const onClose = () => {
        setAdd(false)
        setImg(false)
    }
//구글맵 오류방지
const [scriptLoaded, setScriptLoaded] = useState(false);

useEffect(() => {
  if (window.google) {
    setScriptLoaded(true);
  } else {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBI72p-8y2lH1GriF1k73301yRI4tvOkEo&callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      setScriptLoaded(true);
    };
  }
}, []);
//지도
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMap({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('못가져와:', error);
            }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
        const listSec = document.getElementById('listSection')

        listSec.addEventListener('scroll', handleScroll);

        return () => {
            listSec.removeEventListener('scroll', handleScroll);
        };
    }, []);
////////////////
    const [subHover,setSubHover] = useState(-1)
    const onAdd = (sw,seq,subSeq) => {
        if(subSeq === subHover) {
            setAdd(true)
            setImg(false)
            setModal({sw,seq})
        }
    }

    const onMouseOn = (seq) => {
        const xy = subItem.find(item => item.subSeq === seq)

        let lats = 0;
        let lngs = 0;

        if(xy.placeSw === 0 && place.find(pl => pl.placeSeq === xy.placeSeq)) {
            lats = place.find(item => item.placeSeq === xy.placeSeq ).latitude
            lngs = place.find(item => item.placeSeq === xy.placeSeq ).longitude
        }
        if(xy.placeSw === 1 && custom.find(cus => cus.plCustomSeq === xy.plCustomSeq)) {
            lats = custom.find(item => item.plCustomSeq === xy.plCustomSeq).latitude
            lngs = custom.find(item => item.plCustomSeq === xy.plCustomSeq).longitude
        }

        setMap({ lat: lats, lng: lngs });

        setSubHover(seq)
    }
//////////////스크롤 매커니즘////////////////
const handleScroll = () => {
    const sub = document.querySelectorAll('.scrolls');

    sub.forEach(item => {
        const sc = item.getBoundingClientRect().top;
        if(250 < sc && sc < 600) {
            onMouseOn(parseInt(item.id))
        }
    });
};
////////////////////////////////////////////
    const onMouseOff = () => {
        setSubHover(-1)
    }

    const { plannerSeq } = useParams();
    const [planner,setPlanner] = useState()
    const [userDTO,setUserDTO] = useState();
    const [plannerImage,setPlannerImage] = useState([])
    const [plannerText,setPlannerText] = useState([])
    const [subItem,setSubItem] = useState([])
   
    const [place,setPlace] = useState([])
    const [custom,setCustom] = useState([])

    ////////////////몇일차 구하기
    const [whatDay,setWhatDay] = useState([]) 

    useEffect(()=>{
        if(planner) {
            const dateStart = new Date(planner.startDate)
            const dateEnd = new Date(planner.endDate)
            const ar = [];
            for(let i = 0;i <= (dateEnd - dateStart)/(1000 * 60 * 60 * 24);i++) {
                ar.push(i+1)
            }
            setWhatDay(ar)
        }
    },[planner])
    ////////////////날짜 구하기
    const getToday = (wDay) => {
        const date = new Date(planner.startDate)
        date.setDate(date.getDate() + wDay - 1);

        const week = date.getDay();
        const day = date.getDate();
        const month = date.getMonth()+1;

        return `${month}월 ${day}일 (${week===0 ? '일' : week===1 ? '월' : week===2 ? '화' : week===3 ? '수' :
        week===4 ? '목' : week===5 ? '금' : week===6 ? '토' : ''})`;
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
    //***************************

    useEffect(()=>{
        const listSec = document.getElementById('listSection')
        
        listSec.addEventListener('scroll', handleScroll);
    
        return () => {
            listSec.removeEventListener('scroll', handleScroll);
        };
    },[planner,subItem,custom])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getPlannerView(seqAd === undefined ? plannerSeq : seqAd);
            const us = await getUserByEmail(res.data.planner.useremail)
            setUserDTO(us.data)
            setPlanner(res.data.planner);
            setPlannerImage(res.data.plannerImage);
            setPlannerText(res.data.plannerText);
            setSubItem(res.data.subItem);
      
            if(res.data.planner.publicPlan === 1) {
                if(res.data.planner.userSeq !== user.userSeq && user.authority !== 'ROLE_ADMIN') {
                    window.scrollTo(0, 0);
                    navigate(`/community`)
                    sweet.fire({
                        title: "접근 권한이 없습니다",
                        icon: "warning"
                    })
                }
            }

            let placeDTO = [];
            let customDTO = [];
      
            await Promise.all(
              res.data.subItem.map(async (item) => {
                if (item.placeSw === 0) {
                  const res2 = await getPlace(item.placeSeq);
                  placeDTO.push(res2.data);
                }
                if (item.placeSw === 1) {
                  const res2 = await getCustomPlace(item.plCustomSeq);
                  customDTO.push(res2.data);
                }
              })
            );
      
            setPlace(placeDTO);
            setCustom(customDTO);
          } catch (error) {
            console.error("Error during data fetching:", error);
          }
        };
      
        fetchData();
      }, []);

      const back = () => {
          window.scrollTo(0, 0);
          navigate(-1);
      }

      const deletePlan = () => {
        sweet.fire({
            title: "정말 삭제하시겠습니까?",
            text: "동행은 그대로 유지됩니다",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요"
        }).then((result) => {
            if (result.isConfirmed) {
                deletePlanner(planner.plannerSeq)
                .then(res => {
                    window.scrollTo(0, 0);
                    sweet.fire({
                        title: "삭제되었습니다",
                        icon: "success"
                    }).then(
                        navigate(`/community`)
                    )
                })
            } 
        });
        }

        const updatePlan = () => {
            window.scrollTo(0, 0);
            navigate(`/community/planner/update/${plannerSeq}`)
        }
    return (
        <div className={styles.main}>
            {
                add && <Modal onClose={onClose} modal={modal} custom={custom} GoogleMap={GoogleMap} Marker={Marker} />
            }
            {
                img && <ImgModal onClose={onClose} link={link} mouse={mouse}/>
            }
            <div className={styles.topButtons}>
                {seqAd === undefined && <img src={backBut} onClick={() => back()}/>}
                {planner && planner.userSeq === user.userSeq && <span>
                    <button style={{backgroundColor:'tomato'}} onClick={()=>deletePlan()}>삭제</button>
                    <button onClick={()=>updatePlan()}>수정</button>
                </span>}
            </div>
            <div style={{clear:'both'}}/>
            <div className={styles.title}>{planner && planner.title}</div>
            {planner && 
            <div className={styles.userProfile} onClick={() => setModalShow1(true)}>
                <img src={planner.userProfileImage && planner.userProfileImage !== '' ? planner.userProfileImage : profileImg} onError={onErrorImg}></img>
                <div className={styles.profiles}>
                    <div className={styles.proTop}>
                        {userDTO.certification === 0 ? <FaUserTimes style={{color: 'red'}} />  : 
                        <FaUserCheck style={{color: 'blue'}} />}&nbsp;{userDTO.name}
                    </div>
                    <div className={styles.proBot}>
                        {userDTO.gender === 'M' ? '남성' : '여성'} | {getAge(userDTO.birthday)} | {userDTO.national}
                    </div>
                </div>
            </div>
            }
            <div style={{clear:'left'}}/>
            <div className={styles.timeDate}>
                {planner && 
                <div> <img src={plannerImg}/>&nbsp;&nbsp;{planner.startDate.split('-')[1]}/
                {planner.startDate.split('-')[2]}&nbsp;&nbsp;-&nbsp;&nbsp;
                    {planner.endDate.split('-')[1]}/{planner.endDate.split('-')[2]}
                </div> }
            </div>
                
            <section className={styles.mapSection}>
                {scriptLoaded &&
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={map && {
                    lat: parseFloat(map.lat),
                    lng: parseFloat(map.lng)
                    }}
                    zoom={13}
                    options={{ disableDefaultUI: true}}
                >
                {
                    subItem.map(item => <Marker
                        key={item.subSeq} // 적절한 고유한 키를 사용해야 합니다.
                        position={{
                        lat: item.placeSw === 0
                            ? place.find(pl => pl.placeSeq === item.placeSeq) &&
                                parseFloat(place.find(pl => pl.placeSeq === item.placeSeq).latitude)
                            : custom.find(cus => cus.plCustomSeq === item.plCustomSeq) &&
                                parseFloat(custom.find(cus => cus.plCustomSeq === item.plCustomSeq).latitude),
                        lng: item.placeSw === 0
                            ? place.find(pl => pl.placeSeq === item.placeSeq) &&
                                parseFloat(place.find(pl => pl.placeSeq === item.placeSeq).longitude)

                            : custom.find(cus => cus.plCustomSeq === item.plCustomSeq) &&
                                parseFloat(custom.find(cus => cus.plCustomSeq === item.plCustomSeq).longitude)
                        }}
                    />)
                }{
                    <Marker
                    position={ map && {
                    lat: parseFloat(map.lat),
                    lng: parseFloat(map.lng)
                    }}
                />
                }
                </GoogleMap>
            }
            </section>
            <section className={styles.listSection} id='listSection'>
                    {
                        whatDay.map(item => 
                            <WhatDay key={item} getToday={getToday} nDay={item} 
                                plannerImage={plannerImage.find(plImg => plImg.nday === item)
                                    && plannerImage.find(plImg => plImg.nday === item).image.split(',')}
                                plannerText={plannerText.filter(plTxt => plTxt.nday === item)}
                                subItem={subItem.filter(sub => sub.nday === item)}
                                place={place} custom={custom}
                                onMouseOn={onMouseOn} onMouseOff={onMouseOff} subHover={subHover}
                                onAdd={onAdd} setModal={setModal} onImg={onImg}
                            />
                        )
                    }
            </section>
            {planner && <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={planner.userSeq}/> }
        </div>
    );
};

export default View;