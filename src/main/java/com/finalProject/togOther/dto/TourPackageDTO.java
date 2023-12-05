package com.finalProject.togOther.dto;

import java.time.LocalDate;

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
	
	private int citySeq;
	
	// 투어 패키지 제목
	private String tpTitle;
	// 투어 패키지 섬네일
	private String tpThumbnail;
	// 투어패키지 가격
	private String tpPrice;
	// 투어 패키지 이미지
	private String tpImages;
	// 투어 패키지 내용
	private String tpcontext;
	// 판매시작 날짜
	private LocalDate tpsaleStart;
	// 판매종료 날짜
	private LocalDate tpsaleEnd;
	
	public static TourPackageDTO toDTO(TourPackage tourPackage) {
		return TourPackageDTO.builder()
							 .tpSeq(tourPackage.getTpSeq())
							 .citySeq(tourPackage.getCitySeq())
							 .tpTitle(tourPackage.getTpTitle())
							 .tpThumbnail(tourPackage.getTpThumbnail())
							 .tpPrice(tourPackage.getTpPrice())
							 .tpImages(tourPackage.getTpImages())
							 .tpcontext(tourPackage.getTpcontext())
							 .tpsaleStart(tourPackage.getTpsaleStart())
							 .tpsaleEnd(tourPackage.getTpsaleEnd())
							 .build();
	}
	
}
