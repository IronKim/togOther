import React from 'react';
import sunny from '../assets/image/weather/sunny.png';
import few_clouds from '../assets/image/weather/few_clouds.png';
import scattered_clouds from '../assets/image/weather/scattered_clouds.png';
import sunny_clouds from '../assets/image/weather/sunny_clouds.png';
import shower_rain from '../assets/image/weather/shower_rain.png';
import rain from '../assets/image/weather/rain.png';
import thunderstorm from '../assets/image/weather/thunderstorm.png';
import mist from '../assets/image/weather/mist.png';
import snow from '../assets/image/weather/snow.png';

const iconMapping = {
  '01d' : sunny,
  '02d' : sunny_clouds,
  '03d' : scattered_clouds,
  '04d' : few_clouds,
  '09d' : shower_rain,
  '10d' : rain,
  '11d' : thunderstorm,
  '13d' : snow, 
  '50d' : mist, 
  '01n' : sunny,
  '02n' : sunny_clouds,
  '03n' : scattered_clouds,
  '04n' : few_clouds,
  '09n' : shower_rain,
  '10n' : rain,
  '11n' : thunderstorm,
  '13n' : snow, 
  '50n' : mist, 
 // 아이콘 코드와 매핑
};

    const WeatherIcon = ({ weatherIconCode }) => {
        const iconUrl = iconMapping[weatherIconCode];

        return (      
        <div>
            <img
                src={iconUrl}
                style={{ width: '50px', height: '50px' }}
                alt={iconMapping[weatherIconCode]}
                onError={() => {
                    console.log(`아이콘 이미지 어디갔음????? : ${iconUrl}`);
            }}
            />
        </div>
        );
    };
  
  export default WeatherIcon;