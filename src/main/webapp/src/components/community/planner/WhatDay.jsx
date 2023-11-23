import React from 'react';
import styles from '../../../css/plannerView.module.css'

const WhatDay = (props) => {
    const {getToday,nDay,plannerImage,place,custom,onMouseOn,onMouseOff,subHover} = props;

    function replaceBr(text) {
        return text.split('\n').map((line, index, array) => 
          index === array.length - 1 ? line : (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          )
        );
      }

    const subItem = props.subItem.slice().sort((a, b) => a.endTime - b.endTime);
    const plannerText = props.plannerText.slice().sort((a, b) => parseInt(a.id.split('n')[1]) - parseInt(b.id.split('n')[1]));

    return (
        <section className={styles.whatDaySection} >
            <div className={styles.nDay}>Day{nDay}</div>
            <div className={styles.today}> | {getToday(nDay)}</div>
            <div style={{clear:'both',height:'30px'}}></div>
            {
                plannerText.filter(plTxt => plTxt.orders === 0).map(item => <p>{item.context}</p>)
            }
            {
                subItem.map(sub => <div>
                    <div className={styles.subItem} 
                        style={{borderColor: subHover === sub.subSeq ? '#1F5FAB' : 'lightGray'}}
                        onMouseOver={() => onMouseOn(sub.subSeq)} onMouseOut={() => onMouseOff()}
                    >
                    <div className={styles.leftPlace}>
                    <div className={styles.times}>{sub.startTime}시 - {sub.endTime}시</div>
                        <div className={styles.placeContext}><span style={{fontWeight:'bold'}}>장소 </span> 
                        { sub.placeSw === 0 && place.find(pl => pl.placeSeq === sub.placeSeq) && place.find(pl => pl.placeSeq === sub.placeSeq).name} 
                        { sub.placeSw === 1 && custom.find(cus => cus.plCustomSeq === sub.plCustomSeq) && custom.find(cus => cus.plCustomSeq === sub.plCustomSeq).placeName}
                        </div>
                        <div className={styles.placeContext}><span style={{fontWeight:'bold'}}>내용 </span>{sub.context}</div>
                    </div>
                    { sub.placeSw === 0 && place.find(pl => pl.placeSeq === sub.placeSeq) && 
                        <div className={styles.rigthPlace}>
                            <img src={place.find(pl => pl.placeSeq === sub.placeSeq).image}/> 
                            <div className={styles.plTxtBox}>
                            <p className={styles.plTop} style={{height: subHover === sub.subSeq ? '20px' : '77px' ,
                                paddingTop: subHover !== sub.subSeq && '58px',fontSize: subHover !== sub.subSeq && '22px'}}>
                            {place.find(pl => pl.placeSeq === sub.placeSeq).name}</p>
                            <div style={{clear:'left'}}></div>
                            <p className={styles.plBot} style={{height: subHover === sub.subSeq ? '110px' : '0px',
                                padding: subHover !== sub.subSeq && '0px 0px 0px 2px',borderTop: subHover !== sub.subSeq && '0.5px solid white',
                                borderBottom: subHover !== sub.subSeq && '0.5px solid white'}}
                            >{place.find(pl => pl.placeSeq === sub.placeSeq).context1}</p>
                            </div>
                        </div>}
                    <div style={{clear:'both'}}></div>
                    </div>
                    {
                        plannerText.filter(plTxt => plTxt.orders === sub.endTime).map(item => 
                        <p>{replaceBr(item.context)}</p>)
                    }
                </div>)
            }
            <br/>
            <hr/>
        </section>
    );
};

export default WhatDay;