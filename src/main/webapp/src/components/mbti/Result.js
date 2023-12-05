import React, { useEffect, useState } from 'react';
import styles from '../../css/result.module.css';
import ticket  from '../../assets/image/mbti/ticket.png';
import stamp01 from '../../assets/image/mbti/stamp/stamp-01.png';
import stamp02 from '../../assets/image/mbti/stamp/stamp-02.png';
import stamp03 from '../../assets/image/mbti/stamp/stamp-03.png';
import stamp04 from '../../assets/image/mbti/stamp/stamp-04.png';
import stamp05 from '../../assets/image/mbti/stamp/stamp-05.png';
import stamp06 from '../../assets/image/mbti/stamp/stamp-06.png';
import stamp07 from '../../assets/image/mbti/stamp/stamp-07.png';
import stamp08 from '../../assets/image/mbti/stamp/stamp-08.png';
import stamp09 from '../../assets/image/mbti/stamp/stamp-09.png';
import stamp10 from '../../assets/image/mbti/stamp/stamp-10.png';
import stamp11 from '../../assets/image/mbti/stamp/stamp-11.png';
import stamp12 from '../../assets/image/mbti/stamp/stamp-12.png';
import stamp13 from '../../assets/image/mbti/stamp/stamp-13.png';
import stamp14 from '../../assets/image/mbti/stamp/stamp-14.png';
import stamp15 from '../../assets/image/mbti/stamp/stamp-15.png';
import stamp16 from '../../assets/image/mbti/stamp/stamp-16.png';
import mbtiMapping from './MbtiMapping';

const Result = (props) => {
    const {ie,sn,tf,jp,onMbti,updateMbti,userSeq,theEndMbti} = props

    const [resultMbti,setResultMbti] = useState('')
    
    useEffect(()=>{
        let mb = ''
        if(ie.indexOf(Math.max(...ie)) === 0) mb += 'I'
        else mb += 'E'
        if(sn.indexOf(Math.max(...sn)) === 0) mb += 'S'
        else mb += 'N'
        if(tf.indexOf(Math.max(...tf)) === 0) mb += 'T'
        else mb += 'F'
        if(jp.indexOf(Math.max(...jp)) === 0) mb += 'J'
        else mb += 'P'

        setResultMbti(mb)

        if(userSeq !== undefined) {
            console.log(userSeq)
            updateMbti(userSeq,{mbti : mb})
            theEndMbti(mb)
        } else {
            onMbti(mb)
        }
    },[]);

    const percentA = (type) => {
        return parseInt(type[0] * (100 / (type[0]+type[1])))
    }
    const percentB = (type) => {
        return parseInt(type[1] * (100 / (type[0]+type[1])))
    }


    return (
        <>
        <div style={{backgroundImage:`url(${ticket})`}} className={styles.resultDiv}>
            <h3>
                {resultMbti}
            </h3>

            <br/>
                <img src={ resultMbti !== '' && mbtiMapping.find(item => item.mbti === resultMbti).stamp } 
                    alt={ resultMbti !== '' && mbtiMapping.find(item => item.mbti === resultMbti).city } />
            <div>
                <div style={{ height:'30px' }}>{ resultMbti !== '' && mbtiMapping.find(item => item.mbti === resultMbti).title }</div>
                { resultMbti !== '' && mbtiMapping.find(item => item.mbti === resultMbti).description }
            </div>
            {/* <p>I : {percentA(ie)}% E : {percentB(ie)}%</p>
            <p>S : {percentA(sn)}% N : {percentB(sn)}%</p>
            <p>T : {percentA(tf)}% F : {percentB(tf)}%</p>
            <p>J : {percentA(jp)}% P : {percentB(jp)}%</p> */}
            
        </div>
        </>
    );
};

export default Result;