import React, { useEffect } from 'react';
import { getUserLikingPlace } from '../../api/UserApiService';
import { useUserStore } from '../../stores/mainStore';
import efault from '../../css/MyPage.module.css';

const MypageLikingPlace = () => {

    const {user} = useUserStore();

    useEffect(() => {
        getUserLikingPlace(user.userSeq)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    ,[])

    return (
        <div>
            <p className={efault.tagName}>관심 장소</p>
            <hr className={efault.hr} />
        </div>
    );
};

export default MypageLikingPlace;