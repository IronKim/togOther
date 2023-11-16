package com.finalProject.togOther.domain;

import com.finalProject.togOther.constant.Continent;
import com.finalProject.togOther.dto.CityDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class City {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int citySeq;
	
	private String continentName;
	
	private String countryName;
	private String cityName;
	private String cityImage;
	

	public static City toEntity(CityDTO cityDTO) {
		return City.builder()
				   .citySeq(cityDTO.getCitySeq())
				   .continentName(cityDTO.getContinentName())
				   .countryName(cityDTO.getCountryName())
				   .cityName(cityDTO.getCityName())
				   .cityImage(cityDTO.getCityImage())
				   .build();
	}
	
}