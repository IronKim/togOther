package com.finalProject.togOther.dto;

import lombok.Getter;
import lombok.Setter;

@Getter

public class CityDTO {
	private int citySeq;
	private String continentName;
	private String countryName;
	private String cityName;
	private String cityImage;
	
	public void citySeq(int citySeq) {
		this.citySeq = citySeq;
	}
	public void continentName(String continentName) {
		this.continentName = continentName;
	}
	public void countryName(String countryName) {
		this.countryName = countryName;
	}
	public void cityName(String cityName) {
		this.cityName = cityName;
	}
	public void cityImage(String cityImage) {
		this.cityImage = cityImage;
	}
	
	
}
