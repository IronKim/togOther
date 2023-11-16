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
public class MainDTO {
	private String continentName;
	private String countryName;
	private String cityName;
	private String cityImage;
	
public static MainDTO toDTO(City city) {
		
		return MainDTO.builder()
					  .continentName(city.getContinentName())
					  .countryName(city.getCountryName())
					  .cityName(city.getCityName())
					  .cityImage(city.getCityImage())
					  .build();
	}
}
