import React, { useEffect, useState } from 'react';
import Style from '../../../css/togetherList.module.css'

import loadingImg from '../../../assets/image/loading.png'

import { getTogetherList, getSubItemList, getCustomList, totTogether } from '../../../api/TogetherApiService';
import { getPlaceList } from '../../../api/PlaceApiService';
import { GoogleMap,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  margin: 'auto'
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const TogetherList = (props) => {
    const {search} = props;

    const[loading,setLoading] = useState(false)
    const[total,setTotal] = useState(0)
    const[count,setCount] = useState(1)
    const[last,setLast] = useState(false)
    const[scrollLoading,setScrollLoading] = useState(true)
    /////////////////////////////////////////////
    useEffect(() => {
      setScrollLoading(true)
      setLast(false)

      totTogether({ search : search })
      .then(res2 => {
        setTotal(res2.data)
        if(res2.data === 0) setLast(true);
      })
      .catch(e => console.log(e))
    },[])
    //////////////스크롤 매커니즘////////////////
    const handleScroll = () => {
      const scrollY = window.scrollY;
  
      const scrollHeight = document.documentElement.scrollHeight;
  
      const windowHeight = window.innerHeight;
      if (scrollY + windowHeight + 100 >= scrollHeight) {
          if(!scrollLoading) {
          if(!last) {
                  if(count * 10 > total) setLast(true);
                  else {
                      setScrollLoading(true)
                      setCount(count + 1);
                  }
              }
          }
      }
    };

  useEffect(()=>{
    let n = 0;
    if(count * 10 > total) n = total;
    else n = count * 10;
    if(n > 0) {
      getTogetherList({ n: n, search : search ? search.trim() : '' })
      .then(res => {
        setTogetherDTO(res.data)
        setScrollLoading(false)
      })
      .catch(e => console.log(e))
    } else {
        setScrollLoading(false)
        // setLast(true)
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
    window.removeEventListener('scroll', handleScroll);
    };

  },[count,total,scrollLoading,last])
////////////////////////검색/////////////////
useEffect(() => {
  setScrollLoading(true)
  
  totTogether({ search : search })
  .then(res2 => {
      setLast(false)
      setTotal(res2.data)
  })
  .catch(e => console.log(e))

  window.addEventListener('scroll', handleScroll);

  return () => {
  window.removeEventListener('scroll', handleScroll);
  };
},[search])

  ////////////////////////////////////////////
     //together목록
     const [togetherDTO, setTogetherDTO] = useState([])

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

    return (
        <div className={Style.listForm}>
          <div className={Style.listForminner}>
            {togetherDTO.map(item => {
              // togetherDTO에 해당하는 subDTO
              const searchSub = subItemDTO.filter(subItem => subItem.toMainSeq === item.togetherSeq).find(item2 => item2.placeSw === 0)
              const searchSub_Cus = subItemDTO.filter(subItem_cus => subItem_cus.toMainSeq === item.togetherSeq).find(item2 => item2.placeSw === 1)
              
              return (
                <div className={Style.together} key={item.togetherSeq}>
                    <div className={Style.date}>{item.startDate}~{item.endDate}</div>
                  
                {searchSub !== undefined &&

                  (<div className={Style.togetherFoot}>
                      <div className={Style.imgDiv}>
                          <img src={ loading && place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).image} 
                          className={Style.placeImg} alt="Place Image" />
                      </div>
                      <div className={Style.title}><p>{item.title}</p></div>
                      <div className={Style.context}><p>{item.context}</p></div>
                      <div className={Style.placeInfo}> {loading && place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).name}
                          <div className={Style.user}>유저정보</div>
                      </div>
                  </div>)}

                  {searchSub === undefined && searchSub_Cus !== undefined &&

                  (<div className={Style.togetherFoot}>
                    <div className={Style.imgDiv}>
                        <div className={Style.placeImg}>
                        {/* <button onClick={()=>{console.log(JSON.stringify(customDTO))}}></button>
                        <button onClick={()=>{console.log(JSON.stringify(searchSub_Cus))}}></button> */}
                        {/* {console.log(customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq)) || customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).placeName} */}
                        {/* {searchSub_Cus.plCustomSeq} */}
                        {/* {customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus?.plCustomSeq)?.placeName}   */}
                        {/* 여기에 지도 넣을거야 */}
                        {loading &&
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
                    <div className={Style.title}><p>{item.title}</p></div>
                    <div className={Style.context}><p>{item.context}</p></div>
                    <div className={Style.placeInfo}>{loading && customDTO.find(cusItem => cusItem.plCustomSeq === searchSub_Cus.plCustomSeq).placeName}
                        <div className={Style.user}>유저정보</div>
                    </div>
                  </div>)}
                
                  </div>
                );
            })}
            <div className={Style.loadingSection} style={{display: scrollLoading ? 'block' : 'none'}} >
                <img src={loadingImg}/>
            </div>
            <div className={Style.lastSection} style={{opacity: last ? 1 : 0}}>
                {total}건 조회 되었습니다
            </div>
          </div>
        </div>
      );
    };

export default TogetherList;

