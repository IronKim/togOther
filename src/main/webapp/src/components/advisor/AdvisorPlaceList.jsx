import React from 'react';

const AdvisorPlaceList = ({selectedCity, placeList, selectPlace}) => {
    return (
        <div>
            <p className='fs-2 m-2'>{selectedCity.cityName}</p>
            {
                placeList.map(item => (
                    <button className='btn btn-outline-secondary m-1' key={item.placeSeq} onClick={() => selectPlace(item)}>{item.name}</button>
                ))
            }
            {
                <button className='btn btn-success m-1' onClick={() => selectPlace({
                    placeSeq: '0',
                    citySeq: selectedCity.citySeq,
                    code: '',
                    name: '',
                    address: '',
                    longitude: '',
                    latitude: '',
                    image: '',
                    subImage1: '',
                    subImage2: '',
                    context1: '',
                    context2: '',
                    context3: '',
                    likeCnt: '',
                    tag: '',
                })}>장소추가</button>
            }
        </div>
    );
};

export default AdvisorPlaceList;