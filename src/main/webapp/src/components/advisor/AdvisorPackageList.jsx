import React from 'react';

const AdvisorPackageList = ({selectedCity, packageList, selectPackage}) => {
    return (
        <div>
            <p className='fs-2 m-2'>{selectedCity.cityName}</p>
            {
                packageList.map((item, index) => (
                    <button key={index} className='btn btn-outline-secondary m-1'  onClick={() => selectPackage(item)}>{item.name}</button>
                ))
            }
            {
                <button className='btn btn-success m-1' onClick={() => selectPackage({
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
                })}>패키지 추가</button>
            }
        </div>
    );
};

export default AdvisorPackageList;