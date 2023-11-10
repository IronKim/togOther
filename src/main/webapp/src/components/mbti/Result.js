import React, { useEffect, useState } from 'react';
import styles from '../../css/result.module.css'
import ticket  from '../../img/ticket.png'
import stamp from '../../img/stamp/stamp-01.png'

const Result = (props) => {
    const {ie,sn,tf,jp,onMbti} = props

    const[result,setResult] = useState('')
    
    useEffect(()=>{
        console.log(result)
        onMbti(result)
    },[result]);
    useEffect(()=>{
        mbti()
    },[]);

    const percentA = (type) => {
        return parseInt(type[0] * (100 / (type[0]+type[1])))
    }
    const percentB = (type) => {
        return parseInt(type[1] * (100 / (type[0]+type[1])))
    }
    
    const mbti = () => {
        let mb = ''
        if(ie.indexOf(Math.max(...ie)) === 0) mb += 'I'
        else mb += 'E'
        if(sn.indexOf(Math.max(...sn)) === 0) mb += 'S'
        else mb += 'N'
        if(tf.indexOf(Math.max(...tf)) === 0) mb += 'T'
        else mb += 'F'
        if(jp.indexOf(Math.max(...jp)) === 0) mb += 'J'
        else mb += 'P'
        setResult(mb)
    }
    return (
        <>
        <div style={{backgroundImage:`url(${ticket})`}} className={styles.resultDiv}>
            <h3>
                { ie.indexOf(Math.max(...ie)) === 0 ? 'I' : 'E'}
                { sn.indexOf(Math.max(...sn)) === 0 ? 'S' : 'N'}
                { tf.indexOf(Math.max(...tf)) === 0 ? 'T' : 'F'}
                { jp.indexOf(Math.max(...jp)) === 0 ? 'J' : 'P'}
            </h3>
            <img src={stamp}/>
            <div>
                대충 예쁘고 잘생기고 여행좋아하고 ....자유로운 영혼인당신께 파리를 추천드려요!
            </div>
            {/* <p>I : {percentA(ie)}% E : {percentB(ie)}%</p>
            <p>S : {percentA(sn)}% N : {percentB(sn)}%</p>
            <p>T : {percentA(tf)}% F : {percentB(tf)}%</p>
            <p>J : {percentA(jp)}% P : {percentB(jp)}%</p> */}
            <button onClick={()=>mbti()}>저장</button><button>공유</button><button>다시</button>
        </div>
        </>
    );
};

export default Result;