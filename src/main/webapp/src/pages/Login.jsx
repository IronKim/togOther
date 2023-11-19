import React, { useState } from 'react';
import styles from '../css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/UserApiService';
import { useUserStore } from '../stores/mainStore';

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
      <p style={{fontSize: '3.4em', marginBottom: '3vw'}}>로그인</p>
      <div>
        <img className={styles.loginFormImage} src={loginFormImage} alt="loginFormImage" />
      </div>

      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form>
          <div className={styles["user-box"]}>
            <input type="text" name="email" value={loginDTO.email} onChange={(e)=> oninput(e)} required />
            <label>Email</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="password" name="pwd" value={loginDTO.pwd} onChange={(e)=> oninput(e)} required />
            <label>Password</label>
          </div>
          <button type="submit" onClick={onsubmit}>로그인</button>
        </form>
          <button type="button" onClick={() => navigate('/advisor')}>관리자페이지로</button>
      </div>

      {/* <div className={styles.screen}>
        <div className={styles["screen__content"]}>
          <form className={styles.login}>
            <div className={styles["login__field"]}>
              <i className={`${styles["login__icon"]} fas fa-user`}></i>
              <input type="text" className={styles["login__input"]} placeholder="User Email" />
            </div>
            <div className={styles["login__field"]}>
              <i className={`${styles["login__icon"]} fas fa-lock`}></i>
              <input type="password" className={styles["login__input"]} placeholder="Password" />
            </div>
            <button type="submit" className={`${styles["button"]} ${styles["login__submit"]}`}>
              <span className={styles["button__text"]}>Log In Now</span>
              <i className={`${styles["button__icon"]} fas fa-chevron-right`}></i>
            </button>
            <button type="submit" className={`${styles["button"]} ${styles["login__submit"]}`} onClick={handleSignUp}>
              <span className={styles["button__text"]}>Sign Up</span>
              <i className={`${styles["button__icon"]} fas fa-chevron-right`}></i>
            </button>
          </form>
        </div>
        <div className={styles["screen__background"]}>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape4"]}`}></span>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape3"]}`}></span>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape2"]}`}></span>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape1"]}`}></span>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
