import React from 'react';

import logoImg from '../../assets/image/Logo.png';

const AdvisorHeader = ({styles}) => {
    return (
        <div className= {styles.advisorHeader}> 
           <img className={styles.logoImg} src={logoImg} alt='로고' />
        </div>
    );
};

export default AdvisorHeader;