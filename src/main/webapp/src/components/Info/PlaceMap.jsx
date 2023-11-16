import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import markerImage from '../../assets/image/pngwing.png';

const containerStyle = {
  width: '728px',
  height: '400px',
  display: 'block',
  margin: '30px auto 0 auto',
};

const PlaceMap = ({ longitude, latitude, address }) => {
//   const [gestureHandling, setGestureHandling] = useState('none');

//   const toggleGestureHandling = () => {
//     setGestureHandling((gestureHandling) => (gestureHandling === 'none' ? 'auto' : 'none'));
//   };

const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  // longitude와 latitude가 정의되어 있는지 확인
  if (!longitude || !latitude) {
    return <p>위치 정보를 찾을 수 없습니다.</p>;
  }

  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  const mapOptions = {
    // gestureHandling,
    gestureHandling: 'none',
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  const markerStyle = {
    width: '32px', // 원하는 크기로 조절
    height: '32px', // 원하는 크기로 조절
  };

  

  function MyComponent() {
    return (
      <div>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16} gestureHandling='none' options={mapOptions}>
            <MarkerF position={center} icon={{markerImage, scaledSize: markerStyle}}></MarkerF>
          </GoogleMap>
        </LoadScript>
        {/* <div><button onClick={toggleGestureHandling}>지도제어</button></div> */}
        <p style={{width:"728px", display: "block", margin: "auto"}}>주소: {address}<button onClick={openGoogleMaps} type="button" class="btn btn-link">지도로 이동</button></p>
        
      </div>
    );
  }

  return <MyComponent />;
};

export default PlaceMap;