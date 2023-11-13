import React, { Component } from 'react';

class CityWeatherApi extends Component {
  state = {
    cityWeather: null,
  };

    componentDidMount() {
        this.fetchCityWeather();
    }

    fetchCityWeather() {
        const apiKey = 'ccbe72ea1cf97d70c81aa843786a32ba';
        const city = 'USD'; // 예시로 서울을 기본 도시로 설정

        // OpenWeatherMap API 엔드포인트
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=hongkong&appid=ccbe72ea1cf97d70c81aa843786a32ba&units=metric`; //임의로 홍콩의 날씨를 출력

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ cityWeather: data });
            })
            .catch(error => {
            console.error('날씨 API 요청 중 오류 발생:', error);

        });
    }

  render() {
    const { cityWeather } = this.state;

    return (
      <div>
        <h2>현재 날씨</h2>
        {cityWeather !== null ? (
          <div>
            <p>{`도시: ${cityWeather.name}`}</p>
            <p>{`온도: ${cityWeather.main.temp}°C`}</p>
            <p>{`습도: ${cityWeather.main.humidity}%`}</p>
            {/* 기타 날씨 정보를 표시할 수 있는 내용을 추가 */}
          </div>
        ) : (
          <p>날씨 정보를 불러오는 중...</p>
        )}
      </div>
    );
  }
}

export default CityWeatherApi;