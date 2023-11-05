import React from 'react';

const AdvisorCityList = ({selectedCountry, cityList, selectCity,selectedCity}) => {
    return (
        <div>
            <p className='fs-2 m-2'>{selectedCountry.countryName}</p>
            <div>
                {
                    cityList.map(item => (
                        <button className='btn btn-outline-info m-1' key={item.citySeq} onClick={() => selectCity(item)}>{item.cityName}</button>
                    ))
                }
                <button className='btn btn-success m-1' onClick={() => selectCity({
                    citySeq: '0',
                    cityImage: '',
                    cityName: '',
                    continentName: selectedCountry.continentName,
                    countryName: selectedCountry.countryName
                })}>도시추가</button>
            </div>
        </div>
    );
};

export default AdvisorCityList;