import React, { useEffect } from 'react';

const WriteFormComplete = ({createUesr}) => {

    useEffect(() => {
        createUesr();
    }, []);

    return (
        <div>
            <div>
                <p>환영합니다</p>
                <p>회원가입이 완료되었습니다.</p>
                <button>로그인</button> 
            </div>
        </div>
    );
};

export default WriteFormComplete;