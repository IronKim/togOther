import React, { Component } from 'react';

class CityMoneyApi extends Component {
    state = {
        cityExchangeRate: null,
        cityExchangeRate: 'USD'
  };


    componentDidMount() {
        this.fetchExchangeRate();
  }

    fetchExchangeRate() {
        const exchangeApiKey = 'f0c37735f371fd75a2a17f9c';
        const exchangeApiUrl = 'https://open.er-api.com/v6/latest';
        const cityCurrencyCode = 'HKD'; // 예시로 USD의 통화 코드 사용

        const exchangeRequestUrl = `https://open.er-api.com/v6/latest?apikey=f0c37735f371fd75a2a17f9c`;

        fetch(exchangeRequestUrl)
            .then(response => response.json())
            .then(data => {

                console.log('api 응답하라 : ', data);

            const cityExchangeRate = data.rates[cityCurrencyCode];
                this.setState({ cityExchangeRate });

        })

        .catch(error => {
        console.error('환율 API 요청 중 오류 발생:', error);

      });
  }

    render() {
        const { cityExchangeRate, cityCurrencyCode } = this.state;

        return (
        <div>
            <h2>실시간 환율</h2>
                {cityExchangeRate !== null ? (

                <p>{`환율 정보 (${cityCurrencyCode}): ${cityExchangeRate}`}</p>
            ) : (
                <p>환율 정보를 불러오는 중...</p>
            )}
        </div>
        );
    }
}

export default CityMoneyApi;