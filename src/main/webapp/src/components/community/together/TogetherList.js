import React, { useEffect, useState } from 'react';
import Style from '../../../css/togetherList.module.css'

import loadingImg from '../../../assets/image/loading.png'

import { getTogetherList, getSubItemList, getCustomList, totTogether } from '../../../api/TogetherApiService';
import { getPlaceList } from '../../../api/PlaceApiService';

const TogetherList = () => {
    const[loading,setLoading] = useState(false)
    const[total,setTotal] = useState(0)
    const[count,setCount] = useState(1)
    const[last,setLast] = useState(false)
    const[scrollLoading,setScrollLoading] = useState(true)
    /////////////////////////////////////////////
    useEffect(() => {
      totTogether()
      .then(res2 => setTotal(res2.data))
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

    getTogetherList({ n: n })
    .then(res => {
       setTogetherDTO(res.data)
       setScrollLoading(false)
    })
    .catch(e => console.log(e))
  window.addEventListener('scroll', handleScroll);

  return () => {
  window.removeEventListener('scroll', handleScroll);
  };

},[count,total,scrollLoading,last])
  ////////////////////////////////////////////
     //together목록
     const [togetherDTO, setTogetherDTO] = useState([])

     useEffect(()=> {
     },[])

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
              // console.log(searchSub)
              return (
                <div className={Style.together} key={item.togetherSeq}>
                    <div className={Style.date}>{item.startDate}~{item.endDate}</div>
                  
                  {/* {searchSub.map(filterItem => {
                        //place 찾기
                        const searchPlace = place.find(placeItem => placeItem.placeSeq === filterItem.placeSeq);
                        
                        return (
                        )})
                    } */}
                    {searchSub !== undefined &&

                  <div className={Style.togetherFoot}>
                      <div className={Style.imgDiv}>
                          <img src={ loading && place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).image} 
                          className={Style.placeImg} alt="Place Image" />
                      </div>
                      <div className={Style.title}><p>{item.title}</p></div>
                      <div className={Style.context}><p>{item.context}</p></div>
                      <div className={Style.placeInfo}> {loading && place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).name}
                          <div className={Style.user}>유저정보</div>
                      </div>
                  </div>
                  }
                </div>
              );
            })}
            <div className={Style.loadingSection} style={{display: scrollLoading ? 'block' : 'none'}} >
                <img src={loadingImg}/>
            </div>
            <div style={{display: last ? 'block' : 'none',height:'100px',textAlign:'center'}}>
                마지막
            </div>
          </div>
        </div>
      );
    };

export default TogetherList;

// {place.find(placeItem => {
//   placeItem.placeSeq === searchSub.placeSeq

//   return(
//     <div className={Style.imgDiv}>
//         <img src={subDTO.place.image} className={Style.placeImg} alt="Place Image" />
//     </div>
//   )
// })}