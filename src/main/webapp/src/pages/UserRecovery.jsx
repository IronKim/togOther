import React from 'react';

const UserRecovery = () => {
    return (
        <div>
            <div>
                <div>
                    <p>아이디 찾기</p>
                    <input type='text' placeholder='휴대폰 번호 입력' />
                </div>
                <div>
                    <p>비밀번호 찾기</p>
                    <input type='text' placeholder='아이디 입력' />
                    <input type='text' placeholder='휴대폰 번호 입력' />
                </div>
            </div>
        </div>
    );
};

export default UserRecovery;