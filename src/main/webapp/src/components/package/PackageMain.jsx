import React, { useEffect, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';
import { getTourPackageList } from '../../api/PackageApiService';

import styles from '../../css/PackageMain.module.css';

import leftButImg from '../../assets/image/left.png'
import rightButImg from '../../assets/image/right.png'
import packBg from '../../assets/image/packageBackground.png'
import searchs from '../../assets/image/search.png'
import { useNavigate } from 'react-router-dom';

const PackageMain = () => {
    const [city,setCity] = useState([])
    const [packages,setPackages] = useState([])
    const [country,setCountry] = useState([])

    const [search,setSearch] = useState('')

    const [itemNum,setItemNum] = useState(0)

    const navigate = useNavigate()

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
                con.push(city.find(ci => ci.citySeq === pack.citySeq) && 
                city.find(ci => ci.citySeq === pack.citySeq).countryName);
                return null;
            });
        
            const cons = new Set(con);
            setCountry([...cons]);
    }, [packages]);
    
    const leftScroll = () => {
        const items = document.querySelectorAll('#countryItem')

        const countryIn = document.getElementById('countryIn')
        
        for (let i = items.length-1;i >= 0;i--) {
            const it = items[i].getBoundingClientRect().left - countryIn.getBoundingClientRect().left + 125;

            if(it < 0) {
                items[i].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
                setItemNum(i)
                return;
            }
            if(i === 0) {
                items[i].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
                setItemNum(i)
            }
        };
    };
    const rightScroll = () => {
        
        const items = document.querySelectorAll('#countryItem')
        const countryIn = document.getElementById('countryIn')

        const coin = countryIn.getBoundingClientRect().width;

        for (let i = 0;i < items.length;i++) {
            const it = items[i].getBoundingClientRect().left - countryIn.getBoundingClientRect().left + 125;

            if(coin < it) {
                items[i].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'end'
                });
                setItemNum(i)
                return;
            }
            if(i === items.length-1) {
                items[i].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
                setItemNum(i)
            }
        };
    };

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`list/${search}`)
        }
      }
    const goList = (cName) => {
        navigate(`list/${cName}`)
      }

    return (
        <>
        <div style={{backgroundImage:`url(${packBg})`}} className={styles.searchBg}>
            <img src={searchs} className={styles.search}/>
            <input type='search'className={styles.searchBox} value={search} 
            onChange={(e)=>setSearch(e.target.value)} placeholder='어디로 떠나시나요?' onKeyDown={(e)=>onSearch(e)}/>
        </div>
            <div className={styles.main}>
            <section className={styles.countrySection}>
            <div className={styles.countryIn} id='countryIn'>
                {itemNum > 0 && <img onClick={()=>leftScroll()} className={styles.leftButton} src={leftButImg}/>}
                {itemNum < country.length-1 &&<img onClick={()=>rightScroll()} className={styles.rightButton} src={rightButImg}/>}
                {   
                    country.map(item => city.find(ci => ci.countryName === item) && 
                    <div className={styles.countryItem} id='countryItem' onClick={()=>goList(item)}
                        style={{backgroundImage:`url(${city.find(ci => ci.countryName === item).cityImage})`}}>
                        <h1>{item}</h1>
                        <p>
                            <font>
                            {packages.filter(pack => {
                                const citys = city.filter(ci => ci.countryName === item).map(ci2 => ci2.citySeq);
                                return citys.includes(pack.citySeq);
                            }).length}</font>
                        개의 상품
                        </p>
                    </div>)
                }
            </div>
            </section>
        </div>
        </>
    );
};

export default PackageMain;