import React, { useEffect,useState } from 'react';
import Style from '../../css/together.module.css'

import { addTogether } from '../../api/TogetherApiService';
import PlaceSelect from './PlaceSelect';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';


const PlaceWriteForm = () => {
    
    //오늘 날짜 구하는
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    const nowDay = `${year}-${month}-${date}`;
    //저장한다이
    const [togetherDTO, setTogetherDTO] = useState({
        togetherSeq:'',
        userSeq:'',
        title: '',      //제목
        startDate: nowDay,  //시작날짜
        endDate: nowDay,    //끝나는날짜
        context: '',    //내용
        tNum: 2,       //모집인원   
    });
    const [subDTO,setSubDTO] = useState([])
    
    const{togetherSeq,userSeq,title,startDate,endDate,context,tNum} = togetherDTO

    const togetherSave = (e) => {
        e.preventDefault()

        var sw = 1
        if(!title){
            alert('제목 입력')
            sw=0
        }
        if(!context){
            alert('내용 입력')
            sw=0
        }
        if(sw === 1){
            addTogether(togetherDTO)
                 .then(
                    alert('등록완료')
                 )
                 .catch(
                    error => console.error(error)
                 )
        }
    }
    //날짜 변경에 따른 subDTO 유동적 명령

    //subDTO
    const onSubDTO = (item) => {
        // setSubDTO([...subDTO,item])
        setSubDTO((prevSubDTO) => {
            const updatedSubDTO = prevSubDTO.filter((prevItem) => prevItem !== selectedItem);
            return [...updatedSubDTO, item];
        });
    }

    useEffect(()=> {
        const usd = subDTO.slice().sort((a, b) => a.endTime - b.endTime).sort((a, b) => a.nDay - b.nDay);
        setSubDTO(usd)
    },[])

    const onToTNum = (e) => {
        if(e.target.value <= 10 && e.target.value >= 2) {
            setTogetherDTO({ ...setTogetherDTO, tNum: e.target.value });
        }
    }

    const onInput = (e) => {
        const {name, value} = e.target

        setTogetherDTO({...togetherDTO,[name]:value})
        if (name === 'startDate') {
            if(e.target.value > endDate) {
                setTogetherDTO({...togetherDTO,startDate:value, endDate:value})
            }
            const oldsDay = new Date(startDate)
            const newsDay = new Date(e.target.value)
            const sub = (oldsDay - newsDay)/(1000 * 60 * 60 * 24)
            if(sub > 0) {
                setSubDTO(item => {
                    const utd = item.map(item2 => 
                        item2 !== null  && { ...item2, nDay : (item2.nDay+sub) }
                    );
                    return utd;
                });
            }
            if(sub < 0) {
                setSubDTO(item => {
                    const utd = item.filter(item2 => item2.nDay > -sub).map(item3 => 
                        item3 !== null  && { ...item3, nDay : (item3.nDay+sub) }
                    );
                    return utd;
                });
            }
        }
    }
    const [isAdd, setIsAdd] = useState(true)

    const onAdd = () => {
        setIsAdd(false)
    }
    const onClose = () => {
        setIsAdd(true)
        setSelectedItem(null);
    }

    const onReset = (e) => {
        e.preventDefault()

        setTogetherDTO ({
            title: '',      //제목
            startDate: nowDay,  //시작날짜
            endDate: nowDay,    //끝나는날짜
            context: '',    //내용
            tNum: 2,       //모집인원 
        })
        setSubDTO([])
    }

    const [selectedItem, setSelectedItem] = useState(null);

    const updateSubDTO = (index) => {
        
        const selectedItem = subDTO[index];
        setSelectedItem(selectedItem);

        onAdd();
    }
    const resetSubDTO = (index) => {
        setSubDTO(subDTO.filter((item, i) => i !== index));
    }

    return (
        <>
        {/* <button onClick={()=>{console.log(JSON.stringify(subDTO))}}></button> */}
        <div className={Style.writeForm}>
        <div className={Style.writeFormInner}>
            <div>
                <input type="text" 
                       className={Style.title}
                       name="title" 
                       value={title} 
                       onChange={onInput}
                       size="50" placeholder="ex) 12월 3박4일 제주 바다 보러갈 동행 3명 구해요"/>
            </div>        
            <div>
                시작 날짜<input type='date' name='startDate' min={nowDay} value={startDate} className={Style.startDate}
                                onChange={onInput}
                                />
                마지막 날짜<input type='date' name='endDate' min={startDate} value={endDate} onChange={onInput} className={Style.endDate}/>
                <div style={{float:'right'}}>인원 
                <input className={Style.mem} type="number" min="2" max="10" step="1" value={tNum} onChange={(e) => onToTNum(e)}/></div>
            </div>            
            <div style={{clear:'both'}}></div>

            {/* 선택? 검색한? 하루하루치의 정보 */}
            <div className={Style.writedateForm}>
                <div className={Style.writedateCardForm}>
                    {subDTO.map((item, index) => (
                        <div className={Style.writedateCard} key={index}>
                            <div className={Style.writedateCard_top}>
                            <button className={Style.updateSubDTO} onClick={() => updateSubDTO(index)}>수정</button>
                            <button className={Style.resetSubDTO} onClick={() => resetSubDTO(index)}>삭제</button>
                            <p>{item.nDay}DAY</p></div>
                            <div className={Style.writedateCard_foot}>
                            {
                            item.place !== null &&
                                <p>{item.place.name}</p>
                            }
                            {
                            item.customDTO !== null &&
                                <p>{item.customDTO.placeName}</p>
                            }
                            <br/><p>{item.context}</p>
                            </div>
                        </div>
                    ))}
                    <div className={Style.writedateCard_de} onClick={onAdd}>
                            <div className={Style.writedateCard_de_text}>일정 추가</div>
                    </div>
                </div>
            </div>
            <div>
                <textarea className={Style.context} name="context"  value={context} onChange={onInput} rows="10" cols="50"
                    placeholder="1. 현재 동행이 있나요? 
                    ex) 혼자에요 / 동행 1명이 있어요 
                    
                    2.어떤 동행을 찾고 있나요? 
                    ex) 맛집 탐방을 좋아하는 20대 여성 동행을 찾아요!
                    
                    3. 원하는 여행 코스가 있다면 알려주세요!
                    
                    (1000자 이내) "/>
            </div>
            <div className={Style.savebutton}>
                <div className={Style.save} onClick={togetherSave}>저장</div>
                &nbsp;
                <div className={Style.reset} onClick={onReset}>다시쓰기</div>
            </div>
        <div id="resultDiv"></div>
        
        {
            !isAdd && 
            (
            <PlaceSelect
                onClose={onClose}
                startDate={startDate}
                endDate={endDate}
                onSubDTO={onSubDTO}
                GoogleMap={GoogleMap} 
                Autocomplete={Autocomplete} 
                selectedItem={selectedItem}
                        /> 
            )
        }
        </div>
        </div>
        
        </>
    );
};


export default PlaceWriteForm;