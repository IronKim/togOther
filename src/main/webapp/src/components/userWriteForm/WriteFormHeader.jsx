import React, { useEffect, useState } from 'react';

import styles from '../../css/userWriteForm.module.css';

const WriteFormHeader = ({page}) => {

    const [circleNum, setCircleNum] = useState(page);


    useEffect(() => {
        if(page === 0) {
            setCircleNum(0);
        }else if(page === 1){
            setCircleNum(1);
        }else if(page >= 2 && page <= 4){
            setCircleNum(2);
        }
    }, [page]);

    



    return (
        <div style={{width: 1200, margin: '0 auto', textAlign: 'center'}} >
            <p style={{textAlign: 'center'}} className='fs-1'>회원가입</p>
            <div style={{width: 600, margin: 'auto'}} className='mt-5 d-flex justify-content-between'>
                <div>
                    <div className={circleNum === 0 ? styles.activeCircle: styles.circle}>
                        <p>1</p>
                    </div>
                    <p>본인인증</p>
                </div>
                <div>
                    <div className={circleNum === 1 ? styles.activeCircle: styles.circle}>
                        <p>2</p>
                    </div>
                    <p>약관동의</p>
                </div>
                <div>
                    <div className={circleNum === 2 ? styles.activeCircle: styles.circle}>
                        <p>3</p>
                    </div>
                    <p>정보입력</p>
                </div>
                <div>
                    <div className={circleNum === 3 ? styles.activeCircle: styles.circle}>
                        <p>4</p>
                    </div>
                    <p>완료</p>     
                </div>
            </div>
        </div>
    );
};

export default WriteFormHeader;