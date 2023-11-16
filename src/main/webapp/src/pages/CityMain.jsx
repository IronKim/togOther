// CityMainPage.js

import React, { useState } from 'react';
import SideBar from '../components/Info/SideBar';
import ArrayCity from '../components/Info/ArrayCity';
import { Container, SidebarContainer, Sidebar, MainContent, Overlay } from '../css/Info/CityMainPageStyles';

const CityMainPage = () => {
    const [selectedContinent, setSelectedContinent] = useState('All');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

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

    const [selectedCountry, setSelectedCountry] = useState('Alla');
    const onCountry = (clickedCountry) => {
        if (selectedCountry === clickedCountry) {
            setSelectedCountry('Alla');
        } else {
            setSelectedCountry(clickedCountry);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <Container isSidebarExpanded={isSidebarExpanded}>
            <SidebarContainer onClick={toggleSidebar}>
                ☰
            </SidebarContainer>
            <Sidebar isSidebarExpanded={isSidebarExpanded}>
                <SideBar onContinent={onContinent} onCountry={onCountry} />
            </Sidebar>

            <Overlay isSidebarExpanded={isSidebarExpanded} onClick={toggleSidebar} />

            <MainContent isSidebarExpanded={isSidebarExpanded}>
                <ArrayCity selectedContinent={selectedContinent} selectedCountry={selectedCountry}/>
            </MainContent>
        </Container>
    );
};

export default CityMainPage;
