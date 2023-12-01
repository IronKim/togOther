import React from 'react';
import MypageWrite from './MypageWrite';

const MypageMain = ({onErrorImg}) => {
    return (
        <div>
            <MypageWrite onErrorImg={onErrorImg} />
        </div>
    );
};

export default MypageMain;