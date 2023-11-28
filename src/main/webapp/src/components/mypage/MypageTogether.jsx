import React, { useEffect, useState } from 'react';
import { getMyPlanner,totMyPlanner,getImages,deletePlanner,updatePublicPlan } from '../../api/PlannerApiService';
import { getCityList } from '../../api/CityApiService';
import { useUserStore } from '../../stores/mainStore';
import { useNavigate } from 'react-router-dom';
import noImage from '../../assets/image/travel_thumb.png';
import loadingImg from '../../assets/image/loading.png';

import sweet from 'sweetalert2';
import styles from '../../css/MypageTogether.module.css';

const MypageTogether = () => {
    const { user } = useUserStore();

    const[total,setTotal] = useState(0)
    const[count,setCount] = useState(1)
    const[planner,setPlanner] = useState([])
    const[images,setImages] = useState([])
    const[loading,setLoading] = useState(false)
    const[city,setCity] = useState([])
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
                    if(count * 12 > total) setLast(true);
                    else {
                        setScrollLoading(true)
                        setCount(count + 1);
                    }
                }
            }
        }
      };
    
    ////////////////////////////////////////////


    return (
        <div>
            <p className={styles.tagName}>내 동행</p>
            <hr className={styles.hr} />
     
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