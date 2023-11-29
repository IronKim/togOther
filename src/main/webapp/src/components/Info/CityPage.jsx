import CityWeatherApi from './CityWeatherApi';
import React, { useEffect, useState } from 'react';
import styles from '../../css/Info/CityPage.module.css';
import CityMoneyApi from './CityMoneyApi';  
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCityBySeq } from '../../api/CityApiService';
import { getPlaceListByCitySeq } from '../../api/PlaceApiService';
import WeatherIcon from '../../constants/WeatherIcon';
import weatherData from '../../constants/WeatherData';
import Like from './Like';
import { useUserStore } from '../../stores/mainStore';

const CityPage = () => { 
    const { citySeq } = useParams();

    const [city, setCity] = useState('');
    const [placeData, setPlaceData] = useState(['']);
    const [filteredPlaceData, setFilteredPlaceData] = useState([]);
    const [activeButton, setActiveButton] = useState('TouristSpot');
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState(''); 
    const [cityWeather, setCityWeather] = useState(null); // 날씨 정보를 저장할 상태
    const [selectedRecommend, setSelectedRecommend] = useState('random');
    const [drop, setDrop] = useState(false);

    function shuffleArray(array) {
        let shuffledArray = array.slice();
      
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
      
        return shuffledArray;
      }

    const { user, getUserByToken } = useUserStore();
    const [userPlaceLike, setUserPlaceLike] = useState(user.likingPlace);


    useEffect(() => {
        setUserPlaceLike(user.likingPlace);
    },[user])
    
    useEffect(() => {

        getCityBySeq(citySeq)
            .then(res => {
                setCity(res.data);
                console.log(res);
                setSelectedCity(res.data.cityName); // 선택된 도시 정보 업데이트
            })
            .catch(e => console.log(e));

        getPlaceListByCitySeq(citySeq)
            .then(res => {
                setPlaceData(res.data);
                setFilteredPlaceData(
                    shuffleArray(res.data.filter(item => item.code === (activeButton === 'TouristSpot' ? 1 : 0))).slice());
            })
            .catch(e => console.log(e));
    }, [citySeq]);

    useEffect(() => {

        setFilteredPlaceData(
            shuffleArray(placeData.filter(item => item.code === (activeButton === 'TouristSpot' ? 1 : 0))).slice());
  
    }, [activeButton]);

    const changeButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        let filteredData = buttonName === 'TouristSpot' ? placeData.filter(item => item.code === 1) : 
                             buttonName === 'store' ? placeData.filter(item => item.code === 0) :
                             placeData;
        setFilteredPlaceData(filteredData);

        if(activeButton === 'TouristSpot') {
           if(selectedRecommend === 'travel') updateRecommend('food')
        } else if(activeButton === 'store') {
            if(selectedRecommend === 'food') updateRecommend('travel')
        } else {
            updateRecommend(selectedRecommend)
        }
        
    };

    const navigate = useNavigate();

    const onToPlacePage = (placeSeq) => {
        navigate(`/info/place/${placeSeq}`);
    }

    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const selectCity = (citySeq) => {
        getCityBySeq(citySeq)
            .then(res => {
                setSelectedCity(res.data.cityName);
            })
            .catch(e => console.log(e));
    }
    //날씨 정보를 받아오는 함수
    const updateWeatherData = (weatherData) => {
        setCityWeather(weatherData);
    };

    const updateRecommend = (selectedRecommend) => {
        // 여행 추천 기준 변경시 실행할 로직 추가
        setSelectedRecommend(selectedRecommend)

        setDrop(false);
    };

    const selectItemClick = (item) => {
        updateRecommend(item); // 추천 기준 변경

        if (item === 'mbti') {
            let filteredData = filteredPlaceData.slice().sort((a, b) => {
                // 특정 단어가 포함된 항목을 우선순위로 정렬
                
                let keyword = []; // 여기에 우선순위를 두고 싶은 단어를 입력하세요

                if(user.mbti.includes('I')) {
                    keyword.push('휴양')
                    keyword.push('전시')
                }
                if(user.mbti.includes('E')) {
                    keyword.push('핫플')
                    keyword.push('활동')
                }
                if(user.mbti.includes('T')) {
                    keyword.push('자연')
                    keyword.push('쇼핑')
                }
                if(user.mbti.includes('F')) {
                    keyword.push('테마')
                    keyword.push('문화')
                }
                let isAKeyword = false;
                let isBKeyword = false;
                
                keyword.map(item => {
                    if(!isAKeyword) {
                        isAKeyword = a.tag.includes(item);
                    }
                    if(!isBKeyword) {
                        isBKeyword = b.tag.includes(item);
                    }
                })

                if (isAKeyword && !isBKeyword) {
                    return -1; // a를 우선순위로

                } else if (!isAKeyword && isBKeyword) {
                    return 1; // b를 우선순위로

                } else {
                    return a.tag.localeCompare(b.tag); // 일반적인 문자열 비교
                }
            });
        
            setFilteredPlaceData(filteredData);
        }
        if(item === 'travel') {
            let filteredData = filteredPlaceData.slice().sort((a, b) => {
                // 특정 단어가 포함된 항목을 우선순위로 정렬
                
                let keyword = []; // 여기에 우선순위를 두고 싶은 단어를 입력하세요

                if(user.likingTrip.includes('자연')) {
                    keyword.push('자연')
                }
                if(user.likingTrip.includes('문화')) {
                    keyword.push('문화')
                }
                if(user.likingTrip.includes('휴양')) {
                    keyword.push('휴양')
                }
                if(user.likingTrip.includes('전시')) {
                    keyword.push('전시')
                }
                if(user.likingTrip.includes('쇼핑')) {
                    keyword.push('쇼핑')
                }
                if(user.likingTrip.includes('핫플')) {
                    keyword.push('핫플')
                }
                if(user.likingTrip.includes('활동')) {
                    keyword.push('활동')
                }
                if(user.likingTrip.includes('테마')) {
                    keyword.push('테마')
                }
                let isAKeyword = false;
                let isBKeyword = false;

                keyword.map(item => {
                    if(!isAKeyword) {
                        isAKeyword = a.tag.includes(item);
                    }
                    if(!isBKeyword) {
                        isBKeyword = b.tag.includes(item);
                    }
                });
                if (isAKeyword && !isBKeyword) {
                    return -1; // a를 우선순위로

                } else if (!isAKeyword && isBKeyword) {
                    return 1; // b를 우선순위로

                } else {
                    return a.tag.localeCompare(b.tag); // 일반적인 문자열 비교

                }
            });
            setFilteredPlaceData(filteredData);
        }
        if(item === 'food') {
            let filteredData = filteredPlaceData.slice().sort((a, b) => {
                // 특정 단어가 포함된 항목을 우선순위로 정렬
                
                let keyword = []; // 여기에 우선순위를 두고 싶은 단어를 입력하세요

                if(user.likingFood.includes('펍')) {
                    keyword.push('펍')
                }
                if(user.likingFood.includes('디저트')) {
                    keyword.push('디저트')
                }
                if(user.likingFood.includes('한식')) {
                    keyword.push('한식')
                }
                if(user.likingFood.includes('양식')) {
                    keyword.push('양식')
                }
                if(user.likingFood.includes('중식')) {
                    keyword.push('중식')
                }
                if(user.likingFood.includes('일식')) {
                    keyword.push('일식')
                }
                if(user.likingFood.includes('로컬')) {
                    keyword.push('로컬')
                }
                if(user.likingFood.includes('기타')) {
                    keyword.push('기타')
                }
                if(user.likingFood.includes('비건')) {
                    keyword.push('비건')
                }
                if(user.likingFood.includes('육류')) {
                    keyword.push('육류')
                }
                if(user.likingFood.includes('해산물')) {
                    keyword.push('해산물')
                }
                if(user.likingFood.includes('면류')) {
                    keyword.push('면류')
                }
                if(user.likingFood.includes('밥류')) {
                    keyword.push('밥류')
                }
                if(user.likingFood.includes('국류')) {
                    keyword.push('국류')
                }
                let isAKeyword = false;
                let isBKeyword = false;

                keyword.map(item => {
                    if(!isAKeyword) {
                        isAKeyword = a.tag.includes(item);
                    }
                    if(!isBKeyword) {
                        isBKeyword = b.tag.includes(item);
                    }
                });
                if (isAKeyword && !isBKeyword) {
                    return -1; // a를 우선순위로

                } else if (!isAKeyword && isBKeyword) {
                    return 1; // b를 우선순위로

                } else {
                    return a.tag.localeCompare(b.tag); // 일반적인 문자열 비교

                }
            });
            setFilteredPlaceData(filteredData);
        }        

        if(item === 'like') {
            let filteredData = filteredPlaceData.slice().sort((a, b) => a.like - b.like)

            setFilteredPlaceData(filteredData)
        }
        if(item === 'comment') {

        }
    }  

    
    return (

        <div style={{userSelect:'none'}}>
            <div className={ styles.mainImgDiv }>
                <img src={city.cityImage} className={ styles.citypage }/>
                <div className={ styles.cityName }>{city.cityName}</div>
            </div>
            <div className={styles.main}>
            {/* ----------------검색---------------- */}
            {/* <div className={ styles.inputBox }>
                <input className={ styles.input } type= 'text' placeholder='Search...'/>
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" className={ styles.img }></img>
            </div> */}


            <div className={styles.api}>
            {/*  날씨 정보 표시 */}
            <div className={styles.weather}>
                <div className={styles.weatherCity}>
                    <CityWeatherApi selectedCity={selectedCity} onWeatherData={updateWeatherData} />
                </div>

                {/* 받아온 날씨 정보 icon으로 출력 */}
                <div className={styles.weatherIcon} >
                    {cityWeather && cityWeather.weather && cityWeather.weather.length > 0 && (
                        <div>
                            <WeatherIcon weatherIconCode={cityWeather.weather[0].icon}></WeatherIcon>
                            <p>{` ${weatherData[cityWeather.weather[0].id].description}`}</p>
                        </div>
                        )}
                </div>
            </div>
                    {/* 도시의 환율 정보를 표시 */}
                    <div className={styles.money}><CityMoneyApi selectedCity={ selectedCity } /></div>
            </div>
            <div className={styles.toggle} style={{paddingLeft: activeButton === 'TouristSpot' ? '3px' : '120px' }}
            onClick={() => activeButton === 'TouristSpot' ? changeButtonClick('store') : changeButtonClick('TouristSpot') }>
                    <div className={styles.toggleLeft} style={{marginLeft: activeButton === 'TouristSpot' ? '43px' : '-74px',
                    color: activeButton === 'TouristSpot' ?'white' : 'black'}}>명소</div>
                    <div className={styles.toggleRight} style={{marginLeft: activeButton === 'TouristSpot' ? '161px' : '44px',
                    color: activeButton === 'store' ?'white' : 'black' }}>맛집</div>
                    <div className={styles.toggleBox}></div>
            </div>
            <div>
                <div className={ styles.dropdown}>
                    <button  onClick={() => setDrop(!drop)} className={ styles.dropbtn } style={{display: drop ?  'none' : 'block'}}>
                        {selectedRecommend === 'random' && '추천 순'}
                        {selectedRecommend === 'mbti' && 'MBTI 순'}
                        {selectedRecommend === 'travel' && '여행취향 순'}
                        {selectedRecommend === 'food' && '음식취향 순'}
                        {selectedRecommend === 'like' && '좋아요 순'}
                        {selectedRecommend === 'comment' && '댓글 많은 순'}
                    </button>
                        
                        <div className={ styles.drop_content } style={{display: drop ? 'block' : 'none'}}>
                            <div to='#' onClick={ () => selectItemClick('mbti')}>MBTI 순</div>
                            <div to='#' onClick={ () => selectItemClick('travel')} 
                                style={{display:activeButton === 'TouristSpot' ? 'block' : 'none'}}>여행취향 순</div>
                            <div to='#' onClick={ () => selectItemClick('food')}  
                                style={{display:activeButton === 'TouristSpot' ? 'none' : 'block'}}>음식취향 순</div>
                            <div to='#' onClick={ () => selectItemClick('like')}>좋아요 순</div>
                            <div to='#' onClick={ () => selectItemClick('comment')}>댓글 많은 순</div>
                        </div>
                </div>
            </div>
            
                {
                filteredPlaceData.map((item, index) => (
                        <div key={index} className={styles.list1} onClick={() => onToPlacePage(item.placeSeq)}>
                            <div className={styles.imgDiv}>
                                <img src={item.image} style={{borderRadius:16, userSelecter: 'none'}} alt={item.name} />
                                {user.name === "" ?  '' : <Like placeSeq={item.placeSeq} isTrue={user.likingPlace === null ?  false: userPlaceLike.includes(item.placeSeq)} userPlaceLike={userPlaceLike} setUserPlaceLike={setUserPlaceLike}/>} 
                            </div>
                            <div className={styles.textDiv}>
                                <div className={styles.textName}>{item.name}</div>
                                <div className={styles.textDiv1}>{item.context1}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CityPage;