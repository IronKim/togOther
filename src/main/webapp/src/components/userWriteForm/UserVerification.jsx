import React from 'react';
import Swal from 'sweetalert2';

import styles from '../../css/userWriteForm.module.css';

import ssoimage from '../../assets/image/sso.png';
import smsimage from '../../assets/image/sms.png';
import { certificationRequest, smsCertificationRequest } from '../../api/UserApiService';
import { HiArrowCircleRight } from 'react-icons/hi';

const UserVerification = ({nextPage, inputUserData, userData}) => {


    const onSingleSign = () => {

        const loadingModal = Swal.fire({
        title: '불러오는 중',
        html: '잠시만 기다려주세요...',
        allowOutsideClick: false,
        showConfirmButton: false,
        allowEnterKey: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
        });


        const IMP = window.IMP;    
        IMP.init('imp10723600'); 
        IMP.certification({ 
            //나중에 주소 수정해야함
            request_id: 'sample' + new Date().getTime(), // param
            m_redirect_url : 'http://localhost:3000/user/write', // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
            popup : true // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
          }, rsp => { // callback
            if (rsp.success) {
                
                loadingModal.close();
                console.log(rsp.imp_uid);

                certificationRequest({imp_uid: rsp.imp_uid})
                .then(res => {
                    console.log(res);

                    userData.birthday = res.data.birthday;
                    inputUserData.birthday = res.data.birthday;

                    userData.name = res.data.name;
                    inputUserData.name = res.data.name;

                    userData.phone = res.data.phone;
                    inputUserData.phone = res.data.phone;

                    userData.certification = 1;
                    inputUserData.certification = 1;
                    nextPage();
 
                })
                .catch(e => {
                    if(e.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: '이미 가입된 회원입니다.',
                          });
                    }else if(e.response.status === 412) {
                        Swal.fire({
                            icon: 'error',
                            title: '만 14세 이상 이용자가 아닙니다.',
                          });
                    }
                });
                
                
            } else {
              // 인증 실패 시 로직, 모달로 인증 실패 메시지를 띄워주시면 됩니다.
              Swal.fire({
                icon: 'error',
                title: '인증 실패',
                html: '다시 시도해주세요.',
              });
              
            }
          }
          );
    }

    const onMobileSign = () => {

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
            title: '휴대폰 인증',
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
              
          }).then((phoneNumberResult) => {
            if (phoneNumberResult.isConfirmed) {
              const phoneNumber = phoneNumberResult.value;

              showLoadingodal();

              smsCertificationRequest(phoneNumber)
                .then(res => {
                    console.log(res.data);   
                    Swal.fire({
                        title: '휴대폰 인증',
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
                          userData.phone = phoneNumber;
                          inputUserData.phone = phoneNumber;
                          nextPage();
                        }
                      });
                })
                .catch(e => {
                    if(e.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: '이미 가입된 회원입니다.',
                            });
                    }
                });
            }
          });
    }

    return (
        <div className={styles.writeContainer}> 
            <p className='fs-1 mb-3' >(선택사항)</p>
            <p className='fs-5 mb-3'>인증시 인증된 회원으로 가입됩니다.</p> 
            <p className='fs-5'>추후 인증 가능</p>
            <div style={{margin: '0 auto', height: '100%', width: '100%', textAlign: 'center'}} className='d-flex justify-content-center'>
                <div>
                    <div className={styles.verificationImageDiv} style={{ borderRight: 'solid 1px black'}}>
                        <img src={ssoimage} alt="통합인증" className={styles.verificationImage}/>
                    </div>
                    <p className='btn btn-primary' onClick={onSingleSign}>통합인증</p>
                </div>
                <div>
                    <div className={styles.verificationImageDiv} >
                        <img src={smsimage} alt="휴대폰 인증" className={styles.verificationImage}/>
                    </div>
                    <p className='btn btn-primary' onClick={onMobileSign}>휴대폰 인증</p>
                </div>
            </div>
            <button className={styles.fbtn} onClick={()=> nextPage()}><HiArrowCircleRight/></button>
        </div>
    );
};

export default UserVerification;