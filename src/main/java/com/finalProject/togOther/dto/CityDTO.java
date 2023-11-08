package com.finalProject.togOther.dto;

import com.finalProject.togOther.domain.City;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CityDTO {
	private int citySeq;
	private String continentName;
	private String countryName;
	private String cityName;
	private String cityImage;
	
	
	public static CityDTO toDTO(City city) {
		
		return CityDTO.builder()
					  .citySeq(city.getCitySeq())
					  .continentName(city.getContinentName())
					  .countryName(city.getCountryName())
					  .cityName(city.getCityName())
					  .cityImage(city.getCityImage())
					  .build();
	}
	
}
