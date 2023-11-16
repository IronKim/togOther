import React, { useEffect, useState } from 'react';
import { getCity } from '../api/AdvisorApiService';
import AdvisorCityList from './advisor/AdvisorCityList';

import home from '../css/Homew.module.css';
import { CONTINENT } from '../constants/CONTINENT';

const Homew = () => {
    // 지역
    const [continentList, setContinentList] = useState(Object.values(CONTINENT));
    
    // 국가
    const [countryList, setCountryList] = useState([]);
    
    // 도시
    const [cityList, setCityList] = useState([]);

    // 선택 국가 리스트
    const [selectedCountry, setSelectedCountry] = useState({
        continentName: '',
        countryName: ''
    });

    // 선택 도시 리스트
    const [selectedCity, setSelectedCity] = useState({
        citySeq: '',
        cityImage: '',
        cityName: '',
        continentName: '',
        countryName: ''
    });

     // 도시를 클릭했을 때 호출되는 함수
    const handleCityClick = (city) => {
    // 선택된 도시 정보를 업데이트
        setSelectedCity(city);
    };

    const getCityList = () => {
        getCity()
            .then(res => {
                setCityList(res.data);
            })
            .catch(e => console.log(e));
    };

    // 나라 리스트를 도시 리스트에서 중복 안되는 나라만 골라서 만드는 함수
    const getCountryList = () => {
        let newCountryList = [];
        for (let i = 0; i < cityList.length; i++) {
            if (
                newCountryList.findIndex(
                    item => item.countryName === cityList[i].countryName
                ) === -1
            ) {
                newCountryList = [
                    ...newCountryList,
                    {
                        continentName: cityList[i].continentName,
                        countryName: cityList[i].countryName
                    }
                ];
            }
        }
        setCountryList(newCountryList);
    };

    // 컴포넌트가 처음으로 렌더링될 때 도시 정보를 가져옴
    useEffect(() => {
        getCityList();
    }, []);

    // 도시 리스트를 불러오면 나라 리스트도 다시 불러오는 함수
    useEffect(() => {
        getCountryList();
    }, [cityList]);

    // 선택한 나라가 변경될 때 국가 리스트를 업데이트
    useEffect(() => {
        getCountryList();
    }, [selectedCountry]);

    const isHorizontal = true;

    const [selectedStyle, setSelectedStyle] = useState({
      continent: '',
      country: '',
      city: ''
    });

    return (
        <div className={home.white_box}>
            <div className={home.container}>           
            <div className={`${home.selection_box} ${isHorizontal ? home.horizontal : ''} ${selectedCity.cityImage ? home.expanded : ''}`}>
                <h2 className={ home.area }>지역</h2>
                <ul>
                    {continentList.map(item => (
                        <li
                            key={item}
                            onClick={() => {
                                setSelectedCountry({
                                    continentName: item,
                                    countryName: ''
                                });
                                
                                setSelectedCity({
                                    citySeq: '',
                                    cityImage: '',
                                    cityName: '',
                                    continentName: '',
                                    countryName: ''
                                });
                                
                                setSelectedStyle({
                                    continent: item,
                                    country: '',
                                    city: ''
                                });
                            }}
                            
                            style={{ color: selectedStyle.continent === item ? '#6AAEFF' : 'black' }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedCountry && (
                <div className={`${home.selection_box} ${isHorizontal ? home.horizontal : ''} ${selectedCity.cityImage ? home.expanded : ''}`}>
                    <h2 className={ home.area }>국가</h2>
                    <ul>
                        {countryList
                            .filter(
                                item =>
                                    item.continentName === selectedCountry.continentName
                            )
                            .map(item => (
                                <li
                                    key={item.countryName}
                                    onClick={() => {
                                        setSelectedCity(item);
                                        
                                        setSelectedStyle({
                                            continent: selectedCountry.continentName,
                                            country: item.countryName,
                                            city: ''
                                        });
                                    }}
                                    
                                    style={{ color: selectedStyle.country === item.countryName ? '#2E8DFF' : 'black' }}
                                >
                                    {item.countryName}
                                </li>
                            ))}
                    </ul>
                </div>
            )}

            {selectedCountry && (
                <div className={`${home.selection_box} ${isHorizontal ? home.horizontal : ''} ${selectedCity.cityImage ? home.expanded : ''}`}>
                    <h2 className={ home.area }>도시</h2>
                    <ul>
                        {cityList
                            .filter(
                                item =>
                                    item.countryName === selectedCity.countryName
                            )
                            .map(item => (
                                <li
                                    key={item.citySeq}
                                    onClick={() => {
                                        setSelectedCity(item);
                                        
                                        setSelectedStyle({
                                            continent: selectedCountry.continentName,
                                            country: selectedCity.countryName,
                                            city: item.cityName
                                        });
                                    }}
                                    
                                    style={{ color: selectedStyle.city === item.cityName ? '#1F5FAB' : 'black' }}
                                >
                                    {item.cityName}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            </div>  
            {/* 이미지를 하단에 표시 */}
            <div className={`selected_city_image ${selectedCity.cityImage ? home.expanded : ''}`}>
                                    {selectedCity.cityImage && (
                                        <div className={ home.image }>
                                            <img className={ home.img } src={selectedCity.cityImage} alt={selectedCity.cityName} />
                                        </div>
                                    )}
            </div>

        </div>
        )
}
export default Homew;
