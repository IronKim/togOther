import React, { useState } from 'react';
import styles from '../css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/UserApiService';
import { useUserStore } from '../stores/mainStore';
import { MdOutlineAlternateEmail } from "react-icons/md";
import loginFormImage from '../assets/image/loginFormImage.png';

const Login = () => {

  const navigate = useNavigate();

  const {user, setUser} = useUserStore();

  const [loginDTO, setLoginDTO] = useState({
    email: '',
    pwd: ''
  });

  const oninput = (e) => {
    const { name, value } = e.target;
    
    setLoginDTO({
      ...loginDTO,
      [name]: value
    });

  }

  const onsubmit = (e) => {
    e.preventDefault();

    loginUser(loginDTO)
    .then(res => {
      console.log(res);
      if(res.status === 200) {
        alert('로그인 성공');

        console.log(res.data);

        const {accessToken, refreshToken, user} = res.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(user);

        if(user.authority === 'ROLE_ADMIN') {
          navigate('/advisor');
          return;
        }

        navigate('/');
      } else {
        alert('로그인 실패');
      }
    })
    .catch(e => {
      console.log(e);
      alert('로그인 실패');
    })

  }

  const handleSignUp = () => {
    
    navigate('/user/write');
  };

  return (
    <div className={styles.container}>

      <div style={{position: 'relative'}}>
        <img className={styles.loginFormImage} src={loginFormImage} alt="loginFormImage" />
        
        <div className={styles.loginBox}>
          <p style={{fontSize: '3.4em', marginTop: '1em', marginBottom: '3em'}}>로그인</p>
          <form>
            <div className={styles.inputBar}>
              <label htmlFor='email'>Email</label>
              <input type="text" name="email" value={loginDTO.email} onChange={(e)=> oninput(e)} required />
              <MdOutlineAlternateEmail className={styles.boxIcon} />
            </div>
            <div className={styles["user-box"]}>
              <input type="password" name="pwd" value={loginDTO.pwd} onChange={(e)=> oninput(e)} required />
              <label>Password</label>
            </div>
            <button type="submit" onClick={onsubmit}>로그인</button>
          </form>
            <button type="button" onClick={() => navigate('/advisor')}>관리자페이지로</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
