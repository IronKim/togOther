import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Style from '../../../css/togetherView.module.css'
import { getTogetherSeq,getTogetherBySub } from '../../../api/TogetherApiService';
import { getPlaceBySeq } from '../../../api/PlaceApiService';

const TogetherView = () => {
    const { togetherSeq } = useParams()

    //togetherDTO소환
    const [customDTO,setCustomDTO] = useState([])
    const [place, setPlace] = useState([])
    
    const [togetherDTO, setTogetherDTO] = useState([])
    useEffect(()=> {
        getTogetherSeq(togetherSeq)
        .then(res => {
            setTogetherDTO(res.data)
        })
        .catch(e => console.log(e))
    },[])

    const [subDTO, setSubDTO] = useState([])
    useEffect(()=> {
        getTogetherBySub(togetherSeq)
        .then(res => {
            setSubDTO(res.data)
        })
        .catch(e => console.log(e))
    },[])
    return (
        <div className={Style.viewForm}>
            <div className={Style.viewInner}>
                {togetherSeq}
                {togetherDTO.title}
                {subDTO.plMainSeq}

            </div>
        </div>
    );
};

export default TogetherView;