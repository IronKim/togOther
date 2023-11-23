package com.finalProject.togOther.dto;

import com.finalProject.togOther.domain.TourPackage;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TourPackageDTO {
	
	private int tpSeq;
	
	// 투어 패키지 제목
	private String tpTitle;
	
	// 도시 시퀀스
	private int citySeq;

	public static TourPackageDTO toDTO(TourPackage tourPackage) {
		return TourPackageDTO.builder()
					   .tpSeq(tourPackage.getTpSeq())
					   .tpTitle(tourPackage.getTpTitle())
					   .citySeq(tourPackage.getCitySeq())
					   .build();
	}
}
