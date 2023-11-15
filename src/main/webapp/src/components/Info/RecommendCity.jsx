import React, { useEffect, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';

import Carousel from 'react-bootstrap/Carousel';

import '../../css/Info/InfoCarousel.module.css';
import CarouselStyle from '../../css/Info/InfoCarousel.module.css';

const RecommendCity = () => {

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

    // 나라 리스트
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

    // 도시 리스트를 불러오면 나라 리스트도 다시 불러오는 함수
    useEffect(()=> {
        getCountryList();
    }
    ,[cityList])
   
    // 도시 데이터를 4개씩 그룹화합니다. + 랜덤
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const slides = [];
    for (let i = 0; i < cityList.length; i += 4) {
        slides.push(cityList.slice(i, i + 4));
    }

    // 배열을 랜덤하게 섞음
    const shuffledSlides = shuffleArray(slides);

    return (
        <div className={CarouselStyle.carouselContainer}>
            <p style={{position:'relative', top:'25%', right:'30%', fontSize:'40px'}}>추천 도시</p>
            <Carousel 
            data-bs-theme="dark"
            showThumbs={false}
            emulateTouch
            infiniteLoop
            interval={null}
            showStatus={false}
            showArrows={true}
            showIndicators={false}
            useKeyboardArrows={false}
            stopOnHover={true}
            style={{ width: '80%', margin: 200}}>

            {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <div className={CarouselStyle.carouselSlide}>
                        {
                        slide.map((item) => (
                            <div key={item.cityName} className={CarouselStyle.image}>
                                <img src={item.cityImage} alt={item.cityName} className={CarouselStyle.customcircle} style={{width:250, height:250}}/>
                                <div className={CarouselStyle.customcaption}>
                                    <h1>{item.cityName}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default RecommendCity;