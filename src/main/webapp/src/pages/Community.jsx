import React, { useState } from 'react';
import PlannerList from '../components/community/planner/PlannerList';
import styles from '../css/community.module.css'

const Community = () => {
    const[toggle,setToggle] = useState(true)

    return (
        <div>
            <div className={styles.toggle} style={{paddingLeft: toggle ? '3px' : '120px' }}
            onClick={()=>setToggle(!toggle)}>
            <div className={styles.toggleLeft} style={{marginLeft: toggle ? '38px' : '-79px',
            color: toggle ?'white' : 'black'}}>플래너</div>
            <div className={styles.toggleRight} style={{marginLeft: toggle ? '161px' : '44px',
            color: toggle ? 'black' : 'white'}}>동행</div>
            <div className={styles.toggleBox}></div>
            </div>
            {
                toggle ? <PlannerList/> : '여기는 동행 리스트'
            }
        </div>
    );
};

export default Community;