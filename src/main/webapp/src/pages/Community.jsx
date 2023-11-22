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