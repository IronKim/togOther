package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.TourPackageDTO;

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
public class TourPackage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tpSeq;
	
	// 투어 패키지 제목
	private String tpTitle;
	
	// 도시 시퀀스
	private int citySeq;
	
	public static TourPackage toEntity(TourPackageDTO tourpackageDTO) {
		return TourPackage.builder()
					   .tpSeq(tourpackageDTO.getTpSeq())
					   .tpTitle(tourpackageDTO.getTpTitle())
					   .citySeq(tourpackageDTO.getCitySeq())
					   .build();
	}
}
