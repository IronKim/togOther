package com.finalProject.togOther.dto;


import com.finalProject.togOther.domain.CustomPlace;
import com.finalProject.togOther.domain.PlannerImage;
import com.finalProject.togOther.domain.PlannerText;
import com.finalProject.togOther.domain.SubItem;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class CustomPlaceDTO {
	
	private int plCustomSeq;
	private String placeName;
	private String address;
	private String latitude;
	private String longitude;
	
	
	public static CustomPlaceDTO toDTO(CustomPlace customPlace) {
		
		return CustomPlaceDTO.builder()
				.plCustomSeq(customPlace.getPlCustomSeq())
				.placeName(customPlace.getPlaceName())
				.address(customPlace.getAddress())
				.latitude(customPlace.getLatitude())
				.longitude(customPlace.getLongitude())
				.build();
	}
	
	
}
//`plImageSeq`	int	NOT NULL,
//`plMainSeq`	int	NOT NULL,
//`nDay`	date	NOT NULL,
//`image`	text	NOT NULL