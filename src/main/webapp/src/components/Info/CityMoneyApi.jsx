import React, { useState, useEffect } from 'react';
import moneyIcon from '../../assets/image/money.png'

const CityMoneyApi = ({ selectedCity }) => {
  const [cityExchangeRate, setCityExchangeRate] = useState(null);
  const [selectedCityCurrencyCode, setSelectedCityCurrencyCode] = useState('KRW');
  const [amountInKRW, setAmountInKRW] = useState(1000); // 1000원을 기본값으로 설정


  // 통화 코드에 대한 한글 이름 매핑
  const currencyNameMapping = {

    '서울' : 'KRW',
    '시즈오카' : 'JPY',
    '홍콩' : 'HKD',
    '삿포로' : 'JPY',
    '오사카' : 'JPY',
    '후쿠오카' : 'JPY',
    '다낭' : 'VND',
    '타이페이' : 'TWD',
    '호치민' : 'VND',
    '런던' : 'GBP',
    '시드니' : 'AUD',
    '멜버른' : 'AUD',
    '마드리드' : 'EUR',
    '로마' : 'EUR',
    '괌' : 'USD',
    '사이판' : 'USD',
    '파리' : 'EUR',
    '하노이' : 'VND',
    '강원도' : 'KRW',
    '나트랑' : 'VND',
    '로스앤젤레스' : 'USD',
    '뉴욕' :'USD' ,
    '뮌헨' : 'EUR',
    '밴쿠버' : 'CAD',
    '달랏' : 'VND',
    '방콕' : 'THB',
    '푸꾸옥' : 'THB',
    '토론토' : 'CAD',
    '베를린' : 'EUR',
    '제주도' : 'KRW',
    '바르셀로나' : 'EUR',
    '칸쿤' : 'MXN',
    '상파울루' : 'BRL',
    '페루' : 'PEN',
    '피렌체' : 'EUR',
    '니스' : 'EUR',
    '에든버러' : 'GBP',

  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const exchangeApiKey = 'f0c37735f371fd75a2a17f9c';
        const currencyCode = currencyNameMapping[selectedCity];

        if (!currencyCode) {
          console.error('통화를 찾을 수 없습니다.');
          return;
        }

        const exchangeRequestUrl = `https://open.er-api.com/v6/latest?apikey=${exchangeApiKey}&base=${currencyCode}`;

        const response = await fetch(exchangeRequestUrl);
        const data = await response.json();

        const cityExchangeRate = data.rates[selectedCityCurrencyCode.toUpperCase()];

        setSelectedCityCurrencyCode(currencyCode);
        setCityExchangeRate(cityExchangeRate);
      } catch (error) {
        console.error('환율 API 요청 중 오류 발생:', error);
      }
    };

    if (selectedCity) {
      fetchExchangeRate();
    }
  }, [selectedCity]);

  useEffect(() => {
    console.log(`Selected City: ${selectedCity}`);
    console.log(`Selected Currency Code: ${selectedCityCurrencyCode}`);
    console.log(`Amount in KRW: ${amountInKRW}`);
    console.log(`City Exchange Rate: ${cityExchangeRate}`);
  }, [selectedCity, selectedCityCurrencyCode, amountInKRW, cityExchangeRate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{width:'50%',textAlign:'center'}}>
        <img style={{ width: 70, height: 70 }} src={ moneyIcon } alt='환율 아이콘' />
      </div>
      <div style={{width:'50%',textAlign:'center'}}>
        {cityExchangeRate !== null ? (
          <div style={{display:'flex',alignItems:'center',height:'100%'}}>
            <h1>{`1000KRW / ${(amountInKRW / cityExchangeRate).toFixed(2)} ${selectedCityCurrencyCode}입니다.`}</h1>
          </div>
        ) : (
          <p>환율 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default CityMoneyApi;