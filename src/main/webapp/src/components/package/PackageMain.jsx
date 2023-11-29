import React, { useEffect, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';
import { getTourPackageList } from '../../api/PackageApiService';

import styles from '../../css/PackageMain.module.css';

const PackageMain = () => {
    const [city,setCity] = useState([])
    const [packages,setPackages] = useState([])
    const [country,setCountry] = useState([])

    useEffect(()=>{
        getCity()
        .then(res => {
            setCity(res.data)
        })
        .then(
            getTourPackageList()
            .then(res => setPackages(res.data))
        )
    },[])

    useEffect(() => {
        let con = [];
        packages.map(pack => {
            con.push(city.find(ci => ci.citySeq === pack.citySeq).countryName);
            return null;
        });
    
        const cons = new Set(con);
        setCountry([...cons]);
    }, [packages]);

    return (
        <div className={styles.main}>
            <section className={styles.countrySection}>
            <div className={styles.countryIn}>
                {   
                    country.map(item => <div className={styles.countryItem}
                        style={{backgroundImage:`url(${city.find(ci => ci.countryName === item).cityImage})`}}>
                        <h1>{item}</h1>
                        {/* <p>{packages.filter(pack => pack.citySeq === city.filter(ci => ci.countryName === item).map(ci2 =>
                            ci2    
                        )).length}개의 상품</p> */}
                    </div>)
                }
            </div>
            </section>
        </div>
    );
};

export default PackageMain;