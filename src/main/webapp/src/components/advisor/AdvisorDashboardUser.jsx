import React, { useEffect, useState } from 'react';
import { getUser, getUserByColumn } from '../../api/AdvisorApiService';
import AdvisorUserInfo from './AdvisorUserInfo';

import styles from '../../css/advisor.module.css'
import AdvisorUserDetail from './AdvisorUserDetail';

const AdvisorDashboardUser = ({placeList}) => {

    const [userList, setUserList] = useState([{
        userSeq: '',
        email: '',
        id: '',
        pwd:'',
        name: '',
        age: '',
        likingPlace: '',
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

    const [userFilterList, setUserFilterList] = useState([{
        userSeq: '',
        email: '',
        id: '',
        pwd:'',
        name: '',
        age: '',
        likingPlace: '',
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
        likingPlace: '',
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
    },[])

    useEffect(() => {
        filterUserList();
    }, [userList]);


    const [search, setSearch] = useState({
        columnName: '',
        searchValue: ''
    });

    const onInput = (e) => {
        const {name, value} = e.target
        
        setSearch({...search, [name]:value})
    }

    const filterUserList = () => {

        console.log('filterUserList');
        setSelectedUser({});

        if(search.columnName === '' || search.searchValue === '') {
            setUserFilterList(userList);
            return;
        }


        setUserFilterList(userList.filter(item => {
            if(search.columnName === 'email') {
                return item.email.includes(search.searchValue);
            } else if(search.columnName === 'name') {
                return item.name.includes(search.searchValue);
            } else {
                return true;
            }
        }));
    }

    useEffect(() => {
        filterUserList();
        

    }, [search]);

    return (
        <div>
            <div>
                <h1 className='fs-1 mb-5 ms-3 mt-3'>사용자 정보</h1>
                <div className='d-flex'>
                    <select className='form-select' name='columnName' value={search.columnName || ''} onChange={onInput} style={{width: '10%'}}>
                        <option value=''>선택</option>
                        <option value='email'>이메일</option>
                        <option value='name'> 이름</option>
                    </select>
                    <input className='form-control' style={{width: '20%'}} name='searchValue' value={search.searchValue} onChange={onInput}/>
                </div>
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

                <div className={styles.hideScrollbar}>
                    <table style={{tableLayout: 'fixed'}} className={styles.userTable}>
                        <tbody>
                            {
                                userFilterList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <AdvisorUserInfo user={item} selectUser={selectUser}  selectedUser={selectedUser}/>
                                        {selectedUser === item && 
                                            <tr>
                                                <td style={{width: '20%'}} colSpan='5'>
                                                    <AdvisorUserDetail selectedUser={selectedUser} placeList={placeList} />
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


