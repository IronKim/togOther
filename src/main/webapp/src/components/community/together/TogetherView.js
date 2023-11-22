import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Style from '../../../css/togetherView.module.css'
import { getTogetherSeq,getTogetherBySub } from '../../../api/TogetherApiService';
import { getPlaceBySeq } from '../../../api/PlaceApiService';

const TogetherView = () => {
    const { togetherSeq } = useParams()
    const [customDTO,setCustomDTO] = useState([])
    const [place, setPlace] = useState([])
    
    //투게더 소환
    const [togetherDTO, setTogetherDTO] = useState([])
    const [subDTO, setSubDTO] = useState([])
    useEffect(()=> {
        getTogetherSeq(togetherSeq)
        .then(res => {
            setTogetherDTO(res.data.together)
            setSubDTO(res.data.subItem)
            
        })
        .catch(e => console.log(e))
    },[])

    return (
        <div className={Style.viewForm}>
            <div className={Style.viewInner}>
                {togetherSeq}
                {togetherDTO.title}
                {subDTO.map(item => (
                    <div>{item.context}{item.placeSw}</div>
                ))} 
                {subDTO.context}    
            </div>
        </div>
    );
};

export default TogetherView;