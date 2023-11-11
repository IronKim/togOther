import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/AdvisorApiService';
import AdvisorUserInfo from './AdvisorUserInfo';

import styles from '../../css/advisor.module.css'
import AdvisorUserDetail from './AdvisorUserDetail';

const AdvisorDashboardUser = () => {


    const [userList, setUserList] = useState([{
        userSeq: '',
        email: '',
        id: '',
        pwd:'',
        name: '',
        age: '',
        cityFix: '',
        cityList: '',
        coin: '',
        dupLogin: '',
        gender: '',
        likingFood: '',
        likingTrip: '',
        mbti: '',
        national: '',
        profileImage: '',
        profileText: ''
    }]);

    const getUserList = () => {
        getUser()
        .then(res => {
            setUserList(res.data);
        })
        .catch(e => console.log(e));
    }

    const [selectedUser, setSelectedUser] = useState({
        userSeq: '',
        email: '',
        id: '',
        pwd:'',
        name: '',
        age: '',
        cityFix: '',
        cityList: '',
        coin: '',
        dupLogin: '',
        gender: '',
        likingFood: '',
        likingTrip: '',
        mbti: '',
        national: '',
        profileImage: '',
        profileText: ''
    });

    const selectUser = (user) => {

        if(selectedUser === user) {
            setSelectedUser({});
            return;
        }

        setSelectedUser(user);
    }

    useEffect(()=> {
        getUserList();

    }
    ,[])

    return (
        <div>
            <div>
                <h1 className='fs-1 m-5'>사용자 정보</h1>
    
                <table className={styles.userTable}>
                    <thead style={{position: 'sticky', top: 0}}>
                        <tr>
                            <th className='fs-5' style={{width: '20%'}}>번호</th>
                            <th className='fs-5' style={{width: '20%'}}>이메일</th>
                            <th className='fs-5' style={{width: '20%'}}>이름</th>
                            <th className='fs-5' style={{width: '20%'}}>상태</th>
                            <th className='fs-5' style={{width: '20%'}}>코인</th>
                        </tr>
                    </thead>
                </table>
    
                <div style={{overflowY: 'auto', maxHeight: '350px'}}>
                    <table style={{tableLayout: 'fixed'}} className={styles.userTable}>
                        <tbody>
                            {
                                userList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <AdvisorUserInfo user={item} selectUser={selectUser}  selectedUser={selectedUser}/>
                                        {selectedUser === item && 
                                            <tr>
                                                <td style={{width: '20%'}} colSpan='5'>
                                                    <AdvisorUserDetail selectedUser={selectedUser} />
                                                </td>
                                            </tr>
                                        }   
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdvisorDashboardUser;


