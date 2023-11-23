import React, { useEffect, useState } from 'react';

import styles from '../../css/userWriteForm.module.css';

const WriteFormHeader = ({page}) => {

    const [circleNum, setCircleNum] = useState(page);


    useEffect(() => {
        if(page === 0) {
            setCircleNum(0);
        }else if(page === 1){
            setCircleNum(1);
        }else if(page >= 2 && page <= 5){
            setCircleNum(2);
        }else{
            setCircleNum(3);
        }
    }, [page]);

    



    return (
        <div style={{width: '100%', margin: '0 auto', textAlign: 'center'}} >
            <p style={{ width: '100%', margin: '0 auto', textAlign: 'center'}} className='fs-1 mt-4'>회원가입</p>
            <div style={{width: '80%', margin: '0 auto'}} className='mt-5 d-flex justify-content-evenly'>
                <div>
                    <div className={circleNum === 0 ? styles.activeCircle: styles.circle}>
                        <p>1</p>
                    </div>
                    <p className='mt-2'>본인인증</p>
                </div>
                <div>
                    <div className={circleNum === 1 ? styles.activeCircle: styles.circle}>
                        <p>2</p>
                    </div>
                    <p className='mt-2'>약관동의</p>
                </div>
                <div>
                    <div className={circleNum === 2 ? styles.activeCircle: styles.circle}>
                        <p>3</p>
                    </div>
                    <p className='mt-2'>정보입력</p>
                </div>
                <div>
                    <div className={circleNum === 3 ? styles.activeCircle: styles.circle}>
                        <p>4</p>
                    </div>
                    <p className='mt-2'>완료</p>     
                </div>
            </div>
        </div>
    );
};

export default WriteFormHeader;