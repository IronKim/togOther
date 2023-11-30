import React, { useEffect, useRef, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';
import { getTourPackageList } from '../../api/PackageApiService';

import styles from '../../css/PackageMain.module.css';

import Card from 'react-bootstrap/Card';

import leftButImg from '../../assets/image/left.png'
import rightButImg from '../../assets/image/right.png'
import packBg from '../../assets/image/packageBackground.png'
import plannerImg from '../../assets/image/planner.png'
import cityImg from '../../assets/image/city.png'
import searchs from '../../assets/image/search.png'
import { useNavigate } from 'react-router-dom';

const PackageMain = () => {
    const [city,setCity] = useState([])
    const [packages,setPackages] = useState([])
    const [country,setCountry] = useState([])

    const [search,setSearch] = useState('')

    const [itemNum,setItemNum] = useState(0)

    const foc = useRef();

    const navigate = useNavigate()

    function shuffleArray(array) {
        let shuffledArray = array.slice();
      
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
      
        return shuffledArray;
      }

    useEffect(()=>{
        getCity()
        .then(res => {
            setCity(res.data)
        })
        .then(
            getTourPackageList()
            .then(res => setPackages(shuffleArray(res.data).slice()))
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
    const goTop = () => {
        window.scrollTo(0, 0);
        foc.current.focus();
    }
    const goCommunity = () => {
        window.scrollTo(0, 0);
        navigate(`/community`)
    }
    const goCity = () => {
        window.scrollTo(0, 0);
        navigate(`/info/cityList`)
    }

    return (
        <>
        <div style={{backgroundImage:`url(${packBg})`}} className={styles.searchBg}>
            <img src={searchs} className={styles.search}/>
            <input type='search'className={styles.searchBox} value={search}  ref={foc}
            onChange={(e)=>setSearch(e.target.value)} placeholder='어디로 떠나시나요?' onKeyDown={(e)=>onSearch(e)}/>
        </div>
            <div className={styles.main}>
            <div className={styles.pop}>인기 여행지</div>
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
            <section className={styles.centerSection}>
                <button onClick={()=>goCommunity()}><img src={plannerImg}/>&nbsp;여행 계획 짜보기</button>
                <button onClick={()=>goCity()}><img src={cityImg}/>&nbsp;어디 갈지 알아보기</button>
            </section>
            <section className={styles.packageSection}>
                <h1 className={styles.pop}>추천 패키지</h1>
                    {
                        packages.filter((item,index) => index < 4).map(pack => 
                            // 이빈이형 카드 리스트 파츠 쓴곳임
                                <Card className={styles.card} key={pack.cityName}>
                                <div className={styles.cardimgDiv}>
                                    <Card.Img className={styles.cardimg} src={pack.tpThumbnail} />
                                </div>
                                <Card.Body className={styles.cardbody}>
                                    <Card.Title className={styles.cardTitle}>{pack.tpTitle}</Card.Title>
                                    <Card.Text className={styles.cardPrice}>
                                            {pack.tpPrice}원
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            //
                        )
                    }
                <h2 onClick={() => goTop()}>패키지 찾아보기&nbsp;&nbsp;<img src={searchs}/></h2>
            </section>
        </div>
        </>
    );
};

export default PackageMain;