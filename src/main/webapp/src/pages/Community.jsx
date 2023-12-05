import React, { useState } from 'react';
import PlannerList from '../components/community/planner/PlannerList';
import styles from '../css/community.module.css'
import TogetherList from '../components/community/together/TogetherList';
import CommunitySearch from '../components/community/CommunitySearch';
import { useUserStore } from '../stores/mainStore';

import planner from '../assets/image/planner.png'
import people from '../assets/image/people.png'
import { useParams,useNavigate } from 'react-router-dom';
import ProfileView from '../components/ProfileView/ProfileView';

const Community = () => {
    const {user} = useUserStore();

    const [toggle, setToggle] = useState(true)

    const[search,setSearch] = useState('')

    const navigate = useNavigate()

    const[open,setOpen] = useState(false)
    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const [modalShow1, setModalShow1] = useState(false);
    const [modalSeq,setModalSeq] = useState(-1);
    
    const onModal = (e,seq) => {
        setModalSeq(seq)
        setModalShow1(true);
        e.stopPropagation();
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
                toggle ? <PlannerList search={search} onModal={onModal}/> : <TogetherList search={search} onModal={onModal}/>
            }
            <div className={styles.goWrite} style={{right: open ? '6%' : '-160px'}}>
                <button className={styles.goPl} onClick={() => navigate(`planner/write`)}><img src={planner}/>&nbsp;플래너 작성</button>
                <button className={styles.goTo} onClick={() => navigate(`together/write`)}><img src={people}/>&nbsp;동행 작성</button>
            </div>
            {   user.name !== '' &&
                <div className={styles.openWrite} onClick={() => setOpen(!open)}
                style={{transform: open && 'rotate(-45deg)', color: open && '#2E8DFF',backgroundColor: open && 'white'}}>+</div>
            }
            {modalSeq !== -1 && <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={modalSeq}/>}
        </div>
    );
};

export default Community;