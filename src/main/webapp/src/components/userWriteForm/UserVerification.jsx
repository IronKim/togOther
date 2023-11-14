import React from 'react';

import styles from '../../css/userWriteForm.module.css';

import ssoimage from '../../assets/image/sso.png';
import smsimage from '../../assets/image/sms.png';
import { HiArrowCircleRight } from 'react-icons/hi';

const UserVerification = ({nextPage, inputUserData}) => {


    const onSingleSign = () => {
        const IMP = window.IMP;    
        IMP.init('imp10723600'); 

        IMP.certification({ 
            m_redirect_url : '/user/write', // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
            popup : false // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
          }, rsp => { // callback
            if (rsp.success) {

                console.log(rsp);
                inputUserData.certification = 1;
                nextPage();
 
            } else {
                
              // 인증 실패 시 로직, 모달로 인증 실패 메시지를 띄워주시면 됩니다.
              alert('인증에 실패하였습니다. 다시 시도해주세요.');
              
            }
          });
    }

    const onMobileSign = () => {
        
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
            <button className={`mt-5 ${styles.fbtn}`} onClick={() => nextPage()}><HiArrowCircleRight /></button>
        </div>
    );
};

export default UserVerification;