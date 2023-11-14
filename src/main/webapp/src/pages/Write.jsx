import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WriteFormHeader from '../components/userWriteForm/WriteFormHeader';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/userWriteForm.module.css';

import UserVerification from '../components/userWriteForm/UserVerification';
import DefaultWrite from '../components/userWriteForm/DefaultWrite';

import DetailWrite from '../components/userWriteForm/DetailWrite';
import Detail2Write from '../components/userWriteForm/Detail2Write';
import MbtiMain from '../components/mbti/MbtiMain';
import { addUser } from '../api/UserApiService';
import Agree from '../components/userWriteForm/Agree';


const Write = () => {
    
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        id: '',
        email: '',
        pwd: '',
        tel: '',
        name: '',
        age: '',
        gender: '',
        national: '',
        profileImage: '',
        profileText: '',
        likingFood: '',
        likingTrip: '',
        mbti:'',
        certification: '0'
    });

    const [inputUserData, setInputUserData] = useState({
        id: '',
        email: '',
        pwd: '',
        tel: '',
        name: '',
        age: '',
        gender: '',
        national: '',
        profileImage: '',
        profileText: '',
        likingFood: '',
        likingTrip: '',
        mbti: '',
        certification: '0'
    });

    const onInput = (e) => {
        const { name, value } = e.target;
    
        if (name === 'email') {
            const atIndex = value.indexOf('@');
            const id = atIndex !== -1 ? value.slice(0, atIndex) : '';
            const email = value;
    
            setInputUserData((prevInputUserData) => ({
                ...prevInputUserData,
                id,
                email,
            }));
        } else {
            setInputUserData((prevInputUserData) => ({
                ...prevInputUserData,
                [name]: value,
            }));
        }
    };
    
    const [page, setPage] = useState(0); // 상태값 추가

    const nextPage = () => {
        setPage(page+1);
    } 

    const prevPage = () => {
        setPage(page-1);
    }

    const updateUserData = async() => {
        setUserData((prevUserData) => ({ ...prevUserData, ...inputUserData }));
        //
        onMbti();
    };

    const onSubmitWrite = async() => {
        await updateUserData();
        //createUesr();

    };


    const onMbti = (mbti) => {
        setInputUserData({...inputUserData,mbti : mbti})
        
    }

    useEffect(() => {
        console.log(userData);

        


    }, [userData]);

    const createUesr = () => {
        addUser(userData)
        .then(res => {
            console.log(res.data);
            navigate('/user/login');
        })
        .catch(e => console.log(e));
    };


    return (
        <div>
            <WriteFormHeader page={page}/>
            <div style={{minHeight: '100%', marginTop: '6vw', marginBottom: '6vw'}} className='container'>
                {
                    page === 0 && <UserVerification nextPage={nextPage} inputUserData={inputUserData}/>
                }
                {
                    page === 1 && <Agree nextPage={nextPage} styles={styles} />
                }
                {
                    page === 2 && <DefaultWrite onInput={onInput} inputUserData={inputUserData} nextPage={nextPage} styles={styles} />
                }
                {
                    page === 3 && <DetailWrite onInput={onInput} inputUserData={inputUserData} prevPage={prevPage} nextPage={nextPage} styles={styles} />
                }
                {
                    page === 4 && <Detail2Write onInput={onInput} inputUserData={inputUserData} prevPage={prevPage} nextPage={nextPage} styles={styles} />
                }
                {
                    page === 5 && <MbtiMain onInput={onInput} onMbti={onMbti} prevPage={prevPage} nextPage={nextPage} onSubmitWrite={onSubmitWrite} styles={styles} />
                } 

                {/* <button  onClick={()=> createUesr()}>유저만들기</button> */}
            </div>
        </div>
    );
};

export default Write;
