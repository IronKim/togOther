import React from 'react';

import logoImg from '../../assets/image/Logo.png';
import { Navigate, useNavigate } from 'react-router-dom';

const AdvisorHeader = ({styles}) => {

    const navigate = useNavigate();

    return (
        <div className= {styles.advisorHeader}> 
           <img className={styles.logoImg} onClick={()=> navigate('/')} src={logoImg} alt='로고' />
        </div>
    );
};

export default AdvisorHeader;