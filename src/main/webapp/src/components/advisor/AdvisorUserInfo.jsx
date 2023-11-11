import React from 'react';

import styles from '../../css/advisor.module.css'

const AdvisorUserInfo = ({user, selectUser, selectedUser}) => {

    console.log(selectedUser === user)

    return (
        <tr className={`${selectedUser === user ? styles.active : ''} ${styles.info}`}   onClick={() => selectUser(user)}>
            <td className='fs-6'>{user.userSeq}</td>
            <td className='fs-6'> {user.email}</td>
            <td className='fs-6'>{user.name}</td>
            <td className='fs-6'>{user.dupLogin === 0 ? '로그아웃':'로그인'}</td>
            <td className='fs-6'>{user.coin}</td>
        </tr>
    );
};

export default AdvisorUserInfo;