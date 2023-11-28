import CityWeatherApi from './CityWeatherApi';
import React, { useEffect, useState } from 'react';
import styles from '../../css/Info/CityPage.module.css';
import CityMoneyApi from './CityMoneyApi';  
import { useNavigate, useParams } from 'react-router-dom';
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
                setFilteredPlaceData(res.data.filter(item => item.code === (activeButton === 'TouristSpot' ? 1 : 0)));
            })
            .catch(e => console.log(e));
    }, [citySeq]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        const filteredData = buttonName === 'TouristSpot' ? placeData.filter(item => item.code === 1) : 
                             buttonName === 'store' ? placeData.filter(item => item.code === 0) :
                             placeData;
        setFilteredPlaceData(filteredData);
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
    const handleWeatherData = (weatherData) => {
        setCityWeather(weatherData);
        
    };

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
                    <CityWeatherApi selectedCity={selectedCity} onWeatherData={handleWeatherData} />
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
            onClick={() => activeButton === 'TouristSpot' ? handleButtonClick('store') : handleButtonClick('TouristSpot') }>
                    <div className={styles.toggleLeft} style={{marginLeft: activeButton === 'TouristSpot' ? '43px' : '-74px',
                    color: activeButton === 'TouristSpot' ?'white' : 'black'}}>명소</div>
                    <div className={styles.toggleRight} style={{marginLeft: activeButton === 'TouristSpot' ? '161px' : '44px',
                    color: activeButton === 'store' ?'white' : 'black' }}>맛집</div>
                    <div className={styles.toggleBox}></div>
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