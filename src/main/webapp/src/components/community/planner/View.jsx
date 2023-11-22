import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlannerView } from '../../../api/PlannerApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';


const View = () => {
    const { plannerSeq } = useParams();
    const [planner,setPlanner] = useState()
    const [plannerImage,setPlannerImage] = useState([])
    const [plannerText,setPlannerText] = useState([])
    const [subItem,setSubItem] = useState([])
   
    const [place,setPlace] = useState([])
    const [custom,setCustom] = useState([])

    useEffect(() => {
        getPlannerView(plannerSeq)
        .then(res => {
            setPlanner(res.data.planner)
            setPlannerImage(res.data.plannerImage)
            setPlannerText(res.data.plannerText)
            setSubItem(res.data.subItem)
            
            let placeDTO = []
            let customDTO = [] 
            res.data.subItem.map(item => {
                if(item.placeSw === 0) {
                    getPlace(item.placeSeq)
                    .then(res2 => placeDTO.push(res2.data))
                }
                if(item.placeSw === 1) {
                    getCustomPlace(item.plCustomSeq)
                    .then(res2 => customDTO.push(res2.data))
                }
            })
            console.log(placeDTO)
            console.log(customDTO)
        })
    },[])

    return (
        <div>
            {plannerSeq}
        </div>
    );
};

export default View;