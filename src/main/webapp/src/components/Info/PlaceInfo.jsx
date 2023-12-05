import React, { useEffect, useState } from 'react';
import { getPlaceBySeq } from '../../api/PlaceApiService';
import PlaceMap from './PlaceMap';
import LikePlaceInfo from './LikePlaceInfo';
import { useUserStore } from '../../stores/mainStore';

const PlaceInfo = ({ placeSeq }) => {
  
  const [selectedPlace, setSelectedPlace] = useState(null);
  const selectedPlaceSeq = placeSeq; // 원하는 placeSeq 값으로 설정

  const { user, getUserByToken } = useUserStore();
  const [userPlaceLike, setUserPlaceLike] = useState(user.likingPlace);

  const [likeCnt, setLickCnt] = useState();

  useEffect(() => {
    getPlaceBySeq(selectedPlaceSeq)
      .then(response => {
        setSelectedPlace(response.data);
        setLickCnt(response.data.likeCnt);
      })
      .catch(error => {
        console.error('Error fetching place details: ', error);
      });
  }, [selectedPlaceSeq]);

  // like
  useEffect(() => {
    setUserPlaceLike(user.likingPlace);
  },[user])

  const onCntChange = (cnt) => {
    setLickCnt(likeCnt + cnt);
  }

  // minWidth: '640px',
  return (
    <div style={{ maxWidth: '728px',   margin: '0 auto' }}> 
      {selectedPlace && (
        <div style={{margin: '0 auto'}}>
          <p className="fs-1" style={{ width: '100%', textAlign: 'center', margin: '30px auto' , fontSize: '3em'  }}>
            {selectedPlace.name}
          </p>
          <LikePlaceInfo selectedPlace={selectedPlaceSeq} 
                         isTrue={user.likingPlace === null ? false: userPlaceLike.includes(selectedPlace.placeSeq)}
                         userPlaceLike={userPlaceLike} setUserPlaceLike={setUserPlaceLike}
                         onCntChange = {onCntChange}
                        />
          <span style={{position:'relative', left:'10px', fontSize:'25px', bottom:'6px'}}>{likeCnt}</span>
          <img
            src={selectedPlace.image}
            className="rounded mx-auto d-block"
            alt="Image"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              display: 'block',
              margin: 'auto',
              transition: 'width 0.5s',
            }}
          />

          {selectedPlace.context1 && (
            <p className="fs-5" style={{ width: '100%', textAlign: 'center', margin: '30px auto', lineHeight: '1.5' ,fontSize: '1.5vw'  }}>
              {selectedPlace.context1}
            </p>
          )}

          {selectedPlace.subImage1 && (
            <div>
              <img
                src={selectedPlace.subImage1}
                className="rounded mx-auto d-block"
                alt="Image"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  display: 'block',
                  margin: 'auto',
                  transition: 'width 0.5s',
                  marginTop: '30px'
                }}
              />
            </div>
          )}

          {selectedPlace.context2 && (
            <p className="fs-5" style={{ width: '100%', textAlign: 'center', margin: '30px auto', lineHeight: '1.5'  ,fontSize: '1.5vw' }}>
              {selectedPlace.context2}
            </p>
          )}

          {selectedPlace.subImage2 && (
            <div>
              <img
                src={selectedPlace.subImage2}
                className="rounded mx-auto d-block"
                alt="Image"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  display: 'block',
                  margin: 'auto',
                  transition: 'width 0.5s',
                  marginTop: '30px'
                }}
              />
            </div>
          )}

          {selectedPlace.context3 && (
            <p className="fs-5" style={{ width: '100%', textAlign: 'center', margin: '30px auto', lineHeight: '1.5'  ,fontSize: '1.5vw' }}>
              {selectedPlace.context3}
            </p>
          )}

          <p className="fs-2" style={{ width: '100%', textAlign: 'center', margin: '30px auto' }}>
            기본정보
          </p>

          <PlaceMap
            longitude={selectedPlace.longitude}
            latitude={selectedPlace.latitude}
            address={selectedPlace.address}
          />
        </div>
      )}
      <hr style={{ width: '100%', display: 'block', margin: '30px auto', borderWidth: '5px' }} />
    </div>
  );
};

export default PlaceInfo;