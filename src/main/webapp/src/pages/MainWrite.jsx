import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Write from './Write';
import DetailWrite from './DetailWrite';
import Detail2Write from './Detail2Write';
import MbtiMain from '../components/mbti/MbtiMain';

const MainWrite = () => {
    
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
    });

    // const onInput = (e) => {
    //     const { name, value } = e.target;
        
    //     setInputUserData({...inputUserData, [name]: value});
    // };
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
    });

    const [page, setPage] = useState(0); // 상태값 추가

    const updateUserData = () => {
        setUserData((prevUserData) => ({ ...prevUserData, ...inputUserData }));
        
    };

    const onSubmitWrite = () => {
        updateUserData();
        // 다음 페이지로 이동
        nextPage();
    };

    const nextPage = () => {
        setPage(page+1);
    } 

    const prevPage = () => {
        setPage(page-1);
    }

    const onMbti = (mbti) => {
        setInputUserData({...inputUserData,mbti : mbti})
    }

    useEffect(() => {
        console.log(userData);
    }, [userData]);


    return (
        <div>
            {
                page === 0 && <Write onInput={onInput} inputUserData={inputUserData} nextPage={nextPage} />
            }
            {
                page === 1 && <DetailWrite onInput={onInput} inputUserData={inputUserData} prevPage={prevPage} nextPage={nextPage} />
            }
            {
                page === 2 && <Detail2Write onInput={onInput} inputUserData={inputUserData} prevPage={prevPage} nextPage={nextPage} />
            }
            {
                page === 3 && <MbtiMain onInput={onInput} onMbti={onMbti} prevPage={prevPage} nextPage={nextPage} onSubmitWrite={onSubmitWrite} />
            }
        
        </div>
    );
};

export default MainWrite;
