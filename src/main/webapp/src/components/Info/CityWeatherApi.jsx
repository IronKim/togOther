import React, { useEffect, useState } from 'react';
import cityMapping from '../../constants/CityMappingData';
import WeatherIcon from '../../constants/WeatherIcon';
import WeatherData from '../../constants/WeatherData';

const CityWeatherApi = ({ selectedCity, onWeatherData }) => {
  const [cityWeather, setCityWeather] = useState(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const apiKey = 'ccbe72ea1cf97d70c81aa843786a32ba';

        if (!selectedCity) {
          console.error('선택된 도시 정보가 없습니다.');
          return;
        }

        const englishCityName = getEnglishCityName(selectedCity);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${englishCityName}&appid=ccbe72ea1cf97d70c81aa843786a32ba&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setCityWeather(data);
        
        // 날씨 아이콘 코드를 부모 컴포넌트로 전달
        onWeatherData(data);

      } catch (error) {
        console.log('날씨 API 요청 중 오류 발생:', error);
      }
    };

    if (selectedCity) {
      fetchCityWeather();
    }
    
  }, [selectedCity]);

  const getEnglishCityName = (englishCityName) => {
    return cityMapping[englishCityName] || englishCityName;

  };

  return (
    <div>
      <h1>오늘 날씨는</h1>
      {/* 날씨 정보가 있을 때만 렌더링 */}
      {cityWeather !== null && cityWeather.main && cityWeather.main.temp !== undefined ? (
        <div>
          <div>
            {/* 나머지 날씨 정보 표시 */}
            <p>{`온도: ${cityWeather.main.temp}°C`}</p>
            <p>{`습도: ${cityWeather.main.humidity}%`}</p>
            <p>{`체감 온도: ${cityWeather.main.feels_like}°C`}</p>
          </div>
        </div>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </div>
  );
};


export default CityWeatherApi;