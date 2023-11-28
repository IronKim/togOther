package com.finalProject.togOther.domain;

import java.time.LocalDate;

import com.finalProject.togOther.dto.TourPackageDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
	// 도시 시퀀스
	private int citySeq;
	// 투어 패키지 제목
	private String tpTitle;
	// 투어 패키지 섬네일
	@Column(columnDefinition = "TEXT")
	private String tpThumbnail;
	// 투어패키지 가격
	private String tpPrice;
	// 투어 패키지 이미지
	@Column(columnDefinition = "TEXT")
	private String tpImages;
	// 투어 패키지 내용
	private String tpcontext;
	// 판매시작 날짜
	private LocalDate tpsaleStart;
	// 판매종료 날짜
	private LocalDate tpsaleEnd;

	public static TourPackage toEntity(TourPackageDTO tourpackageDTO) {
		return TourPackage.builder()
						  .tpSeq(tourpackageDTO.getTpSeq())
						  .citySeq(tourpackageDTO.getCitySeq())
						  .tpTitle(tourpackageDTO.getTpTitle())
						  .tpThumbnail(tourpackageDTO.getTpThumbnail())
						  .tpPrice(tourpackageDTO.getTpPrice())
						  .tpImages(tourpackageDTO.getTpImages())
						  .tpcontext(tourpackageDTO.getTpcontext())
						  .tpsaleStart(tourpackageDTO.getTpsaleStart())
						  .tpsaleEnd(tourpackageDTO.getTpsaleEnd())
						  .build();
	}

}