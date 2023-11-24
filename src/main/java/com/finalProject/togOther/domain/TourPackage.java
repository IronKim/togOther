package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.TourPackageDTO;

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
	
	
	public static TourPackage toEntity(TourPackageDTO tourpackageDTO) {
		return TourPackage.builder()
					   .tpSeq(tourpackageDTO.getTpSeq())
					   .tpTitle(tourpackageDTO.getTpTitle())
					   .tpThumbnail(tourpackageDTO.getTpThumbnail())
					   .tpPrice(tourpackageDTO.getTpPrice())
					   .citySeq(tourpackageDTO.getCitySeq())
					   .build();
	}

}
