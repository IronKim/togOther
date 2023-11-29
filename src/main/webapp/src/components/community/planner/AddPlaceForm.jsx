import React,{useEffect,useState,useCallback,useRef} from 'react';
import styles from '../../../css//planner.module.css'
import backBut from '../../../assets/image/backBut.png'
import { getCityList } from '../../../api/CityApiService';
import { getPlaceList } from '../../../api/PlaceApiService';

const containerStyle = {
    position: 'absolute',
    width: '70%',
    height: '60%',
    left: '15%'
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const AddPlaceForm = (props) => {
    const {onClose,firstTime,lastTime,nDay,onSub,upDTO,updateItem,GoogleMap,Autocomplete,plannerTitle} = props
    const [opTime,setOpTime] = useState([]);
    const [sel,setSel] = useState(true)
    const [save,setSave] = useState(false)
    const [subDTO,setSubDTO] = useState({
        nDay,
        code : 0,
        startTime : 0,
        endTime : 0,
        context : '',
        place : null,
        customDTO: null
    })

    useEffect(() => {
        const ar = [];
        for(let i = firstTime;i <= lastTime;i++) {
            ar.push(i)
        } 
        setOpTime(ar)
        const upSub = upDTO;
        if (upSub !== undefined) {
            setSubDTO(upSub)
            onStart(upSub.startTime,0)
            onEnd(upSub.endTime,0)
        }
    },[])

    const onStart = (item,none) => {
        setSel(false);
        if (none !== 0) setSubDTO({...subDTO,startTime : item})
    }
    const onEnd = (item,none) => {
        setSave(true)
        if (none !== 0) setSubDTO({...subDTO,endTime : item})
    }
    const onRe = () => {
        setSel(true)
        setSave(false)
        setSubDTO({...subDTO,startTime : 0,endTime : 0})
    } 
    const onSave = (subDTO) => {
        if (save) {
            if(subDTO.place || subDTO.customDTO) onSub(subDTO)
            else alert('장소를 선택해 주세요')
        }
        else alert('시간을 지정해주세요')
    }
    const onUpdate = (upDTO,subDTO) => {
        if (save) {
            if(subDTO.place || subDTO.customDTO) updateItem(upDTO.endTime,subDTO)
            else alert('장소를 선택해 주세요')
        }
        else alert('시간을 지정해주세요')
    }
////////누나가 준거!!!/////////


const [searchCount, setSearchCount] = useState(true)
const [searchCity, setSearchCity] = useState('')
const [searchedCitySeq, setSearchedCitySeq] = useState([]);
const [searchPlace, setSearchPlace] = useState([]); 

//지도에서 선택시
const [map, setMap] = useState(null);
const [customDTO, setCustomDTO] = useState({
  placeName:'',
  address: '',
  latitude: null,
  longitude: null,
});

// search화면으로
const onSearch = () => {
    setSearchCount(true)
}
const onSearchSelect = () => {//장소추가 버튼
    setSearchCount(false)
}
//city목록 가져오기 및 검색에 city 값 넣기
const [city, setCity] = useState([])
useEffect(()=> {
    getCityList()
    .then(res => {
        setCity(res.data)
        if(plannerTitle !== undefined && plannerTitle.length > 0) {
            setSearchCity(res.data.find(item=> item.citySeq === plannerTitle[plannerTitle.length-1]).cityName)
        }
    })
    .catch(e => console.log(e))
},[])
//city검색
const citySearch = city.filter((item) => item.cityName.includes(searchCity))

// cityName에 해당하는 citySeq를 배열로 추출하여 상태에 저장
const citySeq = () => {
    const citySeqList = citySearch.map(item => item.citySeq);
    setSearchedCitySeq(citySeqList);
};
// 검색어가 변경될 때마다 citySeq 추출 함수 호출
useEffect(() => {
    citySeq();
}, [searchCity, city]);

//place목록 가져오기
const[place, setPlace] = useState([])

useEffect(()=>{
    getPlaceList()
    .then(res =>{
        setPlace(res.data)
    })
    .catch(e => console.log(e))
},[])

//place검색
const placeSearch = place.filter((item) => item.name.includes(searchCity))

// place에서 citySeq에 해당하는 항목 필터링
const filterPlacesByCitySeq = () => {
    const filteredPlaces = place.filter(item => 
        searchedCitySeq.includes(item.citySeq) || item.name.toLowerCase().includes(searchCity.toLowerCase())
    );

    setSearchPlace(filteredPlaces);
};
// citySeq가 변경될 때마다 place 필터링 함수 호출
useEffect(() => {
    filterPlacesByCitySeq();
}, [searchedCitySeq, place]);


//선택한 장소
const PlaceClick = (pl,cu) =>{
    if(pl !== null) {
        setSubDTO({
            ...subDTO,
            place : pl, 
            customDTO : null
        })
    }
    if(cu !== null) {
        setSubDTO({
            ...subDTO,
            place : null, 
            customDTO : cu
        })
    }
    onSearch()
}


    //커스텀
    const [startCustom, setStartCustom] = useState(false)
    const onCustom = () => {
        setStartCustom(true)
    }
    const onCustomOut = () => {
        setStartCustom(false)
    }

    //지도
    const autocompleteRef = useRef(null);
    const markerRef = useRef(null);

    const onLoad = useCallback((autocomplete) => {
        
        autocompleteRef.current = autocomplete;
    }, []);



    const onPlaceChanged = useCallback(() => {
    const autocomplete = autocompleteRef.current;

    if (autocomplete !== null) {
        const placeResult = autocomplete.getPlace();
        setCustomDTO({
        placeName: placeResult.name || '',
        address: placeResult.formatted_address || '',
        latitude: placeResult.geometry.location.lat(),
        longitude: placeResult.geometry.location.lng(),
        });

        if (map && placeResult.geometry) {
        // 이전 마커를 제거
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }

        // 새로운 마커 생성
        const newMarker = new window.google.maps.Marker({
            position: placeResult.geometry.location,
            map: map,
            title: placeResult.name,
        });

        // 새로운 마커로 참조 업데이트
        markerRef.current = newMarker;

        // 지도를 검색 위치로 이동
        map.panTo(placeResult.geometry.location);
        }
    } else {
        console.log(console.error());
    }
    }, [map]);

    /////////////////
    return (
        <>  
            <div className={styles.bg} onClick={onClose}></div>
            <div className={styles.addplaceform}>
            {searchCount === true && 
            <div>
                <div className={styles.timeDiv}>
                        {
                            opTime.filter(item => (sel ? (item !== lastTime) : (item >= subDTO.startTime))).map(item => <div key={item} 
                            className={styles.timeItem} style={{backgroundColor: sel ? 'whitesmoke' : (item === subDTO.startTime ? 'darkgray' : 
                            (item === subDTO.endTime ? 'darkgray' : (item < subDTO.endTime && item > subDTO.startTime) ? 'lightgray' : 'whitesmoke'))}} 
                            //타임버튼 스타일색 동적
                            onClick={() => (sel ? onStart(item) : (item === subDTO.startTime ? onRe() : onEnd(item)) )} //클릭시 행동 명령
                            >{item.toString().padStart(2, '0')}:00</div>)
                        }
                </div>
                <button className={styles.buttons} onClick={onSearchSelect} style={{float:'right',margin:'30px 10px'}}>
                장소 {subDTO.place === null && subDTO.customDTO === null ? '추가' : '수정'}</button>
                <div style={{clear:'both'}}></div>
                {/* 장소들어갈 박스 */}
                {
                subDTO.place !== null && 
                    <div className={styles.placeCard} onClick={onSearchSelect}>
                        {subDTO.place.name}
                        <img src={subDTO.place.image}  className={styles.placeImg} />
                        <br/><br/>
                        <p className={styles.placeContextP}>{subDTO.place.context1}</p>
                    </div>
                }
                {
                subDTO.customDTO !== null &&
                    <div className={styles.placeCard} onClick={onSearchSelect}>
                        {subDTO.customDTO.placeName}
                        <br/><br/>
                        <p className={styles.placeContextP}>{subDTO.customDTO.address}</p>
                    </div>
                }
                <p style={{fontSize:'17px',fontWeight:'bold'}}>내용</p>
                <textarea rows="10" cols="40" value={subDTO.context} className={styles.addPlaceContext}
                onChange={(e) => setSubDTO({...subDTO,context : e.target.value}) } />
                <br/>
                <button style={{float:'left'}} className={styles.buttons} 
                onClick={upDTO === undefined ?  () => onSave(subDTO) : () => onUpdate(upDTO,subDTO)}>등록</button>
      
            </div>}
                {/*  */}

                {
                    searchCount === false &&
                    (
                        <div>
                        {startCustom === true ? 
                            (<div>
                                {/* 지도 */}
                                <img className={styles.xBut} style={{float:'right' , marginBottom:'20px'}} 
                                onClick={onCustomOut}  src={backBut}/> 
                                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                    <input
                                        type="text"
                                        id="autocomplete"
                                        placeholder="장소를 검색해주세요"
                                        className={styles.mapInput}
                                    />
                                    </Autocomplete>
                                <div
                                    className={styles.placeCard}
                                    onClick={() => customDTO.placeName !== '' && PlaceClick(null,customDTO)}
                                >
                                    <span>{customDTO.placeName}</span> <br />
                                    <br />
                                    <p>{customDTO.address}</p>
                                </div>
                                <br/>
                                <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={16}
                                        options={{disableDefaultUI: true}}
                                        onLoad={(map) => setMap(map)}
                                    />
                            </div>)
                        : (
                            <>
                                <img className={styles.xBut} style={{float:'left' , marginBottom:'20px'}} 
                                onClick={onSearch}  src={backBut}/> 
                                {/* 커스텀으로 간다 */}
                                <button style={{float:'right'}} className={styles.buttons} onClick={onCustom}>지도로 찾기</button>
                                <div style={{clear:'left'}}></div>
                                {/* 검색 */}
                                <input size={36} type='text' style={{float:'left'}}
                                name='search'value={searchCity}onChange={(e) => setSearchCity(e.target.value)}
                                placeholder='장소를 검색해주세요' className={styles.placeSearch}/>
                                <div className={styles.placeCardForm}>
                                    {searchCity !== '' &&
                                        searchPlace.map((place) => (
                                            <div className={styles.placeCard} key={place.id}
                                            onClick={() => PlaceClick(place,null)} >
                                            <span>{place.name}</span>
                                            <img src={place.image && place.image} className={styles.placeImg} />
                                            <br/><br/>
                                            <p className={styles.placeContextP}>{place.context1}</p>
                                            </div>
                                        ))}
                                </div>
                            </>
                        )}
                    </div> 
                    )
                }

                {/*  */}
            </div>
        </>
    );
};

export default AddPlaceForm;

//     sub : [{
//         order,
//         nDay,
//         id : 0,
//         startTime,
//         endTime,
//         context
//     }],