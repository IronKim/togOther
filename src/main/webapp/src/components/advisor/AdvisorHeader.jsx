import React from 'react';

import logoImg from '../../assets/image/Logo.png';
import styles from '../../css/advisor.module.css';

const AdvisorHeader = () => {
    return (
        <div className= {styles.advisorHeader}> 
           <img src={logoImg} alt='로고' height='80em'/>
        </div>
    );
};

export default AdvisorHeader;