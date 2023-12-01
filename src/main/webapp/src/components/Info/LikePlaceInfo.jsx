import React, { useState } from 'react';

import EmptyHeart from '../../assets/image/emptyHeart.png';
import Heart from '../../assets/image/heart.png';

import { updateLikingPlace } from '../../api/UserApiService';
import { useUserStore } from '../../stores/mainStore';

const LikePlaceInfo = ({ selectedPlace, isTrue, userPlaceLike,setUserPlaceLike, onCntChange }) => {

    const { user } = useUserStore();
    const toggleLike = (e) => {


        e.stopPropagation(); // 이벤트 전파 막기

        updateLikingPlace(user.userSeq, selectedPlace)
        .then(res => {
            const update = updateCheckboxValue(userPlaceLike, selectedPlace);

            setUserPlaceLike(update);
            user.likingPlace = update;
        })
        .catch(e => {console.log(e)})
    }

    // 중복된 값을 처리하고 업데이트
    const updateCheckboxValue = (existingValues, value) => {
        const values = existingValues ? existingValues.split(',') : [];
    
        if (values.includes(value.toString())) {
            const updatedValues = values.filter((v) => v !== value.toString());
            onCntChange(-1)
            return updatedValues.join(',');
        } else {
            const updatedValues = [...values, value.toString()];
            onCntChange(1)
            return updatedValues.join(',');
        }
    };

    return (
        <>
            <img
            src={isTrue ? Heart : EmptyHeart}
            style={{ width: '30px', height: '30px', zIndex: '20', position:'relative'}}
            onClick={ (e) => toggleLike(e)}
            alt="Like Button"
            />
        </>
    );
};

export default LikePlaceInfo;