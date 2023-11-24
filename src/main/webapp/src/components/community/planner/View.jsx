import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPlannerView } from '../../../api/PlannerApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';
import { GoogleMap,Marker } from '@react-google-maps/api';

import styles from '../../../css/plannerView.module.css'
import WhatDay from './WhatDay';

const containerStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto'
};

// const myStyles = [
//     {
//       featureType: "poi",
//       elementType: "labels",
//       stylers: [{ visibility: "off" }],
//     },
//   ];

const View = () => {
//지도
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMap({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('못가져와:', error);
            }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);
////////////////
    const [subHover,setSubHover] = useState(-1)

    const onMouseOn = (seq) => {
        const xy = subItem.find(item => item.subSeq === seq)

        let lats = 0;
        let lngs = 0;

        if(xy.placeSw === 0 && place.find(pl => pl.placeSeq === xy.placeSeq)) {
            lats = place.find(item => item.placeSeq === xy.placeSeq ).latitude
            lngs = place.find(item => item.placeSeq === xy.placeSeq ).longitude
        }
        if(xy.placeSw === 1 && custom.find(cus => cus.plCustomSeq === xy.plCustomSeq)) {
            lats = custom.find(item => item.plCustomSeq === xy.plCustomSeq).latitude
            lngs = custom.find(item => item.plCustomSeq === xy.plCustomSeq).longitude
        }

        setMap({ lat: lats, lng: lngs });

        setSubHover(seq)
    }
    const onMouseOff = () => {
        setSubHover(-1)
    }

    const { plannerSeq } = useParams();
    const [planner,setPlanner] = useState()
    const [plannerImage,setPlannerImage] = useState([])
    const [plannerText,setPlannerText] = useState([])
    const [subItem,setSubItem] = useState([])
   
    const [place,setPlace] = useState([])
    const [custom,setCustom] = useState([])

    ////////////////몇일차 구하기
    const [whatDay,setWhatDay] = useState([]) 

    useEffect(()=>{
        if(planner) {
            const dateStart = new Date(planner.startDate)
            const dateEnd = new Date(planner.endDate)
            const ar = [];
            for(let i = 0;i <= (dateEnd - dateStart)/(1000 * 60 * 60 * 24);i++) {
                ar.push(i+1)
            }
            setWhatDay(ar)
        }
    },[planner])
    ////////////////날짜 구하기
    const getToday = (wDay) => {
        const date = new Date(planner.startDate)
        date.setDate(date.getDate() + wDay - 1);

        const week = date.getDay();
        const day = date.getDate();
        const month = date.getMonth()+1;

        return `${month}월 ${day}일 (${week===0 ? '일' : week===1 ? '월' : week===2 ? '화' : week===3 ? '수' :
        week===4 ? '목' : week===5 ? '금' : week===6 ? '토' : ''})`;
    }
    //***************************

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getPlannerView(plannerSeq);
            setPlanner(res.data.planner);
            setPlannerImage(res.data.plannerImage);
            setPlannerText(res.data.plannerText);
            setSubItem(res.data.subItem);
      
            let placeDTO = [];
            let customDTO = [];
      
            await Promise.all(
              res.data.subItem.map(async (item) => {
                if (item.placeSw === 0) {
                  const res2 = await getPlace(item.placeSeq);
                  placeDTO.push(res2.data);
                }
                if (item.placeSw === 1) {
                  const res2 = await getCustomPlace(item.plCustomSeq);
                  customDTO.push(res2.data);
                }
              })
            );
      
            setPlace(placeDTO);
            setCustom(customDTO);
          } catch (error) {
            console.error("Error during data fetching:", error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <div className={styles.main}>
            <div className={styles.title}>{planner && planner.title}</div>
            <div className={styles.timeDate}>{planner && 
                <div>{planner.startDate.split('-')[1]}/{planner.startDate.split('-')[2]}&nbsp;&nbsp;-&nbsp;&nbsp;
                    {planner.endDate.split('-')[1]}/{planner.endDate.split('-')[2]}
                </div> }
            </div>
            <section className={styles.mapSection}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={map && {
                    lat: parseFloat(map.lat),
                    lng: parseFloat(map.lng)
                    }}
                    zoom={13}
                    options={{ disableDefaultUI: true}}
                >
                {
                    subItem.map(item => <Marker
                        key={item.subSeq} // 적절한 고유한 키를 사용해야 합니다.
                        position={{
                        lat: item.placeSw === 0
                            ? place.find(pl => pl.placeSeq === item.placeSeq) &&
                                parseFloat(place.find(pl => pl.placeSeq === item.placeSeq).latitude)
                            : custom.find(cus => cus.plCustomSeq === item.plCustomSeq) &&
                                parseFloat(custom.find(cus => cus.plCustomSeq === item.plCustomSeq).latitude),
                        lng: item.placeSw === 0
                            ? place.find(pl => pl.placeSeq === item.placeSeq) &&
                                parseFloat(place.find(pl => pl.placeSeq === item.placeSeq).longitude)

                            : custom.find(cus => cus.plCustomSeq === item.plCustomSeq) &&
                                parseFloat(custom.find(cus => cus.plCustomSeq === item.plCustomSeq).longitude)
                        }}
                    />)
                }{
                    <Marker
                    position={ map && {
                    lat: parseFloat(map.lat),
                    lng: parseFloat(map.lng)
                    }}
                />
                }
                </GoogleMap>
            </section>
            <section className={styles.listSection}>
                    {
                        whatDay.map(item => 
                            <WhatDay key={item} getToday={getToday} nDay={item} 
                                plannerImage={plannerImage.filter(plImg => plImg.nday === item)}
                                plannerText={plannerText.filter(plTxt => plTxt.nday === item)}
                                subItem={subItem.filter(sub => sub.nday === item)}
                                place={place} custom={custom}
                                onMouseOn={onMouseOn} onMouseOff={onMouseOff} subHover={subHover}
                            />
                        )
                    }
            </section>
        </div>
    );
};

export default View;