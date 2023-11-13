import React, { useState } from 'react';
import styles from '../../css/start.module.css'
import covers from '../../img/cover.png'
import coverChain from '../../img/coverChain.jpg'
import calender from '../../img/calender.png'
import title from '../../img/title.png'
import start from '../../img/start.png'

const Start = (props) => {
    const {nextStatus} = props
    const[butDis,setButDis] = useState(false)
    

    const chainFrame = () => {
        const chain = []    
        for(let i = 0; i < 13; i++) chain.push(<div className={styles.chainFrame}></div>)
        return chain
    }

    const startClick = () => {
        setButDis(true);
        setTimeout(() => {
            nextStatus();
        }, 1490);
    };

    return (
        <div>
            <div style={{ width: '40%', margin: 'auto'}}>
                <div className={`${styles.calender} ${butDis && styles.roll}`}
                style={{backgroundImage:`url(${calender})`,backgroundSize:'100%',backgroundRepeat:'no-repeat'}}>
                    <p className={`${styles.day} ${butDis && styles.fadeOut}`}>
                        GO!
                    </p>
                </div>
            </div>
            <div className={styles.noteDiv} style={{backgroundImage:`url(${covers})`,backgroundSize:'10%'}}>
                    <div className={styles.chainDiv} style={{backgroundImage:`url(${coverChain})`,backgroundSize:'100%'}}></div>
                    <div className={`${styles.contentDiv} ${butDis && styles.fadeOut}`}>
                        <div className={styles.title} style={{backgroundImage:`url(${title})`,backgroundSize:'100%'}}>
                            ~~의 여행 MBTI</div>
                        {/* 유저이름 받기 */}
                        <button className={styles.start} onClick={()=>startClick()} 
                        style={{backgroundImage:`url(${start})`,backgroundSize:'100%'}}
                        disabled={butDis}></button>
                    </div>
            </div>
        </div>
    );
};

export default Start;