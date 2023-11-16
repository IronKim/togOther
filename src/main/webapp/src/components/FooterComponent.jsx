import React, { useState, useEffect } from 'react';
import styles from '../css/Info/FooterComponent.module.css';


const paragraphStyles = {
  marginTop: '20px'
};

const FooterComponent = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 페이지 크기가 767px 미만일 때 내용 숨기기
        const handleResize = () => {
            setIsVisible(window.innerWidth >= 768);
        };

        handleResize(); // 초기 설정

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <>
            <div className={styles.footer}>
                <div>
                    <hr /><br/><br/><br/><br/>
                    <span><em>주식회사</em><em>투고아더</em></span>
                    <span><em>대표</em><em>김재철</em></span>
                    <span><em>개인정보보호책임자</em><em>문이빈</em></span>
                    <span><em>사업자등록번호</em><em>123-12-34567</em></span>
                    <span><em>관광사업등록번호</em><em>01234-0000-111111</em></span>
                    <address>서울특별시 강남구 강남대로94길 20 삼오빌딩 5-9층</address>
                </div>
            <br />

            <div>
                {isVisible && (
                <p style={ paragraphStyles }>
                    자사는 서울특별시관광협회 공제영업보증보험에 가입되어 있습니다.<br />
                    투고아더는 통신판매중개자이며 통신판매 당사자가 아닙니다.<br />
                    상품정보 및 거래에 관한 책임은 판매자에게 있습니다.<br />
                </p>
            )}
            
            <br />
                <p style={{ fontSize: '12px' }}> Copyright © TogOther Inc. All Rights Reserved.</p>
            </div>
        </div>
    </>
    );
};

export default FooterComponent;