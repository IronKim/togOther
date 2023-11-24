import React, { useEffect, useState } from 'react';
import { getCity, getPackageByCitySeq } from '../../api/AdvisorApiService';
import { getPackage } from '../../api/PackageApiService';
import AdvisorCityList from './AdvisorCityList';
import AdvisorPackageList from './AdvisorPackageList';

import 'bootstrap/dist/css/bootstrap.min.css';

import defaultImg from '../../assets/image/no_image.png';

import {CONTINENT} from '../../constants/CONTINENT';
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

    //api를 이용해 패키지를 불러와서 도시 리스트에 저장 하는 함수
    const getTourPackgeList = () => {
        getPackage()
        .then(res =>{
            // console.log(res.data);
            setPackageList(res.data);
        })
        .catch(e => console.log(e))
    }
    
    //컴포넌트가 시작되면 해당함수를 시작함
    useEffect(()=> {
        getCityList(); //서버에서 도시를 가져와 도시리스트를 채움
    }
    ,[])

    //컴포넌트가 시작되면 해당함수를 시작함
    useEffect(()=> {
        getTourPackgeList(); //서버에서 도시를 가져와 도시리스트를 채움
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

    
    

    // 선택 도시 리스트
    const [selectedCity, setSelectedCity] = useState(
        {
            citySeq: '',
            cityImage: '',
            cityName: '',
            continentName: '',
            countryName: ''
        }
    );

    // 선택 패키지 디테일 리스트
    const [selectedPackageDetail, setSelectedPackageDetail] = useState(
        {
            tpdSeq: '',
            tpSeq: '',
            tpdImages: '',
            tpdcontext: '',
            tpdsaleStart: '',
            tpdsaleEnd: ''
        }
    );

    const onInputCity = (e) => {
        const {name, value} = e.target
        
        setSelectedCity({...selectedCity, [name]:value})
    }

    const onInputPackageDetail = (e) => {
        const {name, value} = e.target

        setSelectedPackageDetail({...selectedPackageDetail, [name]:value})
    }
   
    
    

   

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

        setSelectedPackageDetail(
            {
                tpdSeq: '',
                tpSeq: '',
                tpdImages: '',
                tpdcontext: '',
                tpdsaleStart: '',
                tpdsaleEnd: ''
            }
        )
    }
    ,[selectedCountry])

    useEffect(()=> {
        getPackageList();

        setSelectedPackageDetail(
            {
                tpdSeq: '',
                tpSeq: '',
                tpdThumbnail: '',
                tpdImages: '',
                tpdcontext: '',
                tpdPrice: '',
                tpdsaleStart: '',
                tpdsaleEnd: ''
            }
        )
    }
    ,[selectedCity.citySeq])

    

    const selectCity = (city) => {
        setSelectedCity(city);
    }

    const selectPackage = (packageList) => {
        setSelectedPackageDetail(packageList);
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
            </div>
           
            <hr/>

            {
                selectedCity.citySeq !== '' && selectedCity.citySeq !== '0' ? <AdvisorPackageList selectedCity={selectedCity} packageList={packageList} selectPackage={selectPackage}/> : null
            }
            {
                selectedPackageDetail.citySeq !== '' ? <AdvisorPackageForm selectPackage={selectPackage} selectedPackageDetail={selectedPackageDetail} onInputPackageDetail={onInputPackageDetail}
                    onErrorImg={onErrorImg} getPackageList={getPackageList} /> : null
            }
           
        </div>
    );
};

export default AdvisorDashboardPackage;