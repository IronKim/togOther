package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.CustomPlaceDTO;

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
public class CustomPlace {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int plCustomSeq;
	private String placeName;
	private String address;
	private String latitude;
	private String longitude;
	
	public static CustomPlace toEntity(CustomPlaceDTO customPlaceDTO) {
		
		return CustomPlace.builder()
						  .plCustomSeq(customPlaceDTO.getPlCustomSeq())
						  .placeName(customPlaceDTO.getPlaceName())
						  .address(customPlaceDTO.getAddress())
						  .latitude(customPlaceDTO.getLatitude())
						  .longitude(customPlaceDTO.getLongitude())
						  .build();
	}
	
}