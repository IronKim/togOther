import React, { useEffect, useState } from 'react';
import { getCity, getPackageDetailByTpSeq} from '../../api/AdvisorApiService';
import { getTourPackageByCitySeq } from '../../api/PackageApiService';
import { getPackage } from '../../api/PackageApiService';

import AdvisorPackageList from './AdvisorPackageList';
import AdvisorPackageForm from './AdvisorPackageForm';
import AdvisorPackageDetailForm from './AdvisorPackageDetailForm';
import AdvisorPackageDetailList from './AdvisorPackageDetailList';


import 'bootstrap/dist/css/bootstrap.min.css';

import defaultImg from '../../assets/image/no_image.png';

import {CONTINENT} from '../../constants/CONTINENT';

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

    // 패키지 리스트
    const [packageList, setPackageList] = useState([
        {
            tpSeq: '',
            citySeq: '',
            tpTitle: '',
            tpThumbnail: '',
            tpPrice: ''
        }]);

    //api를 이용해 도시를 불러와서 도시 리스트에 저장 하는 함수
    const getCityList = () => {
        getCity()
        .then(res =>{
            // console.log(res.data);
            setCityList(res.data);
        })
        .catch(e => console.log(e))
    }

    //api를 이용해 패키지를 불러와서 패키지 리스트에 저장 하는 함수
    const getpackageList = () => {
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
        getpackageList(); //서버에서 패키지를 가져와 패키지리스트를 채움
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

    // 나라리스트를 도시 리스트에서 중복안되는 나라만 골라서 만드는 함수
    const getPackeList = () => {
        let newCountryList = [];
        for (let i = 0; i < packageList.length; i++) {
            
            if(newCountryList.findIndex(item => item.countryName === packageList[i].countryName) === -1) {
                newCountryList = [...newCountryList, {continentName: packageList[i].continentName, countryName: packageList[i].countryName }];
            }
        }
        setCountryList(newCountryList);
    }

    //도시 리스트를 불러오면 나라 리스트도 다시 불러오는 함수
    useEffect(()=> {
        getCountryList();
    }
    ,[cityList])
    
    //도시 리스트를 불러오면 패키지 리스트도 다시 불러오는 함수
    useEffect(()=> {
        getPackeList();
    }
    ,[packageList])
    

    //선택한 나라
    const [selectedCountry, setSelectedCountry] = useState({
        continentName: '',
        countryName: ''
    });
    

    // 선택된 도시의 패키지 리스트
    const [packagelList, setPackagelList] = useState([{}]);
    
    const [packageDetaillList, setPackagelDetailList] = useState([{}]);




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

    // 선택 패키지 리스트
    const [selectedPackage, setSelectedPackage] = useState(
        {
            tpSeq: '',
            citySeq: '',
            tpTitle: '',
            tpThumbnail: '',
            tpPrice: ''
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

    const onInputPackage = (e) => {
        const {name, value} = e.target

        setSelectedPackage({...selectedPackage, [name]:value})
    }
    
    const onInputPackageDetail = (e) => {
        const {name, value} = e.target

        setSelectedPackageDetail({...selectedPackageDetail, [name]:value})
    }
   
   
    const getPackageList = () => {

        if(selectedPackage.citySeq === '' || selectedPackage.citySeq === '0') {
            return;
        }
        
        getTourPackageByCitySeq(selectedPackage.citySeq)
        .then(res => { 
            selectedPackageDetail(res.data);
            console.log(res.data)
        })
        .catch(e => console.log(e))
        
    }

    const getPackageDetailList = () => {

        if(selectedPackageDetail.tpSeq === '' || selectedPackageDetail.tpSeq === '0') {
            return;
        }
        
        getPackageDetailByTpSeq(selectedPackageDetail.tpSeq)
        .then(res => { 
            setPackagelDetailList(res.data);
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
                tpPrice: ''
            }
        )

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

    // useEffect(()=> {
    //     getPackageList();

        
    //     setSelectedPackage(
    //         {
    //             tpSeq: '',
    //             citySeq: '',
    //             tpTitle: '',
    //             tpThumbnail: '',
    //             tpPrice: ''
    //         }
    //     )
    // }
    // ,[selectedCity.citySeq])


    useEffect(()=> {
        getPackageDetailList();

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
    ,[selectedPackage.tpSeq])
    

    const selectCity = (city) => {
        setSelectedCity(city);
    }

    const selectPackage = (tourPackage) => {
        // console.log('aaaa')
        setSelectedPackage(tourPackage);
    }
    
    const selectPackageDetail = (tourPackageDetail) => {
        setSelectedPackageDetail(tourPackageDetail);
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
                    
                    <AdvisorPackageList selectedCountry={selectedCountry} packageList={packageList.filter(item => item.citySeq === selectedCountry.citySeq)} selectPackage={selectPackage}
                        selectedPackage={selectedPackage}/> 
                </div>
                {
                    selectedPackage.citySeq !== '' ? <AdvisorPackageForm selectedPackage={selectedPackage} onInputPackage={onInputPackage} getpackageList={getpackageList}  
                        onErrorImg={onErrorImg} selectedCountry={selectedCountry} /> : null
                }
            </div>
           
            <hr/>

            {
                selectedPackage.citySeq !== '' && selectedPackage.citySeq !== '0' ? <AdvisorPackageDetailList selectedPackage={selectedPackage} packageDetaillList={packageDetaillList} selectPackageDetail={selectPackageDetail}/> : null
            }
            {
                selectedPackageDetail.tpdSeq !== '' ? <AdvisorPackageDetailForm selectedPackageDetail={selectedPackageDetail} onInputPackageDetail={onInputPackageDetail}
                    onErrorImg={onErrorImg} getPackageDetailList={getPackageDetailList} /> : null
            }
           
        </div>
    );
};

export default AdvisorDashboardPackage;