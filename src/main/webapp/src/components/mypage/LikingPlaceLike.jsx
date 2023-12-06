import React from 'react';
import { useUserStore } from '../../stores/mainStore';
import { updateLikingPlace } from '../../api/UserApiService';
import heart from '../../assets/image/heart.png';
import EmptyHeart from '../../assets/image/emptyHeart.png';

const LikingPlaceLike = ({ placeSeq, isTrue, userPlaceLike, setUserPlaceLike }) => {
    
    const { user } = useUserStore();
    const toggleLike = (e) => {

        e.stopPropagation(); // 이벤트 전파 막기

        updateLikingPlace(user.userSeq, placeSeq)
        .then(res => {
            const update = updateCheckboxValue(userPlaceLike, placeSeq);

            console.log(userPlaceLike.includes(placeSeq))

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
            return updatedValues.join(',');
        } else {
            const updatedValues = [...values, value.toString()];
            return updatedValues.join(',');
        }
    };

    return (
        <>
            <img
            src={isTrue ? heart : EmptyHeart}
            style={{ width: '30px', height: '30px', zIndex: '20', position:'relative', left:'20px' , bottom:'280px'}}
            onClick={ (e) => toggleLike(e)}
            alt="Like Button"
            />
        </>
    );
};

export default LikingPlaceLike;