import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPlannerView } from '../../../api/PlannerApiService';
import { getPlace,getCustomPlace } from '../../../api/PlaceApiService';
import { GoogleMap,Marker } from '@react-google-maps/api';

import styles from '../../../css/plannerView.module.css'

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
/////////////////

    const { plannerSeq } = useParams();
    const [planner,setPlanner] = useState()
    const [plannerImage,setPlannerImage] = useState([])
    const [plannerText,setPlannerText] = useState([])
    const [subItem,setSubItem] = useState([])
   
    const [place,setPlace] = useState([])
    const [custom,setCustom] = useState([])

    useEffect(() => {
        getPlannerView(plannerSeq)
        .then(res => {
            setPlanner(res.data.planner)
            setPlannerImage(res.data.plannerImage)
            setPlannerText(res.data.plannerText)
            setSubItem(res.data.subItem)
            
            let placeDTO = []
            let customDTO = [] 
            res.data.subItem.map(item => {
                if(item.placeSw === 0) {
                    getPlace(item.placeSeq)
                    .then(res2 => placeDTO.push(res2.data))
                }
                if(item.placeSw === 1) {
                    getCustomPlace(item.plCustomSeq)
                    .then(res2 => customDTO.push(res2.data))
                }
            })
            setPlace(placeDTO)
            setCustom(customDTO)
        })
    },[])

    return (
        <div className={styles.main}>
            <div className={styles.title}>{planner && planner.title}</div>
            <div className={styles.timeDate}>{planner && 
                <div>{planner.startDate.split('-')[1]}/{planner.startDate.split('-')[2]}&nbsp;&nbsp;~&nbsp;&nbsp;
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
                    zoom={15}
                    options={{ disableDefaultUI: true}}
                >
                <Marker
                    position={map && {
                    lat: parseFloat(map.lat),
                    lng: parseFloat(map.lng)
                    }}
                />
                </GoogleMap>
            </section>
        </div>
    
    );
};

export default View;