import React, { useEffect } from 'react';
import logo from '../../assets/image/Logo.png';
import { useNavigate } from 'react-router-dom';

const WriteFormComplete = ({createUesr,styles}) => {

    useEffect(() => {
        createUesr();
    }, []);

    const navigate = useNavigate();
    const onsubmit=()=>{

        navigate('../../user/Login')
    }

    return (
        <div>
            <p className={styles.welcome}>welcome!</p>
            <img src={ logo } alt='로고' className={styles.writeLogo}/>
            <div>
                <button className={styles.loginBtn} type="submit" onClick={onsubmit}>Going To Login</button>
            </div>
        </div>
    );
};

export default WriteFormComplete;