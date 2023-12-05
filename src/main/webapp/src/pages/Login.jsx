import React, { useState } from 'react';
import styles from '../css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { recoveryPassword, getUserByPhone, isUserExistsByPhone, loginUser, sendEmail, smsRequest } from '../api/UserApiService';
import { useUserStore } from '../stores/mainStore';
import Swal from 'sweetalert2'; // SweetAlert2 추가
import loginFormImage from '../assets/image/loginFormImage.png';

import naverBtn from '../assets/image/naverBtn.png';

import naverLongBtn from '../assets/image/naverLongBtn.png';


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
    // navigate('/user/ID&PasswordRecovery');
    Swal.fire({
      title: '찾을 항목 선택',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '이메일 찾기',
      cancelButtonText: '비밀번호 찾기',
    }).then((result) => {
      if (result.isConfirmed) {
        // 이메일 찾기 버튼이 클릭되었을 때의 로직
        let wrongAttempts = 0; // 틀린 횟수를 저장할 변수

        const showInvalidCodeModal = () => {
            Swal.fire({
                icon: 'error',
                title: '인증 오류',
                text: '인증번호를 3번 이상 틀렸습니다. 다시 시도해주세요.',
            });
        };

        const showLoadingodal = () => {
            Swal.fire({
                title: '인증번호 전송 중...',
                allowOutsideClick: false,
                showConfirmButton: false,
                allowEnterKey: false,
                });
        };

        Swal.fire({
            title: '이메일 찾기',
            input: 'text',
            inputLabel: '전화번호',
            inputPlaceholder: '전화번호를 입력하세요 (숫자만 입력)',
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: '전송',
            cancelButtonText: '취소',
            inputAttributes: {
                pattern: '[0-9]{15}', // 여기서 [0-9]는 숫자, {15}는 15자리 숫자를 의미
                maxLength: 15,
              },
            inputValidator: (value) => {
                // 숫자만 허용하는 정규표현식을 사용하여 유효성 검사
                const isValidPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/.test(value);

                if (!isValidPhoneNumber) {
                  return '유효하지 않은 전화번호입니다.';
                }


                return undefined; // 유효성 검사 통과
              },
              
          }).then(async(phoneNumberResult) => {
            if (phoneNumberResult.isConfirmed) {
              const phoneNumber = phoneNumberResult.value;

              await isUserExistsByPhone(phoneNumber)
                    .then(async res => {
                        if(res.data === false) {
                          await Swal.fire({
                              icon: 'error',
                              title: '인증하지 않은 회원입니다.',
                              });
                          return;
                        }else {
                          showLoadingodal();

                          smsRequest(phoneNumber)
                            .then(res => {
                                console.log(res.data);   
                                Swal.fire({
                                    title: '이메일 찾기',
                                    text: `${phoneNumber}로 인증번호가 전송되었습니다.`,
                                    input: 'text',
                                    inputLabel: '인증번호',
                                    inputPlaceholder: '인증번호를 입력하세요',
                                    showCancelButton: true,
                                    allowOutsideClick: false,
                                    inputAttributes: {
                                        pattern: '[0-9]{6}', // 여기서 [0-9]는 숫자, {6}는 6자리 숫자를 의미
                                        maxLength: 6,
                                      },
                                      inputValidator: (value) => {
                                        // 입력된 값이 서버 응답과 일치하는지 확인
                                        if (Number(value) === Number(res.data)) {
                                            return undefined; // 유효성 검사 통과
                                        } else {
                                            wrongAttempts++; // 틀린 횟수 증가
                                            if (wrongAttempts >= 3) {
                                                return undefined;
                                            } else {
                                                return '인증번호가 일치하지 않습니다. 남은시도 횟수: ' + (3 - wrongAttempts) + '회';
                                            }
                                        }
                                    },
                                    confirmButtonText: '확인',
                                    cancelButtonText: '취소',
                                  }).then((verificationCodeResult) => {
                                    if (verificationCodeResult.isConfirmed) {

                                        if(Number(verificationCodeResult.value) !== Number(res.data)) {
                                            showInvalidCodeModal();
                                            return;
                                        }

                                        getUserByPhone(phoneNumber)
                                        .then(res => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: '이메일 찾기',
                                                text: `회원님의 이메일은 ${res.data}입니다.`,
                                                allowEnterKey: false,
                                                allowOutsideClick: false,
                                                confirmButtonText: '확인',
                                            });
                                        })
                                        .catch(e => {
                                            Swal.fire({
                                                icon: 'error',
                                                title: '서버 오류',
                                                text: '서버 오류로 인해 이메일 찾기를 할 수 없습니다.',
                                              });
                                            return;
                                        });

                                    }
                                  });
                            })
                            .catch(e => {
                                if(e.response.status === 409) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: '인증하지 않은 회원입니다.',
                                        });
                                }
                            });
                        }
                    })
                    .catch(async e => {
                      await Swal.fire({
                        icon: 'error',
                        title: '서버 오류',
                        text: '서버 오류로 인해 이메일 찾기를 할 수 없습니다.',
                      });
                      return;
                    });


              
            }
          });
      } else {
        let wrongAttempts = 0; // 틀린 횟수를 저장할 변수
        
        const showInvalidCodeModal = () => {
          Swal.fire({
              icon: 'error',
              title: '인증 오류',
              text: '인증번호를 3번 이상 틀렸습니다. 다시 시도해주세요.',
          });
        };

        const showLoadingodal = () => {
          Swal.fire({
              title: '인증번호 전송 중...',
              allowOutsideClick: false,
              showConfirmButton: false,
              allowEnterKey: false,
              });
        };

        Swal.fire({
            title: '비밀번호 찾기',
            input: 'text',
            inputLabel: '이메일',
            inputPlaceholder: '이메일을 입력하세요',
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: '전송',
            cancelButtonText: '취소',
            inputValidator: (value) => {
                // 이메일 형식이 올바른지 확인
                if (!validateEmail(value)) {
                  return '이메일 형식이 올바르지 않습니다.';
                }
                return undefined; // 유효성 검사 통과
              },
          }).then((emailResult) => {
            if (emailResult.isConfirmed) {

              showLoadingodal();

              sendEmail(emailResult.value)
              .then(res => {
                console.log(res.data);

                Swal.fire({
                  title: '비밀번호 찾기',
                  text: `${emailResult.value}로 인증번호가 전송되었습니다.`,
                  input: 'text',
                  inputLabel: '인증번호',
                  inputPlaceholder: '인증번호를 입력하세요',
                  showCancelButton: true,
                  allowOutsideClick: false,
                  inputAttributes: {
                      pattern: '[0-9]{6}', // 여기서 [0-9]는 숫자, {6}는 6자리 숫자를 의미
                      maxLength: 6,
                    },
                    inputValidator: (value) => {
                      // 입력된 값이 서버 응답과 일치하는지 확인
                      if (Number(value) === Number(res.data.code)) {
                          return undefined; // 유효성 검사 통과
                      } else {
                          wrongAttempts++; // 틀린 횟수 증가
                          if (wrongAttempts >= 3) {
                              return undefined;
                          } else {
                              return '인증번호가 일치하지 않습니다. 남은시도 횟수: ' + (3 - wrongAttempts) + '회';
                          }
                      }
                  },
                  confirmButtonText: '확인',
                  cancelButtonText: '취소',
                }).then((verificationCodeResult) => {
                  if (verificationCodeResult.isConfirmed) {

                    if(Number(verificationCodeResult.value) !== Number(res.data.code)) {
                      showInvalidCodeModal();
                      return;
                    } 

                      Swal.fire({
                        title: '비밀번호 찾기',
                        html:
                          '<input id="newPassword" class="swal2-input" placeholder="새로운 비밀번호 (4~20글자)" type="password">' +
                          '<input id="confirmPassword" class="swal2-input" placeholder="비밀번호 확인" type="password">',
                        showCancelButton: true,
                        allowOutsideClick: false,
                        confirmButtonText: '확인',
                        cancelButtonText: '취소',
                        preConfirm: () => {
                          // 여기에서 입력된 값들을 가져와서 처리
                          const newPassword = Swal.getPopup().querySelector('#newPassword').value;
                          const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;
                  
                          // 각 입력 필드의 값이 비어있는지 확인
                          if (!newPassword || !confirmPassword) {
                            Swal.showValidationMessage('모든 항목을 입력하세요.');
                            return false;
                          }

                          // 새로운 비밀번호와 확인 비밀번호가 일치하지 않는지 확인
                          if (newPassword !== confirmPassword) {
                            Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                            return false;
                          }

                          // 새로운 비밀번호가 최소 4글자 이상이고 최대 20글자 이하인지 확인
                          if (newPassword.length < 4 || newPassword.length > 20) {
                            Swal.showValidationMessage('비밀번호는 4글자 이상 20글자 이하로 입력하세요.');
                            return false;
                          }
                        },
                      }).then((newPasswordResult) => { 
                          // 서버에 비밀번호 변경 요청
                          if(newPasswordResult.isConfirmed) {
                            const newPassword = Swal.getPopup().querySelector('#newPassword').value;
                            recoveryPassword(res.data.userSeq, newPassword)
                            .then(res => {
                              Swal.fire({
                                icon: 'success',
                                title: '비밀번호 찾기',
                                text: '비밀번호가 변경되었습니다.',
                                allowEnterKey: false,
                                allowOutsideClick: false,
                                confirmButtonText: '확인',
                              });
                            })
                            .catch(e => {
                              Swal.fire({
                                icon: 'error',
                                title: '서버 오류',
                                text: '서버 오류로 인해 비밀번호 찾기를 할 수 없습니다.',
                              });
                            });
                            }else  {
                              Swal.fire({
                                icon: 'error',
                                title: '비밀번호 찾기',
                                text: '비밀번호 찾기를 취소하였습니다.',
                                allowEnterKey: false,
                                allowOutsideClick: false,
                                confirmButtonText: '확인',
                              });
                            return;
                          }
                      });
                  }
              });
              })
              .catch(e => {
                
                Swal.fire({
                    icon: 'error',
                    title: '등록되지 않은 회원입니다.',
                    });
                
              });;

            }
          });
      }
    });
  };

  const naverLogin = () => {

    const NAVER_CLIENT_ID = "mY_CbvEkdc92AKz3xY24";
    const REDIRECT_URL = 'http://127.0.0.1:3000/user/naver/callback'
    const STATE = 'false'
    const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}`
    
    window.location.href = NAVER_URL;
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
              <span className={styles.LoginBoxText} onClick={handleRecovery} >이메일 / 비밀번호 찾기</span>
              <span className={styles.LoginBoxText} onClick={handleSignUp}>회원가입</span>
            </div>
            <button className={styles.loginBtn} type="submit" onClick={onsubmit}>
              로그인
            </button>
          <div className={styles.naverLoginBtn} style={{height: '80px', marginTop: '20px', borderRadius: '60px'}}>
                <img style={{width: '100%', height: '100%', objectFit:'cover', borderRadius: '48px' }}  onClick={naverLogin} src={naverLongBtn} alt="naver" />
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
