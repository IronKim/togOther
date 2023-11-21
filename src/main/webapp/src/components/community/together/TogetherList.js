import React, { useEffect, useState } from 'react';
import Style from '../../../css/togetherList.module.css'

import { getTogetherList, getSubItemList, getCustomList } from '../../../api/TogetherApiService';
import { getPlaceList } from '../../../api/PlaceApiService';

const TogetherList = () => {

     //together목록
     const [togetherDTO, setTogetherDTO] = useState([])
     
     useEffect(()=> {
         getTogetherList()
         .then(res => {
            setTogetherDTO(res.data)
         })
         .catch(e => console.log(e))
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
        })
        .catch(e => console.log(e))
    },[])

    return (
        <div className={Style.listForm}>
          <div className={Style.listForminner}>
            {togetherDTO.map(item => {
              // togetherDTO에 해당하는 subDTO
              const searchSub = subItemDTO.filter(subItem => subItem.toMainSeq === item.togetherSeq).find(item2 => item2.placeSw === 0)
              console.log(searchSub)
              return (
                <div className={Style.together} key={item.togetherSeq}>
                  <div className={Style.date}>
                    {item.startDate}~{item.endDate}
                  </div>
                  {/* {searchSub.map(filterItem => {
                        //place 찾기
                        const searchPlace = place.find(placeItem => placeItem.placeSeq === filterItem.placeSeq);
                        
                        return (
                        )})
                    } */}
                    {searchSub !== undefined &&
                        <div className={Style.imgDiv}>
                            <img src={place.find(placeItem => placeItem.placeSeq === searchSub.placeSeq).image} 
                            className={Style.placeImg} alt="Place Image" />
                        </div>}
                  <div className={Style.title}>{item.title}</div>
                  <div className={Style.context}>{item.context}</div>
                </div>
              );
            })}
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