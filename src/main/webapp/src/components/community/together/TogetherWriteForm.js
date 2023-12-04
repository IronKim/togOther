import React, { useEffect,useState } from 'react';
import Style from '../../../css/together.module.css'

import { addTogether, deleteTogether, deleteTogetherCustom } from '../../../api/TogetherApiService';
import { addSubItem} from '../../../api/PlannerApiService';
import { addCustomPlace,getCustomPlace } from '../../../api/PlaceApiService';
import PlaceSelect from './TogetherPlaceSelect';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';

import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../stores/mainStore';
import sweet from 'sweetalert2'; 


const PlaceWriteForm = () => {

    const {user} = useUserStore();
    
    //오늘 날짜 구하는
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    const nowDay = `${year}-${month}-${date}`;
    //저장한다이
    const [togetherDTO, setTogetherDTO] = useState({
        togetherSeq:'',
        userSeq: user.userSeq,
        useremail: user.email,
        userid: user.id,
        userName: user.name,
        userGender: user.gender,
        userProfileImage: user.profileImage,
        code:1,
        title: '',      //제목
        startDate: nowDay,  //시작날짜
        endDate: nowDay,    //끝나는날짜
        context: '',    //내용
        tnum: 2,       //모집인원   
    });
    const [subDTO, setSubDTO] = useState([])
    
    const{togetherSeq,
          userSeq,useremail,userid,userName,userGender,userProfileImage,
          title,startDate,endDate,context,tnum} 
        = togetherDTO 

    const [contextDiv, setContextDiv] = useState('')
    const [writedateCardFormDiv, setWritedateCardFormDiv] = useState('')
    const [titleDiv, setTitleDiv] = useState('')
    const navigate = useNavigate()
    const togetherSave = (e) => {
        e.preventDefault()

        var sw = 1
        if(!title){
            setTitleDiv('제목을 입력하세요')
            sw=0
        }else{
            setTitleDiv('')
        }
        if(!context){
            setContextDiv('내용을 입력하세요')
            sw=0
        }else{
            setContextDiv('')
        }
        if(subDTO === null || subDTO.length === 0){
            setWritedateCardFormDiv('일정을 추가하세요')
            sw=0
        }else{
            setWritedateCardFormDiv('')
        }
        if(sw === 1){
            addTogether(togetherDTO)
                 .then(res => {
                    // subDTO 저장
                    subDTO.map(item => {
                        if(item.place !== null ){
                            const subItem = {toMainSeq:res.data,
                                             nday: item.nday, code : item.code,
                                             startTime : item.startTime, 
                                             endTime : item.endTime, 
                                             context : item.context,
                                             placeSw: 0, 
                                             placeSeq: item.place ? item.place.placeSeq : null}
                                addSubItem(subItem)
                                .then(res2 => console.log(res2))
                                .catch(e => console.log(e))
                        }
                    })
                        //customDTO에 저장
                        subDTO.map(item => {
                        if(item.customDTO !== null){
                            addCustomPlace(item.customDTO)
                            .then(res2 => {
                                const subItem = {toMainSeq: res.data, 
                                                 nday: item.nday, code : item.code,
                                                 startTime : item.startTime, 
                                                 endTime : item.endTime, 
                                                 context : item.context,
                                                 placeSw: 1, plCustomSeq : res2.data}
                                addSubItem(subItem)
                                .then(res3 => console.log(res3))
                                .catch(e => console.log(e))

                            })
                        .catch(e => console.log(e))
                        }
                    })
                    sweet.fire({
                        title: "등록이 완료되었습니다.",
                        icon: "success"
                    })
                    navigate('/community/')
                 })
                 .catch(error => console.error(error))
        }
    }

    //수정
    const togetherUpdate = (e) =>{
        e.preventDefault()

        var sw = 1

        if(!title){
            setTitleDiv('제목을 입력하세요')
            sw=0
        }else{
            setTitleDiv('')
        }
        if(!context){
            setContextDiv('내용을 입력하세요')
            sw=0
        }else{
            setContextDiv('')
        }
        if(subDTO === null || subDTO.length === 0){
            setWritedateCardFormDiv('일정을 추가하세요')
            sw=0
        }else{
            setWritedateCardFormDiv('')
        }
        if(sw === 1){
            const togetherSeq = togetherDTO.togetherSeq
            deleteTogether(togetherSeq)
            .then(() => {
            addTogether(togetherDTO)
                 .then(res => {
                    // subDTO 저장
                    subDTO.map(item => {
                        if(item.place !== null && item.place !== undefined ){
                            console.log('엥')
                            const subItem = {toMainSeq:res.data,
                                             nday: item.nday, code : item.code,
                                             startTime : item.startTime, 
                                             endTime : item.endTime, 
                                             context : item.context,
                                             placeSw: 0, 
                                             placeSeq: item.place ? item.place.placeSeq : null}
                                addSubItem(subItem)
                                .then(res2 => console.log(res2))
                                .catch(e => console.log(e))
                        }
                    })
                        //customDTO에 저장
                        subDTO.map(item => {
                        if(item.customDTO !== null && item.customDTO !== undefined){
                            
                            addCustomPlace(item.customDTO)
                            .then(res2 => {
                                const subItem = {toMainSeq: res.data, 
                                                 nday: item.nday, code : item.code,
                                                 startTime : item.startTime, 
                                                 endTime : item.endTime, 
                                                 context : item.context,
                                                 placeSw: 1, plCustomSeq : res2.data}
                                addSubItem(subItem)
                                .then(res3 => console.log(res3))
                                .catch(e => console.log(e))
                            })
                        .catch(e => console.log(e))
                        }
                    })
                    sweet.fire({
                        title: "수정이 완료되었습니다.",
                        icon: "success"
                    })
                    setSelectedItem(null)
                    window.scrollTo(0, 0);
                    navigate('/community/')
                 })
                 .catch(error => console.error(error))
                })
                .catch(error => console.error(error))
        }
    }
    //날짜 변경에 따른 subDTO 유동적 명령

    //subDTO
    const onSubDTO = (item) => {
        setSubDTO((prevSubDTO) => {
            const updatedSubDTO = prevSubDTO.filter((prevItem) => prevItem !== selectedItem);
            return [...updatedSubDTO, item];
        })
        
    }

    useEffect(()=> {
        const usd = subDTO.slice().sort((a, b) => a.endTime - b.endTime).sort((a, b) => a.nday - b.nday);
        setSubDTO(usd)
    },[])

    const onToTNum = (e) => {
        if(e.target.value <= 10 && e.target.value >= 2) {
            setTogetherDTO({ ...togetherDTO, tnum: e.target.value });
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
                        item2 !== null  && { ...item2, nday : (item2.nday+sub) }
                    );
                    return utd;
                });
            }
            if(sub < 0) {
                setSubDTO(item => {
                    const utd = item.filter(item2 => item2.nday > -sub).map(item3 => 
                        item3 !== null  && { ...item3, nday : (item3.nday+sub) }
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
            tnum: 2,       //모집인원 
        })
        setSubDTO([])
    }

    const [selectedItem, setSelectedItem] = useState(null)

    const updateSubDTO = (index) => {
        
        const selectedItem = subDTO[index]
        setSelectedItem(selectedItem)

        onAdd()
    }
    const resetSubDTO = (index) => {
        setSubDTO(subDTO.filter((item, i) => i !== index))
    }
    
    //뷰에서 수정하러 가져옴
    const location = useLocation()
    const [update,setUpdate] = useState(false)

    useEffect(() => {
        const together = location.state?.togetherDTO;
        const sub = location.state?.subDTO;
        const place = location.state?.place;
        const custom = location.state?.custom;
    
        if (together) {
            setTogetherDTO(together)
        }
    
        if (sub && place && custom) {
            setSubDTO((prevSubDTO) => {
                const newSubDTO = sub.map((subItem, index) => ({
                    subSeq: subItem.subSeq,
                    plMainSeq: subItem.plMainSeq,
                    toMainSeq: subItem.toMainSeq,
                    nday: subItem.nday,
                    code: subItem.code,
                    startTime: subItem.startTime,
                    endTime: subItem.endTime,
                    context: subItem.context,
                    ...(place.find(placeItem => placeItem.placeSeq === subItem.placeSeq) ? { place: place.find(placeItem => placeItem.placeSeq === subItem.placeSeq) } : {}),
                    ...(custom.find(customItem => customItem.plCustomSeq === subItem.plCustomSeq) ? { customDTO: custom.find(customItem => customItem.plCustomSeq === subItem.plCustomSeq) } : {})
                }))
                return newSubDTO
            })
            setUpdate(true)
        }
    }, [location.state])
    
    return (
        <>
        <div className={Style.writeForm}>
        <div className={Style.writeFormInner}>
            <button onClick={() =>alert(JSON.stringify(subDTO))}>sub json 확인</button>
            <div>
                <input type="text" 
                       className={`${Style.title} ${Style.input}`}
                       name="title" 
                       value={title} 
                       onChange={onInput}
                       size="50" placeholder="ex) 12월 3박4일 제주 바다 보러갈 동행 3명 구해요"/>
            </div><div className={Style.titleDiv}>{titleDiv}</div>        
            <div>
                시작 날짜<input type='date' name='startDate' 
                                min={nowDay} value={startDate} 
                                className={Style.startDate}
                                onChange={onInput}/>

                마지막 날짜<input type='date' name='endDate' 
                                  min={startDate} value={endDate} 
                                  onChange={onInput} 
                                  className={Style.endDate}/>
                <div style={{float:'right'}}>인원 
                <input className={Style.mem} type="number" min="2" max="10" step="1" value={tnum} onChange={(e) => onToTNum(e)}/></div>
            </div>            
            <div style={{clear:'both'}}></div>

            {/* 선택? 검색한? 하루하루치의 정보 */}
            <div className={Style.writedateForm}>
                <div className={Style.writedateCardForm} name="writedateCardForm">
                    {subDTO.map((item, index) => (
                        <div className={Style.writedateCard} key={index}>
                            <div className={Style.writedateCard_top}>
                            <button className={Style.resetSubDTO} onClick={() => resetSubDTO(index)}>삭제</button>
                            <button className={Style.updateSubDTO} onClick={() => updateSubDTO(index)}>수정</button>
                            <p>{item.nday}DAY</p></div>

                            <div className={Style.writedateCard_foot}>
                            {
                            item.place !== null && item.place !== undefined && <p>{item.place.name}</p>
                            }
                            {
                            item.customDTO !== null && item.customDTO !== undefined && <p>{item.customDTO.placeName}</p>
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
            <div className={Style.writedateCardFormDiv}>{writedateCardFormDiv}</div>
            <div>
                <textarea className={`${Style.context} ${Style.textarea}`} name="context"  value={context} onChange={onInput} rows="10" cols="50"
                    placeholder="1. 현재 동행이 있나요? 
                    ex) 혼자에요 / 동행 1명이 있어요 
                    
                    2.어떤 동행을 찾고 있나요? 
                    ex) 맛집 탐방을 좋아하는 20대 여성 동행을 찾아요!
                    
                    3. 원하는 여행 코스가 있다면 알려주세요!
                    
                    (1000자 이내) "/>
            </div>
            <div className={Style.contextDiv}>{contextDiv}</div>
            <div className={Style.savebutton}>
                <div className={Style.save} onClick={!update ? togetherSave : togetherUpdate}>{!update ? '저장' : '수정'}</div>
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