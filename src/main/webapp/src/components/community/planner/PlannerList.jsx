import React, { useEffect, useState } from 'react';
import { totPlanner,getPlanner,getImages } from '../../../api/PlannerApiService';
import { getCityList } from '../../../api/CityApiService';
import styles from '../../../css/plannerList.module.css'

import noImage from '../../../assets/image/travel_thumb.png'
import loadingImg from '../../../assets/image/loading.png'
import profileImg from '../../../assets/image/profile_thumb.png'
import { useNavigate } from 'react-router-dom';
import ProfileView from '../../ProfileView/ProfileView';

const PlannerList = (props) => {
    const {search,onModal} = props;

    const[total,setTotal] = useState(0)
    const[count,setCount] = useState(1)
    const[planner,setPlanner] = useState([])
    const[images,setImages] = useState([])
    const[loading,setLoading] = useState(false)
    const[city,setCity] = useState([])
    const[last,setLast] = useState(false)
    const[scrollLoading,setScrollLoading] = useState(true)

    const navigate = useNavigate()

    const onPlanner = (plannerSeq) => {
        navigate(`planner/view/${plannerSeq}`)
    }

    //////////////스크롤 매커니즘////////////////
    const handleScroll = () => {

        const scrollY = window.scrollY;
    
        const scrollHeight = document.documentElement.scrollHeight;
    
        const windowHeight = window.innerHeight;
        if (scrollY + windowHeight + 300 >= scrollHeight) {
            if(!scrollLoading) {
            if(!last) {
                    if(count * 20 > total) setLast(true);
                    else {
                        setScrollLoading(true)
                        setCount(count + 1);
                    }
                }
            }
        }
      };
    
    ////////////////////////////////////////////
    useEffect(() => {
        setScrollLoading(true)
        setLast(false)

        getCityList()
        .then(res => {
            setCity(res.data)
            setLoading(true)
        })
        .catch(e => console.log(e))
        
        totPlanner({ search : search })
        .then(res2 => {
            setTotal(res2.data)
            if(res2.data === 0) setLast(true);
        })
        .catch(e => console.log(e))
    },[])

    useEffect(()=>{
        let n = 0;
        if(count * 20 > total) n = total;
        else n = count * 20;

        if(n > 0) {
            getPlanner({ n: ''+n, search : search ? search.trim() : '' })
            .then(res => {
                    setPlanner(res.data)
                    setScrollLoading(false)
                    if(res.data.length > 0) {
                        getImages({n : res.data[0].plannerSeq})
                        .then(res2 => setImages(res2.data))
                    }
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

    useEffect(() => {
        setScrollLoading(true)
        
        totPlanner({ search : search })
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

    return (
        <div className={styles.main}>
            {
                planner.map(item => <div className={styles.plannerItem} onClick={() => onPlanner(item.plannerSeq)}>
                    <img className={styles.plannerImage} src={images.find(item2 => item2.plMainSeq === item.plannerSeq) !== undefined ?
                        images.find(item2 => item2.plMainSeq === item.plannerSeq).image.split(',')[0] :
                        item.citySeq !== -1 && loading ? city.find(item2 => item2.citySeq === item.citySeq).cityImage : noImage}/>
                    <div className={styles.plannerInfo}>
                        <div className={styles.profile} onClick={(e) => onModal(e,item.userSeq)}>
                            <img src={item.userProfileImage && item.userProfileImage !== '' ? item.userProfileImage : profileImg}/>
                            <p>{item.userName}</p>
                        </div>
                        <div className={styles.calender}>기간<br/>
                        {item.startDate.split("-")[1]}/{item.startDate.split("-")[2]}
                        - {item.endDate.split("-")[1]}/{item.endDate.split("-")[2]}</div>
                    </div>
                    <p className={styles.title}>{item.title}</p>
                </div>)
            }
            <div className={styles.loadingSection} style={{display: scrollLoading ? 'block' : 'none'}}>
                <img src={loadingImg}/>
                <p>페이지가 느리게 로딩되면 새로고침을 해주세요.</p>
            </div>
            <div className={styles.lastSection} style={{opacity: last ? 1 : 0}}>
                {total}건 조회 되었습니다
            </div>
        </div>
    );
};

export default PlannerList;