import CityWeatherApi from './CityWeatherApi';
import React, { useEffect, useState } from 'react';
import styles from '../../css/Info/CityPage.module.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CityMoneyApi from './CityMoneyApi';  
import { useNavigate, useParams } from 'react-router-dom';
import { getCityBySeq } from '../../api/CityApiService';
import { getPlaceListByCitySeq } from '../../api/PlaceApiServeice';
import WeatherIcon from '../../constants/WeatherIcon';
import weatherData from '../../constants/WeatherData';

const CityPage = () => { 
    const { citySeq } = useParams();

    const [city, setCity] = useState('');
    const [placeData, setPlaceData] = useState(['']);
    const [filteredPlaceData, setFilteredPlaceData] = useState([]);
    const [activeButton, setActiveButton] = useState('TouristSpot');
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState(''); 
    const [cityWeather, setCityWeather] = useState(null); // 날씨 정보를 저장할 상태

    useEffect(() => {

        getCityBySeq(citySeq)
            .then(res => {
                setCity(res.data);
                setSelectedCity(res.data.cityName); // 선택된 도시 정보 업데이트
            })
            .catch(e => console.log(e));

        getPlaceListByCitySeq(citySeq)
            .then(res => {
                setPlaceData(res.data);
                setFilteredPlaceData(res.data.filter(item => item.code === (activeButton === 'TouristSpot' ? 1 : 0)));
            })
            .catch(e => console.log(e));
    }, [citySeq, activeButton]);

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
        <div>
            <img src={city.cityImage} className={styles.citypage} />

            <div className={styles.inputBox}>
                <input className={styles.input} type='text' placeholder='Search...' onChange={onChange} value={search} />
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" className={styles.img}></img>
            </div>

            <div className={styles.api}>
                {/* 도시의 환율 정보를 표시 */}
                <div className={styles.money}><CityMoneyApi selectedCity={ selectedCity } /></div>
            {/*  날씨 정보 표시 */}
            <div className={styles.weather}>
                <CityWeatherApi selectedCity={selectedCity} onWeatherData={handleWeatherData} />
                </div>

                {/* 받아온 날씨 정보 icon으로 출력 */}
                <div className={styles.weatherIcon}>
                    {cityWeather && cityWeather.weather && cityWeather.weather.length > 0 && (
                        <div>
                            <WeatherIcon weatherIconCode={cityWeather.weather[0].icon} />
                            <p>{` ${weatherData[cityWeather.weather[0].id].description}`}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.button}>
                <ButtonGroup aria-label='Basic example' style={{ position: 'relative', top: 70 }}>
                    <Button
                        variant={activeButton === 'TouristSpot' ? 'primary' : 'light'}
                        onClick={() => handleButtonClick('TouristSpot')}
                    >
                        명소
                    </Button>
                    <Button
                        variant={activeButton === 'store' ? 'primary' : 'light'}
                        onClick={() => handleButtonClick('store')}
                    >
                        맛집
                    </Button>
                </ButtonGroup>
            </div>

            <div style={{ width: 1200, margin: '0 auto' }}>
                {
                    filteredPlaceData.map((item, index) => (
                        <div key={index} style={{ display: 'inline-block', marginBottom: '20px', justifyContent: 'center', userSelect: 'none' }}>
                            <div>
                                <div className={styles.list1} onClick={() => onToPlacePage(item.placeSeq)}>
                                    <div className={styles.imgDiv}>
                                        <img src={item.image} style={{ width: '250px', height: '250px', borderRadius: 16, userSelecter: 'none' }} alt={item.name} />
                                    </div>
                                    <div className={styles.textDiv}>
                                        <div style={{ fontSize: 20, position: 'relative', top: '5%' }}>{item.name}</div>
                                        <div className={styles.textDiv1}>{item.context1}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CityPage;