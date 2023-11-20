import React,{useEffect,useState,useCallback,useRef} from 'react';
import Style from '../../css/together.module.css'
import { getCity } from '../../api/AdvisorApiService';
import { getPlaceList } from '../../api/PlaceApiService';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ["places"];
const containerStyle = {
    width: '90%',
    height: '335px',
    margin: 'auto'
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const PlaceSelect = (props) => {

    const {onClose,startDate,endDate,onSubDTO,
           GoogleMap, selectedItem, Autocomplete } = props
    console.log(startDate, endDate);
    const [opTime,setOpTime] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])
    const [searchCount, setSearchCount] = useState(true)
    const [searchCity, setSearchCity] = useState('')
    const [searchedCitySeq, setSearchedCitySeq] = useState([]);
    const [searchPlace, setSearchPlace] = useState([]); 
    const [selDate,setSelDate] = useState()

    //있는 장소에서 선택시
    const [subDTO,setSubDTO] = useState({
        nDay: null,
        id: 1,
        startTime: 0,
        endTime: 0,
        context: '',
        place: null,
        customDTO: null,
    })
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
    //시간 매커니즘
    const [sel,setSel] = useState(true)
    const [save,setSave] = useState(false)

    const onStart = (item,none) => {
        setSel(false);
        if (none !== 0) setSubDTO({...subDTO,startTime : item})
        console.log("Start Time:", item);
    }
    const onEnd = (item,none) => {
        setSave(true)
        if (none !== 0) setSubDTO({...subDTO,endTime : item})
    }
    const onRe = () => {
        setSel(true)
        setSave(false)
        setSubDTO({...subDTO,startTime : 0 ,endTime : 0} )
    } 

    //city목록 가져오기
    const [city, setCity] = useState([])
    useEffect(()=> {
        getCity()
        .then(res => {
            setCity(res.data)
        })
        .catch(e => console.log(e))
    },[])
    //날짜 선택시 nDay 잡기
    // useEffect(()=> {
    //     setSubDTO({...subDTO,nDay : (new Date(selDate) - new Date(startDate))/(1000 * 60 * 60 * 24)+1})
    // },[selDate])
    useEffect(() => {
        setSubDTO(prevSubDTO => ({
            ...prevSubDTO,
            nDay: (new Date(selDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1,
        }));
    }, [selDate, startDate]);

    
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
    // const filterPlacesByCitySeq = () => {
    //     const filteredPlaces = place.filter(item => searchedCitySeq.includes(item.citySeq))

    //     setSearchPlace(filteredPlaces);
    // };
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
    const PlaceClick = (place,customDTO) =>{
        setSubDTO({
            ...subDTO,
            place : place, 
            customDTO : place ? null : customDTO
        })
        onSearch()
    }
    const onSchedule = (e) =>{
        e.preventDefault();
    
        if (save) {
            if(!isNaN(subDTO.nDay)){
                    if(subDTO.place || subDTO.customDTO){
                        onClose();
                        onSubDTO(subDTO);

                }else{
                    alert('장소를 선택해 주세요')
                }
            }else{
                alert('날짜를 지정해주세요')
            }
        } else{
            alert('시간을 지정해 주세요')
        }
        
    }


    //커스텀
    const [startCustom, setStartCustom] = useState(false)
    const onCustom = () => {
        setStartCustom(true)
    }
    const onCustomB = () => {
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
    
    useEffect(() => {
        if (selectedItem) {
            setSubDTO(selectedItem);
        }
    }, [selectedItem]);
    return (
        <>
        <div className={Style.bg} onClick={onClose}></div>
        <div className={Style.placeSearchForm}>
        {//searchCount가 트루면 searchForm
            searchCount === true &&
            (
            <div>
                <div className={Style.day}>
                <div className={Style.calender}>
                    <input type='date'className={`${Style.inputday} ${Style.input}`} name='endDate' min={startDate} max={endDate} 
                    value={selDate === startDate ? 0 : selDate}
                    onChange={(e) => setSelDate(e.target.value)}/> 
                    
                </div>
                <div className={Style.timeDiv}>
                    {
                        opTime.filter(item => item >= subDTO.startTime).map(item => <div key={item} 
                            className={Style.timeItem}  style={{backgroundColor: sel ? 'whitesmoke' : (item === subDTO.startTime ? 'darkgray' : 
                            (item === subDTO.endTime ? 'darkgray' : (item < subDTO.endTime && item > subDTO.startTime) ? 'lightgray' : 'whitesmoke'))}} 
                        //타임버튼 스타일색 동적
                        onClick={() => (sel ? onStart(item) : (item === subDTO.startTime ? onRe() : onEnd(item)) )} //클릭시 행동 명령
                        >{item.toString().padStart(2, '0')}:00</div>)
                    }
                </div>
                </div>
                {/* <div style={{clear:'right'}}></div> */}
                    <button className={Style.addButtons} onClick={onSearchSelect} style={{float:'right',margin:'30px 10px'}}>
                    장소 {subDTO.place === null ? '추가' : '수정'}</button>
                <div style={{clear:'both'}}></div>
                    {!isNaN(subDTO.nDay)  && <div style={{fontSize:'22px',fontWeight:'bold',float:'left'}}>
                        Day {subDTO.nDay}</div>}
                    {/* <div style={{clear:'both'}}></div> */}
                <div style={{minHeight:'70px'}}>
                {/* <button onClick={()=>console.log(subDTO.place, subDTO.customDTO)}>ㅎㅎ</button> */}
                {subDTO.place !== null && 
                    (
                        <div className={Style.placeCard}>
                        {subDTO.place.name}
                        <img src={subDTO.place.image}  className={Style.placeImg} />
                        <br/><br/>
                        <p className={Style.placeContextP}>{subDTO.place.context1}</p>
                    </div>
                    )
                }
                {
                    subDTO.customDTO !== null &&
                    (
                        <div className={Style.placeCard}>
                        {subDTO.customDTO.placeName}
                    </div>
                    )
                }
                </div>
                <p style={{fontSize:'17px',fontWeight:'bold',marginBottom: '5px'}}>내용</p>
                    <textarea rows="10" cols="43" value={subDTO.context} className={`${Style.placeContext} ${Style.textarea}`}
                    onChange={(e) => setSubDTO({...subDTO,context : e.target.value})}/>

                    <button className={Style.xBut} onClick={(e) =>onSchedule(e)}>
                        등록
                    </button>
            </div>
            
            )
        }

        {/* searchCount가 false면 검색창으로 간다. */}
        {
            searchCount === false &&
            (
                <div>
                {startCustom === true ? 
                    (<div>
                        {/* 지도 */}
                            <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={16}
                            onLoad={(map) => setMap(map)}
                            className={Style.containerStyle}
                            >
                            </GoogleMap>
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                            <input
                                type="text"
                                id="autocomplete"
                                placeholder="검색어 입력"
                                className={`${Style.mapInput} ${Style.input}` }
                            />
                            </Autocomplete>
                        {/* <div>
                            <p>placeName:{customDTO.placeName}</p>
                            <p>Address: {customDTO.address}</p>
                            <p>Latitude: {customDTO.latitude}</p>
                            <p>Longitude: {customDTO.longitude}</p>
                        </div> */}
                        <div
                                    className={Style.placeCard}
                                    onClick={() => customDTO.placeName !== '' && PlaceClick(null,customDTO)}
                                >
                            <span>{customDTO.placeName}</span> <br />
                            <br />
                            <td>{customDTO.address}</td>
                        </div>
                            <button className={Style.onCustomB} onClick={onCustomB} >뒤로</button>
                    </div>)
                 : (
                    <>
                        <div>
                            <input
                                size={36}
                                className={`${Style.searchCity} ${Style.input}`}
                                type='text'
                                name='search'
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                placeholder='검색을 원하는 도시이름'
                            />
                        </div>
                        <br></br>
                        <div className={Style.placeCardForm}>
                            {searchCity !== '' &&
                                searchPlace.map((place) => (
                                    <div
                                        className={Style.placeCard}
                                        key={place.id}
                                        onClick={() => PlaceClick(place,null)}
                                        >
                                        <span>{place.name}</span> <br />
                                        <br />
                                        <td>{place.context1}</td>
                                        <img src={place.image} />
                                    </div>
                                ))}
                            {/* 커스텀으로 간다 */}
                        </div>
                            {searchCity === '' && (
                                <div>
                                    <button className={Style.back} onClick={onSearch}>뒤로</button>
                                    <button className={Style.makeButtons} onClick={onCustom}>도시 만들기</button>
                                </div>
                            )}
                    </>
                )}
            </div> 
            )
        }
        <div style={{opacity:0}}>
            <LoadScript
                    googleMapsApiKey="AIzaSyBI72p-8y2lH1GriF1k73301yRI4tvOkEo"
                    libraries={libraries}
            />
        </div>
        {/* <div className="map"
                             style={{ width: "500px", height: "500px" }}
                             ref={mapRef}
                            ></div> */}
        </div>
        </>
    );
};

export default PlaceSelect;