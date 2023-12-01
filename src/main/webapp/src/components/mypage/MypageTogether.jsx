import React, { useEffect, useState } from 'react';
import { getMyTogether,totMyTogether,getSubItemList, getCustomList, deleteTogether } from '../../api/TogetherApiService';
import { useUserStore } from '../../stores/mainStore';
import { useNavigate } from 'react-router-dom';
import loadingImg from '../../assets/image/loading.png';

import userDefaultProfile from '../../assets/image/userDefaultProfile.png'

import { getPlaceList } from '../../api/PlaceApiService';
import { GoogleMap,Marker } from '@react-google-maps/api';

import sweet from 'sweetalert2';
import styles from '../../css/MypageTogether.module.css';


const containerStyle = {
    width: '100%',
    height: '100%',
    // margin: 'auto'
  };
  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];
  

const MypageTogether = () => {
    const { user } = useUserStore();

    const[total,setTotal] = useState(0)
    const[count,setCount] = useState(1)
    //together목록
    const [togetherDTO, setTogetherDTO] = useState([])
    const[loading,setLoading] = useState(false)
    const[last,setLast] = useState(false)
    const[scrollLoading,setScrollLoading] = useState(true)

    const navigate = useNavigate()

    //////////////스크롤 매커니즘////////////////
    const handleScroll = () => {

        const scrollY = window.scrollY;
    
        const scrollHeight = document.documentElement.scrollHeight;
    
        const windowHeight = window.innerHeight;
        if (scrollY + windowHeight + 300 >= scrollHeight) {
            if(!scrollLoading) {
            if(!last) {
                    if(count * 6 > total) setLast(true);
                    else {
                        setScrollLoading(true)
                        setCount(count + 1);
                    }
                }
            }
        }
      };
    
    ////////////////////////////////////////////
    ////////////////////////////////////////////

    useEffect(() => {
        setScrollLoading(true)
        setLast(false)

        totMyTogether({ userSeq : user.userSeq })
        .then(res2 => {
            setTotal(res2.data)
            if(res2.data === 0) setLast(true);
        })
        .catch(e => console.log(e))
    },[])

    useEffect(()=>{
        let n = 0;
        if(count * 6 > total) n = total;
        else n = count * 6;

        if(n > 0) {
            getMyTogether({ n: n, userSeq: user.userSeq})
            .then(res => {
                    setTogetherDTO(res.data)
                    setScrollLoading(false)
                }
            )
            .catch(e => console.log(e))
        } else {
            setScrollLoading(false)
            // setLast(true)
        }
////////스크롤 매커니즘
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
////////
    },[count,total,scrollLoading,last])
    ////////////////////////////////////////////


     //subItem목록
     const [subItemDTO, setSubItemDTO] = useState([])
     
     useEffect(()=> {
        getSubItemList()
         .then(res => {
            setSubItemDTO(res.data)
         })
         .catch(e => console.log(e))
     },[])

     //custom목록
     const [customDTO, setCustomDTO] = useState([])
     
     useEffect(()=> {
        getCustomList()
         .then(res => {
            setCustomDTO(res.data)
         })
         .catch(e => console.log(e))
     },[])

     //place목록 가져오기
    const[place, setPlace] = useState([])
    
    useEffect(()=>{
        getPlaceList()
        .then(res =>{
            setPlace(res.data)
            setLoading(true)
        })
        .catch(e => console.log(e))
    },[])

    
    //////////////////////////
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

    //뷰로 간다
    const onTogetherView = (togetherSeq) => {
      navigate(`../../community/together/view/${togetherSeq}`)
  }
    //수정/삭제
    const myPageTogetherUp = (togetherSeq) => {
        
      navigate(`../../community/together/view/${togetherSeq}`)
  
    }

    const myPageTogetherReset = async  (togetherSeq) => {
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
        <div className={styles.main}>
            <p className={styles.tagName}>내 동행</p>
            <hr className={styles.hr} />
            {togetherDTO.map(item => {
              // togetherDTO에 해당하는 subDTO
              const searchSub = subItemDTO.filter(subItem => subItem.toMainSeq === item.togetherSeq).find(item2 => item2.placeSw === 0)
              const searchSub_Cus = subItemDTO.filter(subItem_cus => subItem_cus.toMainSeq === item.togetherSeq).find(item2 => item2.placeSw === 1)
              
              return (
                <div className={styles.together} key={item.togetherSeq} onClick={() => onTogetherView(item.togetherSeq)}>
                  <div className={styles.dateTop}>
                    <div className={styles.date}>
                      {item.startDate}~{item.endDate}
                    </div>
                    <div className={styles.userSeq}>
                      {item.userProfileImage !== ''  ?
                          <div className={styles.userImg}>
                            <img src={item.userProfileImage} className={styles.userImg} alt="User Profile" />
                          </div>
                          :
                          <div className={styles.userImg}>
                            <img src={userDefaultProfile} className={styles.userImg} alt="Default Profile"/>
                          </div>
                      }
                      <div className={styles.userinfo}>
                        <p className={styles.userid}>{item.userid}</p>
                        <p className={styles.userGender}>{item.userGender === 'M' ? '남성' : '여성'}</p>
                      </div>
                      <div className={styles.tnuminfo}>
                        <p>모집인원</p> 
                        <p className={styles.tnum}>{item.tnum}명</p>
                      </div>
                    </div>
                  </div>
                {searchSub !== undefined &&

                  (<div className={styles.togetherFoot}>
                      <div className={styles.imgDiv}>
                          <img src={ loading && place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).image} 
                          className={styles.placeImg} alt="Place Image" />
                      </div>
                      <div className={styles.title}><p>{item.title}</p></div>
                      <div className={styles.context}><p>{item.context}</p>
                        <div className={styles.myPageTogetherBtnDiv}>
                        <div className={styles.myPageTogetherBtnDiv}>
                          <button className={styles.myPageTogetherUp} onClick={()=>myPageTogetherUp(item.togetherSeq)}>수정</button>&nbsp;
                          <button className={styles.myPageTogetherReset}onClick={()=>myPageTogetherReset(item.togetherSeq)}>삭제</button>
                      </div></div>
                      </div>
                      <div className={styles.placeInfo}> 
                          {loading && place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).name}
                      </div>
                  </div>)}

                  {searchSub === undefined && searchSub_Cus !== undefined &&

                  (<div className={styles.togetherFoot}>
                    <div className={styles.imgDiv}>
                        <div className={styles.placeImg}>
                        {/* 여기에 지도 넣을거야 */}
                        {scriptLoaded &&
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={{
                            lat: parseFloat(customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).latitude),
                            lng: parseFloat(customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).longitude)
                          }}
                          zoom={15}
                          options={{ disableDefaultUI: true, styles: myStyles }}
                        >
                        <Marker
                          position={{
                            lat: parseFloat(customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).latitude),
                            lng: parseFloat(customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).longitude)
                          }}
                          
                        />
                      </GoogleMap>
                        }
                        </div>
                    </div>
                    <div className={styles.title}><p>{item.title}</p></div>
                    <div className={styles.context}><p>{item.context}</p>
                      <div className={styles.myPageTogetherBtnDiv}>
                          <button className={styles.myPageTogetherUp} onClick={()=>myPageTogetherUp(item.togetherSeq)}>수정</button>&nbsp;
                          <button className={styles.myPageTogetherReset}onClick={()=>myPageTogetherReset(item.togetherSeq)}>삭제</button>
                      </div>
                    </div>
                    <div className={styles.placeInfo}>
                    {loading && customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).placeName}
                    </div>
                  </div>)}
                  
              </div>
                );
            })}
            <div className={styles.loadingSection} style={{display: scrollLoading ? 'block' : 'none'}}>
                <img src={loadingImg}/>
                <p>페이지가 느리게 로딩되면 새로고침을 해주세요.</p>
            </div>
            <div className={styles.lastSection} style={{opacity: last ? 1 : 0}}>
                {total}건 조회 되었습니다
            </div>
        </div>
    );

}

export default MypageTogether;