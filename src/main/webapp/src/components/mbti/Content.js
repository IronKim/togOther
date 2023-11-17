import React, { useState } from 'react';
import data from './Data';
import styles from '../../css/content.module.css'
import note from '../../assets/image/mbti/note.jpg'
import chain from '../../assets/image/mbti/chain.png'
import covers from '../../assets/image/mbti/cover.png'
import coverChain from '../../assets/image/mbti/coverChain.jpg'
import calender from '../../assets/image/mbti/calender.png'
import back from '../../assets/image/mbti/back.png'

const Content = (props) => {
    const{nextStatus,updateType,minusType} = props

    const[butDis,setButDis] = useState(false)
    const[cover,setCover] = useState(false)
    const[first,setFirst] = useState(true)
    const[last,setLast] = useState(false)
    const[last2,setLast2] = useState(false)
    const[roll,setRoll] = useState(false)
    const[reRoll,setReRoll] = useState(false)
    const[num,setNum] = useState(0)
    const[history,setHistory] = useState([])


    const onChoice = (type,index) => {
        setButDis(true)
        setRoll(true)
        setCover(false)
        setHistory([...history,index])
        updateType(type)
        setFirst(false)
        requestAnimationFrame(() => {
            setCover(true)
        });
        if(num < data.length-1) {
            setTimeout(() => {
                setNum(num+1) 
            }, 1500);
        }
        else {
            setLast(true)
            setTimeout(() => {
                setLast2(true)
            }, 2000);
            setTimeout(() => {
                nextStatus();
            }, 3950);
        }
        setTimeout(() => {
            setRoll(false)
            setButDis(false)
        }, 3000);
    } 

    const onPrev = () => {
        setButDis(true)
        setReRoll(true)
        setCover(false)
        requestAnimationFrame(() => {
            setCover(true)
        });
        minusType(data[history.length-1].answer[history[history.length-1]].type)
        history.pop();
        setTimeout(() => {
            setNum(num-1)
        }, 1500);
        setTimeout(() => {
            setReRoll(false)
            setButDis(false)
        }, 3000);
    }

    return (
        <div>
            <div style={{ width: '40%', margin: 'auto'}}>
            <div className={`${styles.calender} ${roll && styles.roll} ${reRoll && styles.reRoll}`}
            style={{backgroundImage:`url(${calender})`,backgroundSize:'100%',backgroundRepeat:'no-repeat',opacity: last2 && 0}}>
                <p className={`${styles.day} ${(roll || reRoll) && styles.fadeInD} ${first && styles.fadeIn}`}>   
                    {last2 ? '출발!' : 'D - ' + (data.length - data[num].id)}
                </p>
            </div>
            </div>
            <section className={`${styles.qsOutSection}`} style={{border: last2 && 0,boxShadow: last2 && 'none'
        }}>
                <div className={`${styles.coverSection} ${cover && styles.cover} ${first && styles.openCover} ${last && styles.last}`} 
                style={{backgroundImage:`url(${covers})`,backgroundSize:'10%',transformOrigin: last2 ? 'center' : 'left'}}>
                    <div className={styles.chainDiv} style={{backgroundImage:`url(${coverChain})`,backgroundSize:'100%'}}></div>
                    <div className={styles.contentDiv}></div>
                </div>
                <section className={`${styles.qsSection} ${last && styles.last}`} 
                style={{backgroundImage:`url(${note})`,backgroundSize:'100%'}}>
                    <div className={styles.chainDiv} style={{backgroundImage:`url(${chain})`,backgroundSize:'100%'}}></div>   
                    <div className={styles.contentDiv}>
                        <div className={styles.question}>{data[num].question}</div>
                        {
                            data[num].answer.map((item,index) => {
                                return <button onClick={() => onChoice(item.type,index)} className={styles.answer}
                                disabled={butDis}>{item.text}</button>
                            })
                        }
                        { num > 0 && <p style={{textAlign:'left'}}>
                            <button className={styles.prevBut} 
                            onClick={()=>onPrev()} disabled={butDis}>
                                <img src={back}/>
                            </button>
                        </p>}
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Content;