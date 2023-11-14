import React from 'react';

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
        <div>
            <div className='d-flex'>
                <p className='btn btn-primary' onClick={onSingleSign}>통합인증</p>
                <p className='btn btn-primary' onClick={onMobileSign}>휴대폰 인증</p>
            </div>
            <button className='btn btn-primary' onClick={() => nextPage()}>건너뛰기</button>
        </div>
    );
};

export default UserVerification;