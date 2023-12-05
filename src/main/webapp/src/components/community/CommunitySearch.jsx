import React from 'react';
import styles from '../../css/community.module.css'

import searchBg from '../../assets/image/flight.png'
import searchs from '../../assets/image/search.png'

const CommunitySearch = (props) => {
    const {search,onSearch} = props

    return (
        <div style={{backgroundImage:`url(${searchBg})`}} className={styles.searchBg}>
            <img src={searchs} className={styles.search}/>
            <input type='search'className={styles.searchBox} value={search} 
            onChange={onSearch} placeholder='어디로 떠나시나요?'/>
        </div>
    );
};

export default CommunitySearch;