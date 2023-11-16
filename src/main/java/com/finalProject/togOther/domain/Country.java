package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.MainDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Country {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int citySeq;
	
	private String continentName;
	
	private String countryName;
	private String cityName;
	private String cityImage;
	

	public static City toEntity(MainDTO mainDTO) {
		return City.builder()
				   .continentName(mainDTO.getContinentName())
				   .countryName(mainDTO.getCountryName())
				   .cityName(mainDTO.getCityName())
				   .cityImage(mainDTO.getCityImage())
				   .build();
	}
}
