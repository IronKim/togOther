import React, { useState } from 'react';
import PlannerList from '../components/community/planner/PlannerList';

const Community = () => {
    const[toggle,setToggle] = useState(true)

    return (
        <div>
            <button onClick={()=>setToggle(!toggle)}>전환</button>
            {
                toggle ? <PlannerList/> : '여기는 동행 리스트'
            }
        </div>
    );
};

export default Community;