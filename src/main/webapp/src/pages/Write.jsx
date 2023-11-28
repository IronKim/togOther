import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WriteFormHeader from '../components/userWriteForm/WriteFormHeader';
import Swal from 'sweetalert2';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/userWriteForm.module.css';

import UserVerification from '../components/userWriteForm/UserVerification';
import DefaultWrite from '../components/userWriteForm/DefaultWrite';

import DetailWrite from '../components/userWriteForm/DetailWrite';
import Detail2Write from '../components/userWriteForm/Detail2Write';
import MbtiMain from '../components/mbti/MbtiMain';
import { addUser } from '../api/UserApiService';
import Agree from '../components/userWriteForm/Agree';
import { getUserByEmail } from '../api/UserApiService';
import { uploadPlannerImage } from '../api/PlannerApiService';
import WriteFormComplete from '../components/userWriteForm/WriteFormComplete';


const Write = () => {
    
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        id: '',
        email: '',
        pwd: '',
        name: '',
        birthday: '',
        phone: '',
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
        name: '',
        birthday: '',
        phone: '',
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

    const onbirthInput = (birth) => {
        setInputUserData({...inputUserData, birthday : birth})
    }
    
    const [page, setPage] = useState(0); // 상태값 추가

    const nextPage = () => {
        setPage(page+1);
    } 

    const prevPage = () => {
        setPage(page-1);
    }

    const updateUserData = async() => {
        setUserData((prevUserData) => ({ ...prevUserData, ...inputUserData }));
    };

    const onSubmitWrite = async() => {
        await updateUserData();
        nextPage();

    };


    const onMbti = (mbti) => {
        setInputUserData({...inputUserData,mbti : mbti});
    }

    useEffect(() => {
        console.log(userData);

        


    }, [userData]);

    const createUesr = () => {
    const formData = new FormData();

    fetch(inputUserData.profileImage)
    .then(response => response.blob())
    .then(blob => {
      const file = new File([blob], 'image.png', { type: 'image/png' });
      formData.append('files', file);

      return uploadPlannerImage(formData);
    })
    .then(res2 => {
      const userDt = { ...inputUserData, profileImage: res2.data };
      console.log(userDt)
      return addUser(userDt);
    })
    .catch(e => {
        Swal.fire({
            icon: 'error',
            title: '회원가입 실패',
            html: '다시 시도해주세요.',
            confirmButtonText: '확인',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
          });
        
    });
};

    const checkEmail = async (email) => {
        try {
          const exists = await getUserByEmail(email);
          return exists; 
        } catch (error) {
            throw error;
        }
      };


    return (
        <div>
            <WriteFormHeader page={page}/>
            <div className={styles.mainContainer}>
                {
                    page === 0 && <UserVerification nextPage={nextPage} inputUserData={inputUserData} userData={userData}/>
                }
                {
                    page === 1 && <Agree nextPage={nextPage} styles={styles} />
                }
                {
                    page === 2 && <DefaultWrite onbirthInput={onbirthInput} onInput={onInput} inputUserData={inputUserData} nextPage={nextPage} styles={styles} userData={userData} checkEmail={checkEmail} />
                }
                {
                    page === 3 && <DetailWrite onInput={onInput} inputUserData={inputUserData} nextPage={nextPage} styles={styles} />
                }
                {
                    page === 4 && <Detail2Write onInput={onInput} inputUserData={inputUserData} prevPage={prevPage} nextPage={nextPage} styles={styles} />
                }
                {
                    page === 5 && <MbtiMain onInput={onInput} onMbti={onMbti} prevPage={prevPage} nextPage={nextPage} onSubmitWrite={onSubmitWrite} styles={styles} inputUserData={inputUserData} />
                } 
                {
                    page === 6 && <WriteFormComplete createUesr={createUesr} styles={styles}/>
                }
                
            </div>
            <button onClick={prevPage}>이전</button>
            <button onClick={nextPage}>다음</button>
        </div>
    );
};

export default Write;
