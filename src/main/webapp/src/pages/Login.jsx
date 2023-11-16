import React from 'react';
import styles from '../css/login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    
    navigate('/user/write');
  };
  // const Desktop = ({ children }) => {
  //   const isDesktop = useMediaQuery({
  //     minWidth: 1200
  //   });
  //   return isDesktop ? children : null;
  // };
  
  // const Mobile = ({ children }) => {
  //   const isMobile = useMediaQuery({ maxWidth: 1199});
  //   return isMobile ? children : null;
  // };


  return (
      // <Desktop>

    <div className={styles.container}>
      <div className={styles.screen}>
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
          {/* <div className={styles["social-login"]}>
            <h3>log in via</h3>
            <div className={styles["social-icons"]}>
              <a href="#" className={`${styles["social-login__icon"]} fab fa-instagram`}></a>
              <a href="#" className={`${styles["social-login__icon"]} fab fa-facebook`}></a>
              <a href="#" className={`${styles["social-login__icon"]} fab fa-twitter`}></a>
            </div>
          </div> */}
        </div>
        <div className={styles["screen__background"]}>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape4"]}`}></span>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape3"]}`}></span>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape2"]}`}></span>
          <span className={`${styles["screen__background__shape"]} ${styles["screen__background__shape1"]}`}></span>
        </div>
      </div>
    </div>
      // </Desktop>
  );
};

export default Login;
