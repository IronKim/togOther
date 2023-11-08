import React, { useEffect, useState } from 'react';
import { getCity, getPlaceByCitySeq } from '../../api/AdvisorApiService';
import AdvisorCityList from './AdvisorCityList';
import AdvisorCityForm from './AdvisorCityForm';
import AdvisorPlaceList from './AdvisorPlaceList';
import AdvisorPlaceForm from './AdvisorPlaceForm';

import 'bootstrap/dist/css/bootstrap.min.css';

import defaultImg from '../../assets/image/no_image.png';

import {CONTINENT} from '../../constants/CONTINENT';

const AdvisorDashboardCity = () => {

    //대륙 리스트
    const [continentList, setContinentList] = useState(Object.values(CONTINENT));

    //도시 리스트
    const [cityList, setCityList] = useState([{
        citySeq: '',
        cityImage: '',
        cityName: '',
        continentName: '',
        countryName: ''
    }])

    //api를 이용해 도시를 불러와서 도시 리스트에 저장 하는 함수
    const getCityList = () => {
        getCity()
        .then(res =>{
            // console.log(res.data);
            setCityList(res.data);
        })
        .catch(e => console.log(e))
    }

    //컴포넌트가 시작되면 해당함수를 시작함
    useEffect(()=> {
        getCityList(); //서버에서 도시를 가져와 도시리스트를 채움
    }
    ,[])


    //나라 리스트
    const [countryList, setCountryList] = useState([{}]);

    //나라리스트를 도시 리스트에서 중복안되는 나라만 골라서 만드는 함수
    const getCountryList = () => {
        let newCountryList = [];
        for (let i = 0; i < cityList.length; i++) {
            
            if(newCountryList.findIndex(item => item.countryName === cityList[i].countryName) === -1) {
                newCountryList = [...newCountryList, {continentName: cityList[i].continentName, countryName: cityList[i].countryName }];
            }
        }
        setCountryList(newCountryList);
    }

    //도시 리스트를 불러오면 나라 리스트도 다시 불러오는 함수
    useEffect(()=> {
        getCountryList();
    }
    ,[cityList])

    //선택한 나라
    const [selectedCountry, setSelectedCountry] = useState({
        continentName: '',
        countryName: ''
    });

    // 선택된 도시의 장소 리스트
    const [placeList, setPlaceList] = useState([{}]);

    
    

    //선택 도시 리스트
    const [selectedCity, setSelectedCity] = useState(
        {
            citySeq: '',
            cityImage: '',
            cityName: '',
            continentName: '',
            countryName: ''
        }
    );

    const [selectedPlace, setSelectedPlace] = useState(
        {
            placeSeq: '',
            citySeq: '',
            code: '',
            name: '',
            address: '',
            longitude: '',
            latitude: '',
            image: '',
            subImage1: '',
            subImage2: '',
            context1: '',
            context2: '',
            context3: '',
            likeCnt: '',
            tag: '',
        }
    );

    const onInputCity = (e) => {
        const {name, value} = e.target
        
        setSelectedCity({...selectedCity, [name]:value})
    }

    const onInputPlace = (e) => {
        const {name, value} = e.target

        setSelectedPlace({...selectedPlace, [name]:value})
    }
   
    
    

   

    const getPlaceList = () => {

        if(selectedCity.citySeq === '' || selectedCity.citySeq === '0') {
            return;
        }
        
        getPlaceByCitySeq(selectedCity.citySeq)
        .then(res => { 
            setPlaceList(res.data);
            console.log(res.data)
        })
        .catch(e => console.log(e))
        
    }

    

    

    useEffect(()=> {

        setSelectedCity({
            citySeq: '',
            cityImage: '',
            cityName: '',
            continentName: '',
            countryName: ''
        })

        setSelectedPlace(
            {
                placeSeq: '',
                citySeq: '',
                code: '',
                name: '',
                address: '',
                longitude: '',
                latitude: '',
                image: '',
                subImage1: '',
                subImage2: '',
                context1: '',
                context2: '',
                context3: '',
                likeCnt: '',
                tag: '',
            }
        )
    }
    ,[selectedCountry])

    useEffect(()=> {
        getPlaceList();

        setSelectedPlace(
            {
                placeSeq: '',
                citySeq: '',
                code: '',
                name: '',
                address: '',
                longitude: '',
                latitude: '',
                image: '',
                subImage1: '',
                subImage2: '',
                context1: '',
                context2: '',
                context3: '',
                likeCnt: '',
                tag: '',
            }
        )
    }
    ,[selectedCity.citySeq])

    

    const selectCity = (city) => {
        setSelectedCity(city);
    }

    const selectPlace = (place) => {
        setSelectedPlace(place);
    }



    // 태그 선택할 시 선택된 장소의 태그를 수정하는 함수
    const onTagChange = (e) => {

        const {value} = e.target

        if(selectedPlace.tag === null) {
            setSelectedPlace({...selectedPlace, tag: ""})
        }

        if(selectedPlace.tag.includes(value)) {
            setSelectedPlace({...selectedPlace, tag: selectedPlace.tag.replace(value+',', "")})
            
            
        } else {
            setSelectedPlace({...selectedPlace, tag: selectedPlace.tag + value + ','})
        }
    }

    const onErrorImg = (e) => {
        e.target.src = defaultImg;
    }

    return (
        <div>
            <div style={{width: '100%', display: 'flex'}}>
                <div style={{width: '40em'}}>
                    {
                        continentList.map(continent => {
                            const countriesInContinent = countryList.filter(country => country.continentName === continent);
                            return (
                            <div key={continent}>
                                <p className='fs-1 m-2'>{continent}</p>
                                <ul>
                                {countriesInContinent.map((country, index) => (
                                    <button key={index} className='btn btn-outline-primary m-1' 
                                        onClick={() => setSelectedCountry({...selectedCountry, continentName:continent,countryName:country.countryName})} >{country.countryName}</button>
                                ))}
                                </ul>
                            </div>
                            );
                        })
                    }
                    
                    <AdvisorCityList selectedCountry={selectedCountry} cityList={cityList.filter(item => item.countryName === selectedCountry.countryName)} selectCity={selectCity}
                         selectedCity={selectedCity}  /> 
                </div>
                {
                    selectedCity.citySeq !== '' ? <AdvisorCityForm selectedCity={selectedCity} onInputCity={onInputCity} getCityList={getCityList} 
                        onErrorImg={onErrorImg} selectedCountry={selectedCountry} /> : null
                }
            </div>
           
            <hr/>

            {
                selectedCity.citySeq !== '' && selectedCity.citySeq !== '0' ? <AdvisorPlaceList selectedCity={selectedCity} placeList={placeList} selectPlace={selectPlace}/> : null
            }
            {
                selectedPlace.placeSeq !== '' ? <AdvisorPlaceForm selectedPlace={selectedPlace} onInputPlace={onInputPlace}
                    onErrorImg={onErrorImg} getPlaceList={getPlaceList} onTagChange={onTagChange} /> : null
            }
           
        </div>
    );
};

export default AdvisorDashboardCity;