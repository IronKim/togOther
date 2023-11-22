import React, { useState } from 'react';
import PlannerList from '../components/community/planner/PlannerList';
import styles from '../css/community.module.css'
import TogetherList from '../components/community/together/TogetherList';
import CommunitySearch from '../components/community/CommunitySearch';

const Community = () => {
    const[toggle,setToggle] = useState(true)

    const[search,setSearch] = useState('')

    const onSearch = (e) => {
        setSearch(e.target.value)
        // 구글맵 언로드
        const scripts = document.head.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        // 여기에서 Google Maps API 스크립트를 식별하고 언로드하는 로직 추가
        if (script.src.includes('maps.googleapis.com')) {
            script.remove();
            break;
        }
        }
    }
    return (
        <div>
            <CommunitySearch search={search} onSearch={onSearch}/>
            <div className={styles.toggle} style={{paddingLeft: toggle ? '3px' : '120px' }}
            onClick={()=>setToggle(!toggle)}>
            <div className={styles.toggleLeft} style={{marginLeft: toggle ? '38px' : '-79px',
            color: toggle ?'white' : 'black'}}>플래너</div>
            <div className={styles.toggleRight} style={{marginLeft: toggle ? '161px' : '44px',
            color: toggle ? 'black' : 'white'}}>동행</div>
            <div className={styles.toggleBox}></div>
            </div>
            {
                toggle ? <PlannerList search={search}/> : <TogetherList/>
            }
        </div>
    );
};

export default Community;