import React, { useEffect, useState } from 'react';
import styles from '../../css/Info/CityPage.module.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CityMoneyApi from './CityMoneyApi';
import CityWeatherApi from './CityWeatherApi';
import { useNavigate, useParams } from 'react-router-dom';
import { getCityBySeq } from '../../api/CityApiService';
import { getPlaceListByCitySeq } from '../../api/PlaceApiServeice';

const CityPage = () => { 
    
    const {citySeq} = useParams()

    const [city, setCity] = useState('');

    const [placeData, setPlaceData] = useState(['']);

    useEffect(()=> {
        getCityBySeq(citySeq)
        .then(res =>{
            setCity(res.data);
        })
        .catch(e => console.log(e))
        getPlaceListByCitySeq(citySeq)
        .then(res => {
            setPlaceData(res.data);
            // 초기 필터링된 데이터 설정
            setFilteredPlaceData(res.data.filter(item => item.code === (activeButton === 'TouristSpot' ? 1 : 0)));
        })
        .catch(e => console.log(e))
    },[])

    
    const [activeButton, setActiveButton] = useState('TouristSpot');

    const [filteredPlaceData, setFilteredPlaceData] = useState([]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        const filteredData = buttonName === 'TouristSpot' ? placeData.filter(item => item.code === 1) : 
                             buttonName === 'store' ? placeData.filter(item => item.code === 0) :
                             placeData;

        setFilteredPlaceData(filteredData);
    };

    const navigate = useNavigate()

    const onToPlacePage = (placeSeq) => {
        navigate(`/info/place/${placeSeq}`)
    }

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    
    return (
        <div>
            <img src={city.cityImage} className={ styles.citypage }/>
            <div className={ styles.cityName }>{city.cityName}</div>
            {/* ----------------검색---------------- */}
            {/* <div className={ styles.inputBox }>
                <input className={ styles.input } type= 'text' placeholder='Search...'/>
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" className={ styles.img }></img>
            </div> */}

            <div className={ styles.api }>
                <div className={ styles.money }><CityMoneyApi /></div>
                <div className={ styles.weather }><CityWeatherApi /></div>
            </div>

            <div className={ styles.button }> 
                <ButtonGroup aria-label='Basic example' style={{position:'relative', top: 70}}>
                    <Button
                        variant={ activeButton === 'TouristSpot' ? 'primary' : 'light' } // 기본 색상을 light로 설정
                        onClick={ () => handleButtonClick('TouristSpot')}
                    >
                        명소
                    </Button>
                    <Button
                        variant={ activeButton === 'store' ? 'primary' : 'light' } // 기본 색상을 light로 설정
                        onClick={ () => handleButtonClick('store')}
                    >
                        맛집
                    </Button>
                </ButtonGroup>
            </div>
            <div style={{width:1200, margin: '0 auto'}}>
                {
                filteredPlaceData.map((item, index) => (
                        <div key={index} style={{ display: 'inline-block', marginBottom: '20px', justifyContent: 'center', userSelect: 'none'}}>
                            <div>
                                <div className={styles.list1} onClick={() => onToPlacePage(item.placeSeq)}>
                                    <div className={styles.imgDiv}>
                                        <img src={item.image} style={{ width: '250px', height: '250px', borderRadius:16, userSelecter: 'none'}} />
                                    </div>
                                    <div className={styles.textDiv}>
                                        <div style={{fontSize:20, position:'relative', top:'5%'}}>{item.name}</div>
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