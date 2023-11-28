import React from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import MbtiMain from '../mbti/MbtiMain';

const MBTIWrite = ({onInput,inputUserData,nextPage,styles,onMbti,onSubmitWrite}) => {
    return (
        <div className={styles.writeContainer}>
            <MbtiMain onInput={onInput} onMbti={onMbti} nextPage={nextPage} onSubmitWrite={onSubmitWrite} styles={styles} inputUserData={inputUserData} />
            {inputUserData.mbti === '' ? <p className='btn btn-primary mt-3' onClick={onSubmitWrite}>스킵하고 회원가입</p> : <p className='btn btn-primary mt-3' onClick={onSubmitWrite}>회원가입</p>}
        </div>
    );
};

export default MBTIWrite;