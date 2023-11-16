import React, { useEffect, useState } from 'react';
import { getCity } from '../api/AdvisorApiService';
import Accordion from 'react-bootstrap/Accordion';
import sty from '../css/Homem.module.css';
import BottomNav from './BottomNav';

const Homem = () => {
  // 대륙 리스트
  const [continentList, setContinentList] = useState([]);

  // 도시 리스트
  const [cityList, setCityList] = useState([]);

  // 국가 리스트
  const [countryList, setCountryList] = useState([]);

  // 선택한 나라
  const [selectedCountry, setSelectedCountry] = useState({
    continentName: '',
    countryName: ''
  });

  // 선택 도시
  const [selectedCity, setSelectedCity] = useState({
    citySeq: '',
    cityImage: '',
    cityName: '',
    continentName: '',
    countryName: ''
  });

  // 선택한 스타일
  const [selectedStyle, setSelectedStyle] = useState({
    continent: '',
    country: '',
    city: ''
  });

  const [activeAccordion, setActiveAccordion] = useState("0");

  const getCityList = () => {
    getCity() 
      .then(res => {
        const cityListFromAPI = res.data;
        setCityList(cityListFromAPI);
        setContinentList([...new Set(cityListFromAPI.map(city => city.continentName))]);
      })
      .catch(error => {
        console.error('Error fetching city list:', error);
      });
  };

  // 나라 리스트를 도시 리스트에서 중복 안되는 나라만 골라서 만드는 함수
  const getCountryList = () => {
    const filteredCountries = [...new Set(cityList
      .filter(city => city.continentName === selectedCountry.continentName)
      .map(city => city.countryName))];
    setCountryList(filteredCountries);
  };

  useEffect(() => {
    getCityList();
  }, []);

  useEffect(() => {
    getCountryList();
  }, [selectedCountry]);

  const [prevScrollY, setPrevScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 이전 스크롤 위치와 현재 스크롤 위치 비교
      if (scrollY > prevScrollY) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }

      setPrevScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return (
    <div className={sty.accordion_container}>
      {showNavbar && <BottomNav showNavbar={showNavbar} />}
      
      <Accordion activeKey={activeAccordion} onSelect={(e) => setActiveAccordion(e)}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h2>
              지역
            </h2>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {continentList.map(item => (
                <li
                  className={ sty.list }
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
                    setActiveAccordion("1"); // 지역을 선택하면 국가 리스트가 열리도록 설정
                  }}
                  
                  style={{ color: selectedStyle.continent === item ? '#6AAEFF' : 'black' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h2>
              국가
            </h2>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {countryList.map(item => (
                <li
                  className={ sty.list }
                  key={item}
                  onClick={() => {
                    setSelectedCity({
                      citySeq: '',
                      cityImage: '',
                      cityName: '',
                      continentName: '',
                      countryName: item
                    });
                    setSelectedStyle({
                      continent: '',
                      country: item,
                      city: ''
                    });
                    setActiveAccordion("2"); // 국가를 선택하면 도시 리스트가 열리도록 설정
                  }}
                  
                  style={{ color: selectedStyle.country === item ? '#2E8DFF' : 'black' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h2>
              도시
            </h2>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {cityList
                .filter(
                  item =>
                    item.countryName === selectedCity.countryName
                )
                .map(item => (
                  <li
                    className={ sty.list }
                    key={item.citySeq}
                    onClick={() => {
                      setSelectedCity(item);
                      setSelectedStyle({
                        continent: '',
                        country: '',
                        city: item.cityName
                      });
                    }}
                    
                    style={{ color: selectedStyle.city === item.cityName ? '#1F5FAB' : 'black' }}
                  >
                    {item.cityName}
                  </li>
                ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className={`selected_city_image ${selectedCity.cityImage ? sty.expanded : ''}`}>
                                    {selectedCity.cityImage && (
                                        <div className={ sty.image }>
                                            <img className={ sty.img } src={selectedCity.cityImage} alt={selectedCity.cityName} />
                                        </div>
                                    )}
            </div>
    </div>
  );
};
export default Homem;
