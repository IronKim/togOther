import React, { useEffect } from 'react';
import logo from '../../assets/image/Logo.png';

const WriteFormComplete = ({createUesr,styles}) => {

    useEffect(() => {
        createUesr();
    }, []);

    return (
        <div>
            <p className={styles.welcome}>welcome!</p>
            <img src={ logo } alt='로고' className={styles.writeLogo}/>
            <div>
                <button style={{fontSize:20}} className={styles.input_file_button}>로그인</button>
            </div>
        </div>
    );
};

export default WriteFormComplete;