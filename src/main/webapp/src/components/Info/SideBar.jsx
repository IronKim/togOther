import React, { useEffect, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';

import sidebar from '../../css/Info/SideBar.module.css';

const SideBar = ({onContinent, onCountry}) => {

    const [continentList, setContinentList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeKey, setActiveKey] = useState(null);
  
    useEffect(() => {
        getCity()
        .then((res) => {
          setCityList(res.data);
        })
        .catch((e) => console.log(e));
    }, []);
  
    useEffect(() => {
        const newCountryList = [];
        for (let i = 0; i < cityList.length; i++) {
            if (newCountryList.findIndex((item) => item.countryName === cityList[i].countryName) === -1) {
            newCountryList.push({ continentName: cityList[i].continentName, countryName: cityList[i].countryName });
            }
        }
        setCountryList(newCountryList);
    }, [cityList]);
  
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
        onContinent(clickedContinent);
        setActiveKey(activeKey === clickedContinent ? null : clickedContinent);
    };
  
    const onCountryClick = (clickedCountry) => {
        onCountry(clickedCountry);
        setActiveKey(activeKey === clickedCountry ? null : clickedCountry);
    };

    return (
      <div className={sidebar.total}>
        <div style={{ width: '16em'}} className={sidebar['Sidebar-total']}>
            <label style={{marginBottom: '1em', marginLeft:'2.1em'}}>도시 선택</label>
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
                            onClick={() => onCountryClick(country)}
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
      </div>
    );
  };

export default SideBar;