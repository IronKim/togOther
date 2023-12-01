import React, { useEffect, useRef, useState } from 'react';
import AddPlaceForm from './AddPlaceForm';
import styles from '../../../css/planner.module.css'
import upload from '../../../assets/image/imageUploadBut.png'
import updateBut from '../../../assets/image/updateBut.png'
import togoBut from '../../../assets/image/togoBut.png'
import note from '../../../assets/image/note.png'
import calendarAdd from '../../../assets/image/calendarAdd.png'
import textAdd from '../../../assets/image/textAdd.png'

const Nday = (props) => {
    const {nDay,tabNum,onTab,subDTO,setSubDTO,textDTO,setTextDTO,sDay,toNum,
        imageDTO,onImage,deleteImg,xBut,GoogleMap,Autocomplete,plannerTitle} = props
    
    const id = useRef(1);
    const [firstTime,setFirstTime] = useState(0)

    //날짜 및 요일 구하기 및 생성시 최초값 넣기
    const [week, setWeek] = useState()
    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    
    useEffect(()=>{
        id.current = textDTO.filter(item => item.nDay === nDay).length + 1

        const date = new Date(sDay)
        date.setDate(date.getDate() + nDay - 1);

        setWeek(date.getDay());
        setDay(date.getDate());
        setMonth(date.getMonth()+1);
    },[nDay,sDay])
    //***************************


    //서브아이템 추가창 열고 닫기
    const [add, setAdd] = useState(false)
    const onAdd = () => {setAdd(true)}
    const onClose = () => {
        setAdd(false)
        setGap(false)
        setUp(false)
    }
    //****************************/
    
    
    //gap 관련
    const [gap, setGap] = useState(false)
    const [gs, setGs] = useState(0)
    const [ge, setGe] = useState(24)
    const onGap = (startTime,endTime) => {
        setGs(startTime)
        setGe(endTime)
        setGap(true)
    }
    //************************


    //update 관련
    const [up, setUp] = useState(false)
    const [upDTO, setUpDTO] = useState()
    
    const onUpdate = (endTime) => {
        const utd = subDTO.filter(nd=> nd.nDay === nDay)
        const ind = utd.findIndex(item => item.endTime === endTime)
        if(ind > 0) setGs(utd[ind-1].endTime)
        else setGs(0)
        if(ind < utd.length-1) setGe(utd[ind+1].startTime)
        else setGe(24)
        setUpDTO(utd.find(item => item.endTime === endTime));
        setUp(true)
    }
    const updateItem = (endTime,subData) => {
        const utd = subDTO
        const dtd = subDTO.find(item2 => (item2.nDay === nDay) && (item2.endTime === endTime))
        const fti = subDTO.findIndex(item2 => (item2.nDay === nDay) && (item2.endTime === endTime))
        const rtd = utd.filter(item => item !== dtd)
        rtd.splice(fti,0,subData)
        setSubDTO(rtd);
        setDel(!del)
        onClose()
    }
//****************************************
    const onToAdd = (endTime) => {
        const utd = subDTO
        const dtd = subDTO.find(item2 => (item2.nDay === nDay) && (item2.endTime === endTime))
        const fti = subDTO.findIndex(item2 => (item2.nDay === nDay) && (item2.endTime === endTime))
        const rtd = utd.filter(item => item !== dtd)
        rtd.splice(fti,0,{...dtd, toNum})
        setSubDTO(rtd);
        onClose()
    }

//delete 관련
const [del, setDel] = useState(false)//요소 삭제시 useEffect 동작 스위치
const deleteItem = (endTime) => {
    const utd = subDTO
    const dtd = subDTO.find(item2 => (item2.nDay === nDay) && (item2.endTime === endTime))
    setSubDTO(utd.filter(item => item !== dtd));
    setDel(!del)
}
const deleteText = (id) => {
    const fti = textDTO.filter(nd=> nd.nDay === nDay).findIndex(item => item.id === id);
    document.getElementById(textDTO.filter(nd=> nd.nDay === nDay).filter(nd=> nd.nDay === nDay)[fti-1].id).focus();
    const utd = textDTO.filter(item => item.id !== id);
    setTextDTO(utd);
    setDel(!del)
}
//**************************************************

const onSub = (subData) => {
    setSubDTO([...subDTO,subData])
    setTextDTO([...textDTO,{
        id : nDay+'n'+id.current,
        nDay : nDay,
        order : subData.endTime,
        context:'',
            height: 23
        }])
        requestAnimationFrame(() => {
            document.getElementById(nDay+'n'+(id.current-1)).focus();
        });
        id.current++
        onClose()
    }

    const onText = (e, id) => {
        const utd = textDTO.map((item2) => {
          if (item2.id === id) {
            return { ...item2, context: e.target.value, height : e.target.scrollHeight};
          }
          return item2;
        });
        setTextDTO(utd.slice().sort((a, b) => a.order - b.order));//전체 생각
      };

    
    //textDTO 자동 정렬 시스템
    useEffect(() => {
        if (subDTO.filter(nd=> nd.nDay === nDay).length > 0) {
            setSubDTO(item => {
                const sortSubDTO = item.slice().sort((a, b) => a.endTime - b.endTime);
                setFirstTime(sortSubDTO.filter(nd=> nd.nDay === nDay)[sortSubDTO.filter(
                nd=> nd.nDay === nDay).length-1].endTime);
            return [...sortSubDTO];
        });
        if (textDTO.filter(nd=> nd.nDay === nDay).length > 0) { 
            const sortSubDTO = subDTO.filter(nd=> nd.nDay === 
            nDay).slice().sort((a, b) => a.endTime - b.endTime);//정확한 작동을위한 요소값 받기 and 정렬
            const utd = textDTO.map((item2 => {//최고값이랑 통일
                if(item2.nDay === nDay) {
                    if(sortSubDTO.length > 1) {//서브아이템이 한개 초과
                        for (let i = 0; i < sortSubDTO.length;i++) {//반복문으로 사이 텍스트 붙이기
                            if(i > 0) {
                                if(item2.order <= sortSubDTO[i].startTime//두 서브아이템 사이 간격 i가 0보다 커야 작동
                                && item2.order > sortSubDTO[i-1].endTime) {
                                    return { ...item2, order : sortSubDTO[i-1].endTime};
                                } 
                            }
                            if(item2.order < sortSubDTO[i].endTime//한 서브아이템의 스타트와 엔드 간격
                                && item2.order > sortSubDTO[i].startTime) {
                                return { ...item2, order : sortSubDTO[i].endTime};
                            } 
                            if(i === sortSubDTO.length-1) {
                                if(item2.order > sortSubDTO[i].endTime) return { ...item2, order : sortSubDTO[i].endTime};
                            }
                        }
                    } else {//서브 아이템이 한개 이하
                        if(item2.order < sortSubDTO[0].endTime//첫 서브아이템의 스타트와 엔드 간격
                            && item2.order > sortSubDTO[0].startTime) {
                            return { ...item2, order : sortSubDTO[0].endTime};
                        } 
                        if (item2.order <  sortSubDTO[0].endTime) {//조건문으로 한개 텍스트 남았을때 붙이기
                            return { ...item2, order : 0};
                        } else {
                            return item2
                        }
                    }
                } else {
                    return item2
                }
                return item2
            }))
            setTextDTO(utd)
        }
        } else {
            setFirstTime(0)
            const utd = textDTO.map((item => {
                if(item.nDay === nDay) {
                    return { ...item, order : 0};
                } else return item
            }))
            setTextDTO(utd)
        }
    }, [add,gap,del,sDay]);
    //*********************************************************/
    return (
        <div>
            <div className={styles.nDayOut} style={{borderRadius: nDay === tabNum ? '2px' : '48px', 
            width: nDay === tabNum ? '95%' : '30%', height: nDay === tabNum ? '550px' : '48px'}}>
            {/* 현재 설정되어 있는 tabnum에 의해 동적으로 크기가 바뀜 */}
            <div className={styles.nDayTop} onClick={() => onTab(nDay)}>Day {nDay}</div> 
            {/* 일자 및 클릭 버튼 */}
            <div className={styles.nDayIn} id={'n'+nDay} style={{opacity: nDay === tabNum ? 1 : 0}}>
            {/* 내부 감싸는 Div */}
            <div className={styles.nDayDate}>{month}월 {day}일 ({week===0&&'일'}{week===1&&'월'}{week===2&&'화'}{week===3&&'수'}
            {week===4&&'목'}{week===5&&'금'}{week===6&&'토'})</div>
            {/* 날짜 매커니즘 */} 
            <div className={styles.imgBut} style={{backgroundImage:`url(${upload})`}}><input type='file' multiple 
            accept="image/*" onChange={(e) => onImage(e,nDay)}/></div>
            {/* 이미지 업로드 */}
            {imageDTO.filter(item => item.nDay === nDay).length > 0 && <section className={styles.imageSection}>
                {imageDTO.filter(item => item.nDay === nDay).map(item2 => {
                    const images = item2.image.split(',')
                    const img = images.map((item3,index) => <div><img key={index} src={item3} className={styles.images}/>
                    <img onClick={()=>deleteImg(nDay,index)} className={styles.xBut} src={xBut}></img></div>)
                    return img
                })}
            </section>}
            {/* 이미지 영역 */}
            {
                add && <AddPlaceForm onClose={onClose} firstTime={firstTime} lastTime={24} onSub={onSub} nDay={nDay}
                GoogleMap={GoogleMap} Autocomplete={Autocomplete} plannerTitle={plannerTitle}/>
            }
            {
                gap && <AddPlaceForm onClose={onClose} firstTime={gs} lastTime={ge}  onSub={onSub} nDay={nDay}
                GoogleMap={GoogleMap} Autocomplete={Autocomplete} plannerTitle={plannerTitle}/>
            }
            {
                up && <AddPlaceForm onClose={onClose} upDTO={upDTO} firstTime={gs} lastTime={ge}  onSub={onSub} 
                nDay={nDay} updateItem={updateItem}
                GoogleMap={GoogleMap} Autocomplete={Autocomplete}/>
            }
            <div style={{clear:'both'}}></div>
            <div style={{zIndex: -1,borderBottom: '1.5px solid lightgray',marginTop:'10px',marginBottom:'5px'}}/>
            {//첫 영역 텍스트박스(들)
                textDTO.filter(nd=> nd.nDay === nDay).filter(item => item.order === 0).map( //첫번째글은 항상 상단 고정
                    item2 => <div><textarea className={styles.nDayText} rows='1'
                    style={{height: item2.height + 'px',backgroundImage:`url(${note})`}} id={item2.id} name='text'
                    onInput={(e) => {
                        e.target.style.height = '';
                        e.target.style.height = e.target.scrollHeight + 3 + 'px';
                    }}
                    key={item2.id} value={item2.context} onChange={(e) => onText(e, item2.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && item2.context === '' && e.target.id !== nDay+'n0') deleteText(e.target.id);
                    }}/></div>
                ) 
            }

            {//서브 아이템들 표시 및 사이에 텍스트 박스 표시
                subDTO.filter(nd=> nd.nDay === nDay).map((item, index) => (
                    <div key={index}>
                {
                    index === 0 && ( item.startTime > 0 && 
                        <div onClick={() => onGap(0,item.startTime)} className={styles.gapPlus}><img src={calendarAdd}></img></div>) 
                        //뒷요소와 한시간이상 차이가 나면 사이에 추가버튼 추가
                    }
                    <div className={styles.placeItem}>
                        <img className={styles.xBut} style={{float:'right' , margin:'2px'}} onClick={() => deleteItem(item.endTime)}  src={xBut}/>
                        <img className={styles.xBut} style={{float:'right' , margin:'2px'}} onClick={() => onUpdate(item.endTime)} src={updateBut}/>
                        {
                            toNum > 0 && item.toNum === undefined && <img className={styles.xBut} style={{float:'right' , margin:'2px'}}
                            onClick={() => onToAdd(item.endTime)} src={togoBut}/>
                        }
                        <div>{item.startTime}시 - {item.endTime}시</div>
                        <div className={styles.placeContext}><span style={{fontWeight:'bold'}}>장소 </span> 
                        {item.place !== null && item.place.name}{item.customDTO !== null && item.customDTO.placeName}</div>
                        <div className={styles.placeContext}><span style={{fontWeight:'bold'}}>내용 </span>{item.context}</div>
                    </div>
                {/* 나중에 최적화 */}
                {
                    index + 1 < subDTO.filter(nd=> nd.nDay === nDay).length ? //배열 경계 검사
                    textDTO.filter(nd=> nd.nDay === nDay).filter(item2 => (item2.order >= item.endTime) && 
                    (item2.order  <= subDTO.filter(nd=> nd.nDay === nDay)[index + 1].startTime)).map( //사이에 들어가는 텍스트박스 중간
                    item3 => <div><textarea className={styles.nDayText} rows='1' 
                    style={{height: item3.height + 'px',backgroundImage:`url(${note})`}} id={item3.id} name='text'
                    onInput={(e) => {
                        e.target.style.height = '';
                        e.target.style.height = e.target.scrollHeight + 3 + 'px';
                    }}
                    key={item3.id} value={item3.context} onChange={(e) => onText(e, item3.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && item3.context === '' && e.target.id !== nDay+'n0') deleteText(e.target.id);
                    }}/></div>
                    ) 
                    : textDTO.filter(nd=> nd.nDay === nDay).filter(item2 => item2.order  >= item.endTime).map( //사이에 들어가는 텍스트박스 맨끝
                    item3 => <div><textarea className={styles.nDayText} rows='1' 
                    style={{height: item3.height + 'px',backgroundImage:`url(${note})`}} id={item3.id} name='text'
                    onInput={(e) => {
                        e.target.style.height = '';
                        e.target.style.height = e.target.scrollHeight + 3 + 'px';
                    }}
                    key={item3.id} value={item3.context} onChange={(e) => onText(e, item3.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && item3.context === '' && e.target.id !== nDay+'n0') deleteText(e.target.id);
                    }}/></div>
                    )
                }
                {
                    
                    index + 1 < subDTO.filter(nd=> nd.nDay === nDay).length && (
                        textDTO.filter(nd=> nd.nDay === nDay).findIndex(item2 => 
                        (item2.order <= subDTO.filter(nd=> nd.nDay === nDay)[index + 1].startTime && 
                        item2.order >= item.endTime)) === -1 && 
                        <div onClick={() => {setTextDTO([...textDTO,{
                            id : nDay+'n'+id.current,nDay,order : item.endTime, context:'',height: 23
                            }])
                            id.current++
                        }}
                        className={styles.textPlus}><img src={textAdd}></img></div>)
                        //뒷요소와 앞요소 사이에 텍스트박스가 텍스트추가버튼
                }
                {
                    index + 1 < subDTO.filter(nd=> nd.nDay === nDay).length && ( 
                        subDTO.filter(nd=> nd.nDay === nDay)[index + 1].startTime-item.endTime >= 1 && 
                        <div onClick={() => onGap(item.endTime,subDTO.filter(nd=> nd.nDay === nDay)[index + 1].startTime)}
                        className={styles.gapPlus}><img src={calendarAdd}></img></div>) 
                        //뒷요소와 한시간이상 차이가 나면 사이에 추가버튼 추가
                }
                {
                    
                    index + 1 === subDTO.filter(nd=> nd.nDay === nDay).length && (textDTO.filter(nd=> nd.nDay === nDay).findIndex(item2 => item2.order >= item.endTime) === -1 && 
                        <div onClick={() => {setTextDTO([...textDTO,{
                            id : nDay+'n'+id.current,nDay,order : item.endTime, context:'',height: 23
                            }])
                            id.current++
                        }}
                        className={styles.textPlus}><img src={textAdd}></img></div>)
                        //뒷요소와 앞요소 사이에 텍스트박스가 텍스트추가버튼
                }
                </div>
            ))
        }
        <div style={{zIndex: -1,borderBottom: '1.5px solid lightgray',marginBottom:'10px'}}/>
        {firstTime < 24 && <button className={styles.buttons} onClick={onAdd}>일정 추가</button>}
        </div>
        </div>
        </div>
    );
};

export default Nday; 