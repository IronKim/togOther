import React, { useRef, useEffect } from 'react';

import styles from '../../css/advisor.module.css'

const AdvisorUserInfo = ({user, selectUser, selectedUser}) => {

    const userRef = useRef(null);

    const handleClick = () => {
        selectUser(user);
    }

    useEffect(() => {
        if (selectedUser === user) {
            userRef.current.scrollIntoView({ behavior: 'instant' });
        }
    }, [selectedUser]);

    return (
        <tr className={`${selectedUser === user ? styles.active : ''} ${styles.info}`} ref={userRef} onClick={handleClick}>
            <td className='fs-6'>{user.userSeq}</td>
            <td className='fs-6'> {user.email}</td>
            <td className='fs-6'>{user.name}</td>
            <td className='fs-6'>{user.dupLogin === 0 ? '로그아웃':'로그인'}</td>
            <td className='fs-6'>{user.coin}</td>
        </tr>
    );
};

export default AdvisorUserInfo;