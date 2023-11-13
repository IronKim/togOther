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

    const [city, setCity] = useState();

    const [placeData, setPlaceData] = useState([]);

    useEffect(()=> {
        getCityBySeq(citySeq)
        .then(res =>{
            setCity(res.data);
        })
        .catch(e => console.log(e))

        getPlaceListByCitySeq(citySeq)
        .then(res => {
            setPlaceData(res.data);
        })
        .catch(e => console.log(e))

    },[])

    console.log(city);
    console.log(placeData)

    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const navigate = useNavigate()

    const onToPlacePage = (placeSeq) => {
        navigate(`/info/place/${placeSeq}`)
    }

    return (
        <div>
            <img src={setCity.cityImage} className={ styles.citypage }/>
                <input className={ styles.inputBox } type= 'text'></input>

            <div className={ styles.api }>
                <div className={ styles.money }><CityMoneyApi /></div>
                <div className={ styles.weather }><CityWeatherApi /></div>
            </div>

            <div className={ styles.button }> 
                <ButtonGroup aria-label='Basic example'>
                    <Button
                        variant={ activeButton === 'companion' ? 'primary' : 'light' } // 기본 색상을 light로 설정
                        onClick={ () => handleButtonClick('companion')}
                    >
                        동행
                    </Button>
                    <Button
                        variant={ activeButton === 'store' ? 'primary' : 'light' } // 기본 색상을 light로 설정
                        onClick={ () => handleButtonClick('store')}
                    >
                        음식점
                    </Button>
                </ButtonGroup>
            </div>

          
            <div className={ styles.bigContainer } onClick={() => (onToPlacePage(getCityBySeq.placeSeq))}>
            {
                placeData.map((item) => (
                <div className={ styles.list1 } style={{ display: 'flex' }}>
                    <div className={ styles.imgDiv }><img src={item.image} style={{ width: '250px', height: '250px' }} /></div>    
                        <div className={ styles.textDiv }>
                            <input type='text' value={item.name}></input>
                            <input type='text'value={item.context1}></input>                
                        </div>
                </div> 
            ))}

            </div>
        </div>
    );
};

export default CityPage;