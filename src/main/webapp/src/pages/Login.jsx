import React, { useState } from 'react';
import styles from '../css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/UserApiService';
import { useUserStore } from '../stores/mainStore';
import Swal from 'sweetalert2'; // SweetAlert2 추가
import loginFormImage from '../assets/image/loginFormImage.png';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [loginDTO, setLoginDTO] = useState({
    email: '',
    pwd: ''
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const oninput = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailError('');
    } else if (name === 'pwd') {
      setPasswordError('');
    }

    setLoginDTO({
      ...loginDTO,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(String(email));
  };

  const validateInput = () => {
    let isValid = true;

    if (!loginDTO.email) {
      setEmailError('이메일을 입력해주세요.');
      isValid = false;
    } else if (!validateEmail(loginDTO.email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!loginDTO.pwd) {
      setPasswordError('비밀번호를 입력해주세요.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    // SweetAlert2 로딩 모달
    Swal.fire({
      title: '로딩 중...',
      allowOutsideClick: false,
      showConfirmButton: false,
      allowEnterKey: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    loginUser(loginDTO)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '로그인 성공',
            showConfirmButton: false,
            timer: 1000
          });

          const { accessToken, refreshToken, user } = res.data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          setUser(user);

          if (user.authority === 'ROLE_ADMIN') {
            navigate('/advisor');
          } else {
            navigate('/');
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '로그인 실패',
            text: '아이디 또는 비밀번호가 일치하지 않습니다.'
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '이메일이나 비밀번호가 일치하지 않습니다.'
        });
      });
  };

  const handleSignUp = () => {
    navigate('/user/write');
  };

  const handleRecovery = () => {
    navigate('/user/ID&PasswordRecovery');
  };


  return (
    <div className={styles.container}>
      <div style={{ position: 'relative', maxWidth: 1200 }}>
        <img className={styles.loginFormImage} src={loginFormImage} alt="loginFormImage" />

        <div className={styles.loginBox}>
          <p style={{ fontSize: '3.4em', marginTop: '0.7em', marginBottom: '0.4em' }}>로그인</p>
          <form style={{display: 'flex', flexDirection: 'column'}}>
            <div className={styles.formGroup}>
              <input type="text" name="email" value={loginDTO.email} onChange={(e) => oninput(e)} required />
              <label htmlFor="email">이메일</label>
            </div>
            <div className={styles.inputError}>{emailError || 'ㅤ'}</div>
            <div className={styles.formGroup}>
              <input type="password" name="pwd" value={loginDTO.pwd} onChange={(e) => oninput(e)} required />
              <label htmlFor="pwd">비밀번호</label>
            </div>
            <div className={styles.inputError}>{passwordError || 'ㅤ'}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em' }}>
              <span className={styles.LoginBoxText} onClick={handleRecovery} >아이디 / 비밀번호 찾기</span>
              <span className={styles.LoginBoxText} onClick={handleSignUp}>회원가입</span>
            </div>
            <button className={styles.loginBtn} type="submit" onClick={onsubmit}>
              로그인
            </button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', marginTop: '3em' }}>
            <img src="https://img.icons8.com/ios/50/000000/google-logo.png" alt="google" />
            <img src="https://img.icons8.com/ios/50/000000/naver.png" alt="naver" />
            <img src="https://img.icons8.com/ios/50/000000/kakao-talk.png" alt="kakao" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
