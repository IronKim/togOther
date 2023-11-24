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
	
	// 도시 시퀀스
	private int citySeq;

	// 투어 패키지 제목
	private String tpTitle;
	// 투어 패키지 섬네일
	private String tpThumbnail;
	// 투어패키지 가격
	private String tpPrice;

	public static TourPackageDTO toDTO(TourPackage tourPackage) {
		return TourPackageDTO.builder()
					   .tpSeq(tourPackage.getTpSeq())
					   .tpTitle(tourPackage.getTpTitle())
					   .tpThumbnail(tourPackage.getTpThumbnail())
					   .tpPrice(tourPackage.getTpPrice())
					   .citySeq(tourPackage.getCitySeq())
					   .build();
	}
}
