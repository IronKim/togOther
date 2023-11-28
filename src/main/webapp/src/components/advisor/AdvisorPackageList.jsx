import React from 'react';

const AdvisorPackageList = ({selectedCity, packageList, selectPackage}) => {
    return (
        <div>
            <p className='fs-2 m-2'>{selectedCity.cityName}</p>
            {
                packageList.map((item, index) => (
                    <button key={index} className='btn btn-outline-secondary m-1'  onClick={() => selectPackage(item)}>{item.tpTitle}</button>
                ))
            }
            {
                <button className='btn btn-success m-1' onClick={() => selectPackage({
                    tpSeq: '',
                    citySeq: selectedCity.citySeq,
                    tpTitle: '',
                    tpThumbnail: '',
                    tpPrice: '',
                    tpImages: '',
                    tpcontext: '',
                    tpsaleStart: '',
                    tpsaleEnd: '',
                })}>패키지추가</button>
            }
        </div>
    );
};

export default AdvisorPackageList;
