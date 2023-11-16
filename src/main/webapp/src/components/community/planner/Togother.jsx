import React, { useEffect, useState } from 'react';
import styles from '../../../css/planner.module.css'

const Togother = (props) => {
    const {num,toNum,onTo,subDTO,onToTitle,onToContext,onToTNum,onToDelete,onToList,toList,sDay,xBut,index} = props
    const togoItem = props.togoDTO.find(item => item.seq === num)

    const calcDay = (nDay) => {
        const date = new Date(sDay)
        date.setDate(date.getDate() + nDay - 1);
        return <span>{(date.getMonth()+1)}/{date.getDate()}</span>
    }

    return (
        <> 
            <div className={styles.togoOut} style={{width: num === toNum ? '310px' : '54px',
                opacity: toList === 0 ? 1 : 0}}>
                <section className={styles.toLeftSection} onClick={()=>onTo(num)}>
                    <div className={styles.leftTitle} style={{padding : togoItem.title === '' && '10px 0',
                    fontSize: togoItem.title === '' && '12px'}}>
                        {togoItem.title === '' ? '동행 '+(index+1) : togoItem.title}</div>
                </section>
                <section className={styles.toRightSection} style={{opacity: num === toNum ? 1 : 0}}>
                    <div style={{float:'right',marginBottom:'5px'}}>
                    {
                        subDTO.filter(item => item.toNum === num).length > 0 &&
                        (subDTO.filter(item => item.toNum === num).length > 1 ? (
                            <span className={styles.calcDay}>{calcDay(subDTO.filter(item => item.toNum === num)
                                .slice().sort((a, b) => a.nDay - b.nDay)[0].nDay)}&nbsp;-&nbsp; 
                        {calcDay(subDTO.filter(item => item.toNum === num).slice().sort((a, b) => 
                        a.nDay - b.nDay)[subDTO.filter(item => item.toNum === num).length-1].nDay)}</span>
                        ) : (<span className={styles.calcDay}>{calcDay(subDTO.find(item => item.toNum === num).nDay)}</span>
                        ))}&nbsp;
                    인원 <input type="number" min="2" max="10" step="1" 
                    value={togoItem.tNum} className={styles.tNum} onChange={(e) => onToTNum(e,num)}/>&nbsp;&nbsp; 
                    <img style={{marginBottom:'-3.5px'}} onClick={() => onToDelete(num)} className={styles.xButSmall} src={xBut}/></div>
                    <div style={{clear:'both'}}></div>{/* Title */}
                    <textarea rows={1} className={styles.toTitle} value={togoItem.title} onChange={(e) => 
                    onToTitle(e,num)} placeholder='Title'></textarea>
                    {
                        subDTO.filter(item => item.toNum === num).length > 0 ?
                        <div className={styles.togoItem} onClick={()=>onToList(num)}>
                            <div className={styles.togoItemContext}>
                            {subDTO.find(item2 => item2.toNum === num).context}</div>
                            <div style={{float:'right'}}>{subDTO.filter(item => item.toNum === num).length
                            > 1 &&'외 ' + (subDTO.filter(item => item.toNum === num).length-1) }</div>
                            <div style={{clear:'both'}}></div>
                            자세히 보려면 클릭
                        </div> :
                        <div style={{height:'51px',padding: '17px 5px'}}>플래너에서 일정을 추가해주세요</div>
                    }
                    <div>
                    <textarea rows={2} className={styles.toContext} placeholder='Context'
                    value={togoItem.context} onChange={(e) => onToContext(e,num)}></textarea>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Togother;