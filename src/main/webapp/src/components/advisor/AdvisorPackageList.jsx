import React from 'react';

const AdvisorPackageList = ({selectedCountry, packageList, selectPackage}) => {

    return (
        <div>
            <p className='fs-2 m-2'>{selectedCountry.countryName}</p>
            <div>
                {
                    packageList.map(item => (
                        <button key={item.tpSeq} className='btn btn-outline-info m-1'  onClick={() => selectPackage(item)}>{item.tpTitle}</button>
                    ))
                }
                <button className='btn btn-success m-1' onClick={() => selectPackage({
                    tpSeq: '',
                    citySeq: '',
                    tpTitle: '',
                    tpThumbnail: '',
                    tpPrice: '',
                    continentName: selectedCountry.continentName,
                    countryName: selectedCountry.countryName
                })}>패키지 추가</button>
            </div>
        </div>
    );
};

export default AdvisorPackageList;