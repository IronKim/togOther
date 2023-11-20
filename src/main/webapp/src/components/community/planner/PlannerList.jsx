import React, { useEffect, useState } from 'react';
import { totPlanner,getPlanner,getImages } from '../../../api/PlannerApiService';
import { getCity } from '../../../api/AdvisorApiService';
import styles from '../../../css/plannerList.module.css'

import noImage from '../../../assets/image/travel_none.png'

const PlannerList = () => {
    const[total,setTotal] = useState(0)
    const[count,setCount] = useState(1)
    const[planner,setPlanner] = useState([])
    const[images,setImages] = useState([])
    const[city,setCity] = useState([])

    useEffect(() => {
        getCity()
        .then(res => {
            setCity(res.data)
              
            totPlanner()
            .then(res2 => setTotal(res2.data))
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    },[])

    useEffect(()=>{
        let n = 0;
        if(count * 20 < total) n = total;
        else n = count * 20;

        getPlanner({ n: n })
        .then(res => {
                setPlanner(res.data)
                
                getImages({n : res.data[0].plannerSeq})
                .then(res2 => setImages(res2.data))
            }
        )
        .catch(e => console.log(e))
    },[count,total])

    return (
        <div className={styles.main}>
            {
                planner.map(item => <div className={styles.plannerItem}>
                    <img src={images.find(item2 => item2.plMainSeq === item.plannerSeq) !== undefined ?
                        images.find(item2 => item2.plMainSeq === item.plannerSeq).image : 
                        item.cityName !== '' ? noImage : noImage}/>
                    <p>{item.cityName}</p>
                    <p>{item.title}</p>
                    <div>{item.startDate}~{item.endDate}</div>
                </div>)
            }
        </div>
    );
};

export default PlannerList;