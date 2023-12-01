import React, { useEffect, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';
import { getTourPackageList, getTourPackageByCitySeq } from '../../api/PackageApiService';

import Card from 'react-bootstrap/Card';

import PackageStyle from '../../css/PackageList.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import packBg from '../../assets/image/packageBackground.png'
import searchs from '../../assets/image/search.png'

const PackageLists = () => {

    const {searchData} = useParams()
    //도시 리스트
    const [cityList, setCityList] = useState([])
    const [cityListHavingPackage, setCityListHavingPackage] = useState([])
    const [packageList, setPackageList] = useState([])

    const [search,setSearch] = useState('')

    const getCityList = () => {
        getCity()
        .then(res =>{
            // console.log(res.data);
            setCityList(res.data);
        })
        .catch(e => console.log(e))
    }

    useEffect(()=> {
        getCityList(); //서버에서 도시를 가져와 도시리스트를 채움
    }
    ,[])

    const getCityListHavingPackage = (citySeq) => {
        getTourPackageByCitySeq(citySeq)
        .then(res => {
            setCityListHavingPackage(res.data);
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        getCityListHavingPackage();
    },[])

    const getPackageList = () => {
        getTourPackageList()
        .then(res => {
            setPackageList(res.data);
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        getPackageList();
    },[])

    const navigate = useNavigate()

    const onToPackagePage = (tpSeq) => {
        navigate(`/package/details/${tpSeq}`)
    }

    const onSearch = (e) => {
    if (e.key === 'Enter') {
        navigate(`/package/list/${search}`)
        }
    }
    
    return (
        <>
        <div style={{backgroundImage:`url(${packBg})`}} className={PackageStyle.searchBg}>
            <img src={searchs} className={PackageStyle.search}/>
            <input type='search'className={PackageStyle.searchBox} value={search} 
            onChange={(e)=>setSearch(e.target.value)} placeholder='어디로 떠나시나요?' onKeyDown={(e)=>onSearch(e)}/>
        </div>
            <div className={PackageStyle.arraymain}> 
                {
                packageList.filter(pack => {
                    const citys = cityList.filter(ci => ci.countryName === searchData || ci.cityName === searchData).map(ci2 => ci2.citySeq);
                    return citys.includes(pack.citySeq);
                }).map((item) => (
                    <Card className={PackageStyle.card} key={item.cityName} onClick={()=>onToPackagePage(item.tpSeq)}>
                        <div className={PackageStyle.cardimgDiv}>
                            <Card.Img className={PackageStyle.cardimg} src={item.tpThumbnail} />
                        </div>
                        <Card.Body className={PackageStyle.cardbody}>
                            <Card.Title className={PackageStyle.cardTitle}>{item.tpTitle}</Card.Title>
                            <div style={{clear:'both'}}></div>
                            <Card.Text className={PackageStyle.cardPrice}>
                               {parseFloat(item.tpPrice).toLocaleString()}원
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>   
        </>
    
    );
};

export default PackageLists;