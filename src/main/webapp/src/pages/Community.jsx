import React, { useState } from 'react';
import PlannerList from '../components/community/planner/PlannerList';
import styles from '../css/community.module.css'
import TogetherList from '../components/community/together/TogetherList';
import CommunitySearch from '../components/community/CommunitySearch';

import planner from '../assets/image/planner.png'
import people from '../assets/image/people.png'
import { useNavigate } from 'react-router-dom';

const Community = () => {
    const[toggle,setToggle] = useState(true)

    const[search,setSearch] = useState('')

    const navigate = useNavigate()

    const[open,setOpen] = useState(false)
    const onSearch = (e) => {
        setSearch(e.target.value)
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
                toggle ? <PlannerList search={search}/> : <TogetherList search={search}/>
            }
            <div className={styles.goWrite} style={{right: open ? '6%' : '-160px'}}>
                <button className={styles.goPl} onClick={() => navigate(`planner/write`)}><img src={planner}/>&nbsp;플래너 작성</button>
                <button className={styles.goTo} onClick={() => navigate(`together/write`)}><img src={people}/>&nbsp;동행 작성</button>
            </div>
            <div className={styles.openWrite} onClick={() => setOpen(!open)}
            style={{transform: open && 'rotate(-45deg)', color: open && '#2E8DFF',backgroundColor: open && 'white'}}>+</div>
        </div>
    );
};

export default Community;