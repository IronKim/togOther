import React, { useEffect, useState } from 'react';
import { getCity, getPackageByCitySeq, getPlaceByCitySeq } from '../../api/AdvisorApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

import defaultImg from '../../assets/image/no_image.png';

import {CONTINENT} from '../../constants/CONTINENT';
import AdvisorCityList from './AdvisorCityList';
import AdvisorCityForm from './AdvisorCityForm';
import AdvisorPackageList from './AdvisorPackageList';
import AdvisorPackageForm from './AdvisorPackageForm';

const AdvisorDashboardPackage = () => {

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

    // 선택된 도시의 패키지 리스트
    const [packageList, setPackageList] = useState([{}]);

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

    const [selectedPackage, setSelectedPackage] = useState(
        {
            tpSeq: '',
            citySeq: '',
            tpTitle: '',
            tpThumbnail: '',
            tpPrice: '',
            tpImages: '',
            tpcontext: '',
            tpsaleStart: '',
            tpsaleEnd: '',
        }
    );

    const onInputCity = (e) => {
        const {name, value} = e.target
        
        setSelectedCity({...selectedCity, [name]:value})
    }

    const onInputPackage = (e) => {
        const {name, value} = e.target

        setSelectedPackage({...selectedPackage, [name]:value})
    }
   

    const isValidDate = (dateString) => {
        // 정규식을 사용하여 "0000-00-00" 형식의 날짜 검사
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(dateString);
      };

    
    const getPackageList = () => {

        if(selectedCity.citySeq === '' || selectedCity.citySeq === '0') {
            return;
        }
       
        getPackageByCitySeq(selectedCity.citySeq)
        .then(res => { 
            setPackageList(res.data);
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

        setSelectedPackage(
            {
                tpSeq: '',
                citySeq: '',
                tpTitle: '',
                tpThumbnail: '',
                tpPrice: '',
                tpImages: '',
                tpcontext: '',
                tpsaleStart: '',
                tpsaleEnd: '',
            }
        )
    }
    ,[selectedCountry])

    useEffect(()=> {
        getPackageList();

        setSelectedPackage(
            {
                tpSeq: '',
                citySeq: '',
                tpTitle: '',
                tpThumbnail: '',
                tpPrice: '',
                tpImages: '',
                tpcontext: '',
                tpsaleStart: '',
                tpsaleEnd: '',
            }
        )
    }
    ,[selectedCity.citySeq])

    

    const selectCity = (city) => {
        setSelectedCity(city);
    }

    const selectPackage = (packag) => {
        setSelectedPackage(packag);
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
                selectedCity.citySeq !== '' && selectedCity.citySeq !== '0' ? <AdvisorPackageList selectedCity={selectedCity} packageList={packageList} selectPackage={selectPackage}/> : null
            }
            {
                selectedPackage.tpSeq !== '' ? <AdvisorPackageForm selectedPackage={selectedPackage} onInputPackage={onInputPackage}
                    onErrorImg={onErrorImg} getPackageList={getPackageList} isValidDate={isValidDate}  /> : null
            }

            
        </div>
    );
};

export default AdvisorDashboardPackage;