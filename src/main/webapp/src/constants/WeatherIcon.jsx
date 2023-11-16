import React from 'react';

const iconMapping = {
  '01d' : '',
  '01n' : '',
  '02d' : '',
  '02n' : '',
  '03d' : '',
  '03n' : '',
  '04d' : '',
  '04n' : '',
  '09d' : '',
  '09n' : '',
  '10d' : '',
  '10n' : '',
  '11d' : '',
  '11n' : '',
  '13d' : '', 
  '13n' : '', 
  '50d' : '', 
  '50n' : '', 
 // 아이콘 코드와 매핑띠

};

    const WeatherIcon = ({ weatherIconCode }) => {
        console.log('WeatherIconCode:', weatherIconCode);
    
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
            console.log('iconUrl:', iconUrl);
    
        return (
            
        <div>
            <img
            src={iconUrl}
            style={{ width: '80px', height: '80px' }}
            alt={iconMapping[weatherIconCode]}
            onError={() => {
                console.log(`아이콘 이미지 어디갔음????? : ${iconUrl}`);
            }}
            />
            <p>{iconMapping[weatherIconCode]}</p>
        </div>
        );
    };
  
  export default WeatherIcon;