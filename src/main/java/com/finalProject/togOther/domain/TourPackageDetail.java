package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.TourPackageDetailDTO;

import jakarta.persistence.Column;
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
public class TourPackageDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// 투어 패키지 상세 시퀀스
	private int tpdSeq;
	// 투어 패키지 시퀀스
	private int tpSeq;
	
	// 투어 패키지 섬네일
	@Column(columnDefinition = "TEXT")
	private String tpdThumbnail;
	// 투어 패키지 이미지
	@Column(columnDefinition = "TEXT")
	private String tpdImages;
	// 투어 패키지 내용
	private String tpdcontext;
	// 투어패키지 가격
	private String tpdPrice;
	// 판매시작 날짜
	private String tpdsaleStart;
	// 판매종료 날짜
	private String tpdsaleEnd;

	public static TourPackageDetail toEntity(TourPackageDetailDTO tourpackagedetailDTO) {
		return TourPackageDetail.builder()
					   .tpdSeq(tourpackagedetailDTO.getTpdSeq())
					   .tpSeq(tourpackagedetailDTO.getTpSeq())
					   .tpdThumbnail(tourpackagedetailDTO.getTpdThumbnail())
					   .tpdImages(tourpackagedetailDTO.getTpdImages())
				   	   .tpdcontext(tourpackagedetailDTO.getTpdcontext())
					   .tpdPrice(tourpackagedetailDTO.getTpdPrice())
					   .tpdsaleStart(tourpackagedetailDTO.getTpdsaleStart())
					   .tpdsaleEnd(tourpackagedetailDTO.getTpdsaleEnd())
					   .build();
	}
}
