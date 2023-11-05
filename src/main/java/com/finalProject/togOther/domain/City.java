package com.finalProject.togOther.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "city")
@Getter
@Setter
public class City {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int citySeq;
	private String continentName;
	private String countryName;
	private String cityName;
	private String cityImage;
}
