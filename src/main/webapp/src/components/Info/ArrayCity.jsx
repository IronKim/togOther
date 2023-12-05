import React, { useEffect, useState } from 'react';
import { getCityList } from '../../api/CityApiService';

import { Transition, TransitionGroup } from 'react-transition-group';

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';

import ArrayStyle from '../../css/Info/ArrayCity.module.css'
import tab from '../../assets/image/tab.png'
import flight from '../../assets/image/flight.png'
import searchs from '../../assets/image/search.png'
import { useNavigate } from 'react-router-dom';

const ArrayCity = () => {
    const [continentList, setContinentList] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeKey, setActiveKey] = useState(null);

    //도시 리스트
    const [cityList, setCityList] = useState([{
        citySeq: '',
        cityImage: '',
        cityName: '',
        continentName: '',
        countryName: ''
    }])

    //api를 이용해 도시를 불러와서 도시 리스트에 저장 하는 함수
    const getCity = () => {
        getCityList()
        .then(res =>{
            // console.log(res.data);
            setCityList(res.data);
        })
        .catch(e => console.log(e))
    }

    // 컴포넌트가 시작되면 해당함수를 시작함
    useEffect(()=> {
        getCity(); //서버에서 도시를 가져와 도시리스트를 채움
    }
    ,[])

    // 나라 리스트
    const [countryList, setCountryList] = useState([{}]);

    // 나라리스트를 도시 리스트에서 중복안되는 나라만 골라서 만드는 함수
    const getCountryList = () => {
        let newCountryList = [];
        for (let i = 0; i < cityList.length; i++) {
            
            if(newCountryList.findIndex(item => item.countryName === cityList[i].countryName) === -1) {
                newCountryList = [...newCountryList, {continentName: cityList[i].continentName, countryName: cityList[i].countryName }];
            }
        }
        setCountryList(newCountryList);
    }

    const [selectedContinent, setSelectedContinent] = useState('All');
    const [selectedCountry, setSelectedCountry] = useState('Alla');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const[search,setSearch] = useState('')

    const onContinent = (clickedContinent) => {
        if (selectedContinent === clickedContinent) {
            setSelectedContinent('All');
            setSelectedCountry('Alla');
        } else {
            setSelectedCountry('All');
            setSelectedCountry('Alla');
            setSelectedContinent(clickedContinent);
        }
    };

    const onCountry = (clickedCountry) => {
        if (selectedCountry === clickedCountry) {
            setSelectedCountry('Alla');
        } else {
            setSelectedCountry(clickedCountry);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarExpanded((prev) => !prev);
    };

    // 도시 리스트를 불러오면 나라 리스트도 다시 불러오는 함수
    useEffect(()=> {
        getCountryList();
    }
    ,[cityList]);
   
    // 도시 데이터를 4개씩 그룹화합니다. 
    const [slidesC,setSlidesC] = useState([]) 

    const [initialRender, setInitialRender] = useState(true);
  
    useEffect(() => {
        setContinentList([...new Set(countryList.map((country) => country.continentName))]);
    }, [countryList]);
  
    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };
  
    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
  
    const onContinentClick = (clickedContinent) => {
        setSearch('')
        onContinent(clickedContinent);
        setActiveKey(activeKey === clickedContinent ? null : clickedContinent);
    };
  
    const onCountryClick = (clickedCountry) => {
        setSearch('')
        onCountry(clickedCountry);
        setActiveKey(activeKey === clickedCountry ? null : clickedCountry);
        setIsSidebarExpanded(false);
    };

    useEffect(()=>{
        const slides = [];
        if (search !== '') {
            for (let i = 0; i < cityList.filter((count) => count.countryName.includes(search)
            || count.continentName.includes(search) || count.cityName.includes(search)).length; i += 4) {
                slides.push(cityList.filter((count) => count.countryName.includes(search)
                || count.continentName.includes(search) || count.cityName.includes(search)).slice(i, i + 4));
            }
        } else {
            if (selectedCountry !== 'Alla')  {
                console.log(selectedCountry.countryName)
                for (let i = 0; i < cityList.filter((count) => count.countryName === selectedCountry.countryName).length; i += 4) {
                    slides.push(cityList.filter((count) => count.countryName === selectedCountry.countryName).slice(i, i + 4));
                }
            } else if (selectedContinent !== 'All'){
                for (let i = 0; i < cityList.filter((conti) => conti.continentName === selectedContinent).length; i += 4) {
                    slides.push(cityList.filter((conti) => conti.continentName === selectedContinent).slice(i, i + 4));
                }
            } else {
                for (let i = 0; i < cityList.length; i += 4) {
                    slides.push(cityList.slice(i, i + 4));
                }
            }
        }
        setSlidesC(slides)
    },[selectedContinent,cityList,selectedCountry,search]);


    const[slidesCo,setSlidesCo] = useState([])

    const navigate = useNavigate()

    const onToCityPage = (citySeq) => {
        navigate(`/info/city/${citySeq}`)
    }

    const slides = [];
    for (let i = 0; i < cityList.length; i += 4) {
        slides.push(cityList.slice(i, i + 4));
    }
    // Accordion.Body 클릭 시 사이드바 닫기
    const handleAccordionBodyClick = () => {
        setIsSidebarExpanded(false);
    };

    //검색

    const onSearch = (e) => {
        setSearch(e.target.value)
    }
    
    return (
        <div>
        {/* 검색창 */}
        <div style={{backgroundImage:`url(${flight})`}} className={ArrayStyle.searchBg}>
            <img src={searchs} className={ArrayStyle.search}/>
            <input type='search'className={ArrayStyle.searchBox} value={search} 
            onChange={onSearch} placeholder='어디로 떠나시나요?'/>
        </div>
        <div style={{display:'flex'}}>
        {/* --------------사이드바-------------- */}
        <div className={ArrayStyle.Sidebartotal} style={{left : isSidebarExpanded ? '0' : '-50%'}}>
            <button 
                   className={ArrayStyle.hamburger} 
                   onClick={toggleSidebar}>
                    <img src={tab} style={{left : isSidebarExpanded ? '49.8%' : '0'}}></img>
            </button>
            <Accordion  defaultActiveKey={['0']}>
                {continentList.map((continent, index) => {
                const countriesInContinent = countryList.filter((country) => country.continentName === continent);
                return (
                    <Accordion.Item key={index} eventKey={continent} >
                        <Accordion.Header onClick={() => onContinentClick(continent)}>
                            {continent}
                        </Accordion.Header >
                        {countriesInContinent.map((country, countryIndex) => (
                            <Accordion.Body
                            key={countryIndex}
                            onClick={ () => onCountryClick(country)}
                            onMouseEnter={() => handleMouseEnter(country)}
                            onMouseLeave={handleMouseLeave}
                            style={{ backgroundColor: hoveredItem === country ? 'lightgray' : 'white', cursor: 'pointer' }}
                            >
                            {country.countryName}
                            </Accordion.Body>
                        ))}
                    </Accordion.Item>
                    );
                })}
            </Accordion>
        </div>
        {/* --------------시티 배열-------------- */}
        <div className={ArrayStyle.arraymain}>
            <TransitionGroup>
                {slidesC.map((slide, index) => (
                <Transition key={index} timeout={50}>
                    {(state) => (
                    <div
                        className={`fade fade-${state} ${ArrayStyle.fades}`}
                        style={{
                        display: 'inline-block',
                        flexDirection: 'row',
                        opacity: state === 'entered' ? 1 : 0,
                        transform: state === 'entered' ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'opacity 0.1s, transform 0.1s',
                        }}
                    >
                        {slide.map((item) => (
                        <Card
                        className={ArrayStyle.card}
                        key={item.cityName}
                        onClick={()=>onToCityPage(item.citySeq)}>
                            <Card.Body className={ArrayStyle.cardbody}>
                                <img variant="top" src={item.cityImage} className={ArrayStyle.cardimg} />
                                <div className={ArrayStyle.imgdiv}>
                                    <div className={ArrayStyle.imgtext}>
                                        {item.cityName}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        ))}
                    </div>
                    )}
                </Transition>
                ))}
            </TransitionGroup>
        </div>
        </div>

        {/* ------------- 캐러셀 ------------- */} 
                            
        <div className={ArrayStyle.carouselContainer} style={{ maxWidth: '100%' }}>
            <p className={ArrayStyle.recoCity}>추천 도시</p>
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
            className={ArrayStyle.Carous}
            >

            {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <div className={ArrayStyle.carouselSlide}>
                        {
                        slide.map((item) => (
                            <div key={item.cityName} className={ArrayStyle.CarouselimageDiv} onClick={()=>onToCityPage(item.citySeq)} >
                                <img src={item.cityImage} alt={item.cityName} className={ArrayStyle.customcircle}/>
                                <div className={ArrayStyle.customcaption}>
                                    <h1>{item.cityName}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
                ))}
            </Carousel>
        </div>
        </div>
    );
};

export default ArrayCity;
