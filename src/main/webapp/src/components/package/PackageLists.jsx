import React, { useEffect, useState } from 'react';
import { getCity } from '../../api/AdvisorApiService';
import { getTourPackageList,getTourPackageByCitySeq } from '../../api/PackageApiService';

import Card from 'react-bootstrap/Card';

import PackageStyle from '../../css/PackageList.module.css'
import { useNavigate } from 'react-router-dom';

const PackageLists = () => {

    //도시 리스트
    const [cityList, setCityList] = useState([])
    const [cityListHavingPackage, setCityListHavingPackage] = useState([])
    const [packageList, setPackageList] = useState([])

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

    const onToCityPage = (citySeq) => {
        navigate(`/packageDetail/${citySeq}`)
    }
    return (
        <>
            <div className={PackageStyle.arraymain}> 
                {
                packageList.map((item) => (
                    <Card className={PackageStyle.card} key={item.cityName} onClick={()=>onToCityPage(item.citySeq)}>
                        <div className={PackageStyle.cardimgDiv}>
                            <Card.Img className={PackageStyle.cardimg} src={item.tpThumbnail} />
                        </div>
                        <Card.Body className={PackageStyle.cardbody}>
                            <Card.Title className={PackageStyle.cardTitle}>{item.tpTitle}</Card.Title>
                            <Card.Text className={PackageStyle.cardPrice}>
                                {item.tpPrice}원
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>   
        </>
    
    );
};

export default PackageLists;