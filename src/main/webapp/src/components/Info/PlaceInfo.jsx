import React, { useEffect, useState } from 'react';
import { getPlaceBySeq } from '../../api/PlaceApiServeice';
// import styles from '../../css/placepage.module.css';
// import '../../css/placepage.module.css';
import PlaceMap from './PlaceMap';


const PlaceInfo = ({placeSeq}) => {
  const [placeData, setPlaceData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const selectedPlaceSeq = placeSeq; // 원하는 placeSeq 값으로 설정

  useEffect(() => {

    getPlaceBySeq(selectedPlaceSeq)
      .then(response => {
        setSelectedPlace(response.data);
      })
      .catch(error => {
        console.error('Error fetching place details: ', error);
      });
  }, [selectedPlaceSeq]);

  return (
    <div >

      {selectedPlace && (
        <div>
            <p class="fs-1" style={{width:"728px", display: "block", margin: "30px auto"}}>{selectedPlace.name}</p>

      
          <img src={selectedPlace.image} class="rounded mx-auto d-block" alt="Image" style={{width:"728px", height: "400px", display: "block", margin: "auto"}}/>

                {selectedPlace.context1 && (
                <p class="fs-6" style={{width:'708px' , display: 'block', margin: '30px auto', lineHeight: '1.5'}}>{selectedPlace.context1}</p>
                )}
                {selectedPlace.subImage1 && (
            <div>
                <img src={selectedPlace.subImage1} class="rounded mx-auto d-block" alt="Image" style={{width:"728px", height: "400px", display: "block", margin: "auto"}}/>   
            </div>
            )}
                {selectedPlace.context2 && (
            <p class="fs-6" style={{width:'708px' , display: 'block', margin: '30px auto' , lineHeight: '1.5'}}>{selectedPlace.context2}</p>
            )}
                {selectedPlace.subImage2 && (
            <div>
                <img src={selectedPlace.subImage2} class="rounded mx-auto d-block" alt="Image" style={{width:"728px", height: "400px", display: "block", margin: "auto"}}/>   
            </div>
            )}
                {selectedPlace.context3 && (
            <p class="fs-6" style={{width:'708px' , display: 'block', margin: '30px auto' , lineHeight: '1.5'}}>{selectedPlace.context3}</p>
            )}
        <p >
        <p class="fs-4" style={{width:"728px", display: "block", margin: "30px auto"}}>기본정보</p>
            <PlaceMap
            longitude={selectedPlace.longitude}
            latitude={selectedPlace.latitude}
            address={selectedPlace.address}
          />
    </p>
          {/* <p style={{width:"728px", display: "block", margin: "auto"}}>주소: {selectedPlace.address}</p> */}
          {/* <p style={{width:"728px", display: "block", margin: "auto"}}>경도: {selectedPlace.longitude}  위도: {selectedPlace.latitude}</p> */}
          {/* 다른 세부 정보 필드를 추가 */}
        </div>
      )}
      <hr style={{width:"728px", display: "block", margin: "30px auto"}}/>

        

    </div>
  );
};

export default PlaceInfo;
