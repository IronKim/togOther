import React, { useEffect, useState } from 'react';
import { getMyPlanner,totMyPlanner,getImages,deletePlanner,updatePublicPlan } from '../../api/PlannerApiService';
import { getCityList } from '../../api/CityApiService';
import { useUserStore } from '../../stores/mainStore';
import { useNavigate } from 'react-router-dom';

import styles from '../../css/myPlanner.module.css';
import noImage from '../../assets/image/travel_thumb.png';
import loadingImg from '../../assets/image/loading.png';

import sweet from 'sweetalert2';

const MypagePlanner = () => {
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

    const onPlanner = (plannerSeq) => {
        navigate(`/community/planner/view/${plannerSeq}`)
    }

    const onUpdate = (e,seq) => {
        e.stopPropagation();
        window.scrollTo(0, 0);
        navigate(`/community/planner/update/${seq}`)
    } 
    const onDelete = (e,seq) => {
        console.log(seq)

        e.stopPropagation();
        sweet.fire({
            title: "정말 삭제하시겠습니까?",
            text: "동행은 그대로 유지됩니다",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요"
        }).then((result) => {
            if (result.isConfirmed) {
                deletePlanner(seq)
                .then(res => {
                    window.scrollTo(0, 0);
                    setTotal(total-1)
                    sweet.fire({
                        title: "삭제되었습니다",
                        icon: "success"
                    }).then(
                        setPlanner(planner.filter(item => item.plannerSeq !== seq))
                    )
                })
            } 
        });
    }

    const onPublic = (e,seq,publicPlan) => {
        e.stopPropagation();

        updatePublicPlan(seq,{plan : publicPlan === 0 ? 1 : 0})
        .then(res => console.log(res))

        setPlanner(plan => {
            return plan.map(item => {
                if (item.plannerSeq === seq) {
                    return {...item, publicPlan : publicPlan === 0 ? 1 : 0}
            } else return item;
            })
        })
    }
    
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

    useEffect(() => {
        setScrollLoading(true)
        setLast(false)

        getCityList()
        .then(res => {
            setCity(res.data)
            setLoading(true)
        })
        .catch(e => console.log(e))
        
        totMyPlanner({ userSeq : user.userSeq })
        .then(res2 => {
            setTotal(res2.data)
            if(res2.data === 0) setLast(true);
        })
        .catch(e => console.log(e))
    },[])

    useEffect(()=>{
        let n = 0;
        if(count * 12 > total) n = total;
        else n = count * 12;

        if(n > 0) {
            getMyPlanner({ n: n, userSeq: user.userSeq})
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

    return (
        <div className={styles.main}>
            <p className={styles.tagName}>내 일정</p>
            <hr className={styles.hr} />
            {
                planner.map(item => <div className={styles.plannerItem} onClick={() => onPlanner(item.plannerSeq)}>
                    <img className={styles.plannerImage} src={images.find(item2 => item2.plMainSeq === item.plannerSeq) !== undefined ?
                        images.find(item2 => item2.plMainSeq === item.plannerSeq).image.split(',')[0] :
                        item.citySeq !== -1 && loading ? city.find(item2 => item2.citySeq === item.citySeq).cityImage : noImage}/>
                    <div className={styles.plannerInfo}>
                        <div className={styles.buttons}>
                            <button onClick={(e) => onUpdate(e,item.plannerSeq)}>수정</button>
                            <button style={{backgroundColor:'tomato'}} onClick={(e) => onDelete(e,item.plannerSeq)}>삭제</button>
                        </div>
                        <div className={styles.calender}>기간<br/>
                        {item.startDate.split("-")[1]}/{item.startDate.split("-")[2]}
                        - {item.endDate.split("-")[1]}/{item.endDate.split("-")[2]}</div>
                    </div>
                    <p className={styles.title}>{item.title}</p>
                    <div className={styles.publicBut} onClick={(e)=>onPublic(e,item.plannerSeq,item.publicPlan)}
                    style={{paddingLeft: item.publicPlan === 0 ? '20px' : '2px' ,
                    backgroundColor: item.publicPlan === 0 ? '#2E8DFF' : 'lightgray'}}>
                    <div></div></div>
                    <div className={styles.gong}>공개&nbsp;</div>
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

export default MypagePlanner;