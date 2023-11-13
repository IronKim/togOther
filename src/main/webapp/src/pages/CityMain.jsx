import React, { useState } from 'react';
import SideBar from '../components/Info/SideBar';
import ArrayCity from '../components/Info/ArrayCity';


const CityMainPage = () => {

    const [selectedContinent, setSelectedContinent] = useState('All');

    const onContinent = (clickedContinent) => {
        // 이미 선택된 대륙을 두 번 클릭했을 때 초기 상태로 돌아가도록 처리
        if (selectedContinent === clickedContinent) {
            setSelectedContinent('All');
            setSelectedCountry('Alla');
        } else {
            // 선택한 대륙의 정보를 Context를 통해 업데이트
            setSelectedCountry('All')
            setSelectedCountry('Alla');
            setSelectedContinent(clickedContinent);
        }
    };

    const [selectedCountry, setSelectedCountry] = useState('Alla');

    const onCountry = (clickedCountry) => {
        // 이미 선택된 대륙을 두 번 클릭했을 때 초기 상태로 돌아가도록 처리
        if (selectedCountry === clickedCountry) {
            setSelectedCountry('Alla');
            
        } else {
            // 선택한 대륙의 정보를 Context를 통해 업데이트
            setSelectedCountry(clickedCountry);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <SideBar onContinent={onContinent} onCountry={onCountry} />
            <ArrayCity selectedContinent={selectedContinent} selectedCountry={selectedCountry}/>
        </div>
    );
};

export default CityMainPage;