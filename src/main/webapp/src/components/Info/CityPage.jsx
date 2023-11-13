import React, { useState } from 'react';
import styles from './CityPage.module.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CityMoneyApi from './CityMoneyApi';
import CityWeatherApi from './CityWeatherApi';

const CityPage = () => { 
    

    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div>
            <div className={ styles.citypage }>
                <input className={ styles.inputBox } type= 'text'>
                </input>
            </div>

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
                        상점
                    </Button>
                </ButtonGroup>
            </div>

            <div className={ styles.bigContainer }>
                <div className={ styles.list1 } style={{ display: 'flex' }}>
                    <div className={ styles.imgDiv }><img src='' style={{ width: '250px', height: '250px' }} /></div>    
                        <div className={ styles.textDiv }>
                            <input type='text' />
                            <input type='text' />                    
                </div>
            </div>     

                <div className={ styles.list2 } style={{ display: 'flex' }}>
                    <div className={ styles.imgDiv }><img src='' style={{ width: '250px', height: '250px' }} /></div>    
                        <div className={ styles.textDiv }>
                            <input type='text' />
                            <input type='text' />
                        </div>               
                </div>
            </div>
        </div>
    );
};

export default CityPage;