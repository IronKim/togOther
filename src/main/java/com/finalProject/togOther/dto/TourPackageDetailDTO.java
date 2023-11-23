package com.finalProject.togOther.dto;


import com.finalProject.togOther.domain.TourPackageDetail;

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

public class TourPackageDetailDTO {
	// 투어 패키지 상세 시퀀스
	private int tpdSeq;
	// 투어 패키지 시퀀스
	private int tpSeq;
	
	// 투어 패키지 섬네일
	private String tpdThumbnail;
	// 투어 패키지 이미지
	private String tpdImages;
	// 투어 패키지 내용
	private String tpdcontext;
	// 투어패키지 가격
	private String tpdPrice;
	// 판매시작 날짜
	private String tpdsaleStart;
	// 판매종료 날짜
	private String tpdsaleEnd;
	
	public static TourPackageDetailDTO toDTO(TourPackageDetail tourPackageDetail) {
		return TourPackageDetailDTO.builder()
					   .tpdSeq(tourPackageDetail.getTpdSeq())
					   .tpSeq(tourPackageDetail.getTpSeq())
					   .tpdThumbnail(tourPackageDetail.getTpdThumbnail())
					   .tpdImages(tourPackageDetail.getTpdImages())
				   	   .tpdcontext(tourPackageDetail.getTpdcontext())
					   .tpdPrice(tourPackageDetail.getTpdPrice())
					   .tpdsaleStart(tourPackageDetail.getTpdsaleStart())
					   .tpdsaleEnd(tourPackageDetail.getTpdsaleEnd())
					   .build();
	}
}
