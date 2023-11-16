package com.finalProject.togOther.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.finalProject.togOther.constant.Continent;
import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;

import jakarta.persistence.Column;
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